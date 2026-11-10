import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

import { getClientIp } from "@/lib/security/client-ip";
import { createRateLimiter } from "@/lib/security/rate-limit";

// ~1 event / 2s sustained per IP is far above what the tracker sends (page views + 1 heartbeat/15s).
const collectLimiter = createRateLimiter({ limit: 120, windowMs: 60_000 });
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
const MAX_BODY_BYTES = 8 * 1024;

function safeStr(v: unknown, max = 500) {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s) return null;
  return s.slice(0, max);
}


function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getDayKeyUTC(d: Date) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

function isLocalOrPrivateIp(ip: string) {
  const s = ip.toLowerCase();
  return (
    s === "::1" ||
    s.startsWith("127.") ||
    s.startsWith("10.") ||
    s.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(s)
  );
}

// ✅ pages you never want to track
const EXCLUDED_PATH_PREFIXES = ["/auth/signin", "/auth/signup", "/admin"];

type AnalyticsEventType = "session_start" | "page_view" | "heartbeat";

function isAnalyticsEventType(value: string | null): value is AnalyticsEventType {
  return value === "session_start" || value === "page_view" || value === "heartbeat";
}

type GeoLookupResponse = {
  status?: string;
  message?: string;
  country?: string;
  city?: string;
  regionName?: string;
  lat?: number;
  lon?: number;
  isp?: string;
  query?: string;
};

async function geoLookup(ip: string) {
  const cached = await prisma.geoIpCache.findUnique({ where: { ip } });
  if (cached) return cached;

  const fields = [
    "status",
    "message",
    "country",
    "city",
    "regionName",
    "lat",
    "lon",
    "isp",
    "query",
  ].join(",");

  const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=${encodeURIComponent(
    fields
  )}`;

  let json: GeoLookupResponse;
  try {
    // Never let a slow third-party lookup stall the collector.
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(1500) });
    json = (await res.json()) as GeoLookupResponse;
  } catch {
    return null;
  }

  if (json?.status !== "success") return null;

  // upsert: concurrent first hits from one IP must not fail on the unique key.
  const created = await prisma.geoIpCache.upsert({
    where: { ip },
    update: {},
    create: {
      ip,
      country: typeof json.country === "string" ? json.country : null,
      city: typeof json.city === "string" ? json.city : null,
      region: typeof json.regionName === "string" ? json.regionName : null,
      lat: typeof json.lat === "number" ? json.lat : null,
      lon: typeof json.lon === "number" ? json.lon : null,
      isp: typeof json.isp === "string" ? json.isp : null,
    },
  });

  return created;
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  // Without a trusted proxy IP every visitor would share one bucket, so only limit known IPs.
  const limit = ip ? collectLimiter.check(ip) : null;
  if (limit && !limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  try {

    const eventRaw = safeStr(body?.event, 50);
    if (!isAnalyticsEventType(eventRaw)) {
      return NextResponse.json(
        { ok: false, error: "Invalid event" },
        { status: 400 }
      );
    }
    const event = eventRaw;

    const visitorId = safeStr(body?.visitorId, 100);
    const sessionId = safeStr(body?.sessionId, 100);
    if (!visitorId || !sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing ids" },
        { status: 400 }
      );
    }

    // Client clocks are untrusted: accept only small skew, else use server time.
    const serverNow = Date.now();
    const tsNum =
      typeof body?.ts === "number" &&
      Number.isFinite(body.ts) &&
      Math.abs(body.ts - serverNow) <= MAX_CLOCK_SKEW_MS
        ? body.ts
        : serverNow;
    const ts = new Date(tsNum);
    const dayKey = getDayKeyUTC(ts);

    const path = safeStr(body?.page?.path, 1000) ?? "/";

    // ✅ hard block excluded pages (no store, no count)
    if (EXCLUDED_PATH_PREFIXES.some((p) => path.startsWith(p))) {
      return NextResponse.json({ ok: true });
    }

    const title = safeStr(body?.page?.title, 300);
    const referrer = safeStr(body?.page?.referrer, 1000);

    const utmSource = safeStr(body?.utm?.source, 120);
    const utmMedium = safeStr(body?.utm?.medium, 120);
    const utmCampaign = safeStr(body?.utm?.campaign, 120);

    const deviceType = safeStr(body?.device?.type, 50);
    const browser = safeStr(body?.device?.browser, 80);
    const os = safeStr(body?.device?.os, 80);
    const screen = safeStr(body?.device?.screen, 50);
    const lang = safeStr(body?.device?.lang, 30);

    const activeSeconds =
      event === "heartbeat" && typeof body?.engagement?.activeSeconds === "number"
        ? Math.max(0, Math.min(60, Math.floor(body.engagement.activeSeconds)))
        : 0;

    const userId = safeStr(body?.userId, 100);

    // ✅ compute ipHash for daily unique visitors
    // Never fall back to a public constant: a known salt makes IPv4 hashes trivially reversible.
    const salt = process.env.ANALYTICS_IP_SALT || process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "";
    const ipHash = ip && salt ? sha256(`${salt}:${ip}`) : null;

    // ✅ Geo only for page_view/session_start (NOT heartbeat)
    let country: string | null = null;
    let city: string | null = null;

    if (event !== "heartbeat") {
      if (ip && !isLocalOrPrivateIp(ip)) {
        const geo = await geoLookup(ip);
        country = geo?.country ?? null;
        city = geo?.city ?? null;
      }
    }

    await prisma.analyticsEvent.create({
      data: {
        ts,
        dayKey,
        ipHash,

        event,
        visitorId,
        sessionId,
        userId: userId ?? null,

        path,
        title,
        referrer,
        utmSource,
        utmMedium,
        utmCampaign,
        deviceType,
        browser,
        os,
        screen,
        lang,
        activeSeconds,
        country,
        city,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics] collect failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
