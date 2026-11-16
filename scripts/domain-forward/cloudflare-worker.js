/**
 * Cloudflare Worker for adonerp.com -> adonerp.com.bd forwarding.
 *
 * Use this ONLY if adonerp.com is not attached to the same Next.js deployment
 * as adonerp.com.bd (if it is, proxy.ts already does this). A registrar
 * "URL forwarding" / static 301 cannot sign a fresh token per visit, so its
 * visitors would fall back to country detection.
 *
 * Setup (Cloudflare dashboard):
 *   1. adonerp.com must be proxied through Cloudflare (orange cloud) and the
 *      registrar / old host forwarding removed.
 *   2. Workers -> Create -> paste this file.
 *   3. Settings -> Variables -> add secret DOMAIN_FORWARD_SECRET
 *      (exactly the same value as on the adonerp.com.bd deployment).
 *      Optional vars: TARGET_ORIGIN (default https://adonerp.com.bd), TTL_SECONDS (default 120).
 *   4. Routes: adonerp.com/*  and  www.adonerp.com/*
 *
 * Token format must match lib/geo/domain-forward.ts.
 */

const FORWARD_PARAM = "adon_fwd";
const SIGNATURE_CONTEXT = "adon-fwd-v1|";

function base64Url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function isPagePath(pathname) {
  return /^\/(?!api|_next|_vercel|auth|admin|.*\..*).*$/.test(pathname);
}

async function createToken(secret, sourceHost, ttlSeconds) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const nonce = base64Url(crypto.getRandomValues(new Uint8Array(12)));
  const payload = `${sourceHost}|${exp}|${nonce}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(SIGNATURE_CONTEXT + payload)),
  );
  return `${base64Url(encoder.encode(payload))}.${base64Url(signature)}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const targetOrigin = new URL(env.TARGET_ORIGIN || "https://adonerp.com.bd").origin;
    const ttl = Math.min(Number(env.TTL_SECONDS) || 120, 600);
    const sourceHost = url.hostname.toLowerCase().replace(/^www\./, "");

    const target = new URL(url.pathname + url.search, targetOrigin);
    target.searchParams.delete(FORWARD_PARAM);
    if (env.DOMAIN_FORWARD_SECRET && isPagePath(url.pathname)) {
      target.searchParams.set(FORWARD_PARAM, await createToken(env.DOMAIN_FORWARD_SECRET, sourceHost, ttl));
    }

    // 307 + no-store: a cached permanent redirect would replay an expired token.
    return new Response(null, {
      status: 307,
      headers: { Location: target.toString(), "Cache-Control": "private, no-store" },
    });
  },
};
