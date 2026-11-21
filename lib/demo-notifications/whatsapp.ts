import { mkdir, writeFile, unlink } from "node:fs/promises";
import { resolve, join } from "node:path";
import whatsapp from "whatsapp-web.js";
import terminalQr from "qrcode-terminal";
import qrcode from "qrcode";
import { normalizeWhatsAppRecipient } from "./config.ts";

const { Client, LocalAuth } = whatsapp;
type WhatsAppState = "disconnected" | "starting" | "qr" | "ready" | "error";

/** A single long-lived browser client. Never instantiate this inside a Next.js request. */
export class WhatsAppSender {
  readonly qrPath: string;
  private client: InstanceType<typeof Client> | null = null;
  private state: WhatsAppState = "disconnected";
  private starting: Promise<void> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private stopped = false;
  private retry = 0;
  private readonly authPath: string;
  private qrWork = Promise.resolve();
  private qrRevision = 0;
  private qrImage: string | null = null;

  constructor(private readonly env: Record<string, string | undefined> = process.env) {
    this.authPath = resolve(env.WHATSAPP_AUTH_PATH || ".wwebjs_auth");
    this.qrPath = join(this.authPath, "login-qr.png");
  }

  getState() { return this.state; }
  isReady() { return this.state === "ready" && this.client !== null; }
  /** PNG data URL of the current login QR, only while waiting for a scan. */
  getQrImage() { return this.state === "qr" ? this.qrImage : null; }
  /** Phone number (digits) of the linked sender account once connected. */
  getAccount(): string | null {
    if (!this.isReady()) return null;
    return this.client?.info?.wid?.user ?? null;
  }

  initialize(): Promise<void> {
    if (this.starting) return this.starting;
    if (this.isReady() || this.stopped) return Promise.resolve();
    this.starting = this.start().finally(() => { this.starting = null; });
    return this.starting;
  }

  private async start() {
    this.state = "starting";
    await mkdir(this.authPath, { recursive: true, mode: 0o700 });
    await this.removeQr();
    if (this.stopped) return;
    const executablePath = this.env.WHATSAPP_EXECUTABLE_PATH || this.env.WHATSAPP_BROWSER_PATH;
    const client = new Client({
      authStrategy: new LocalAuth({ clientId: "adon-demo-notifications", dataPath: this.authPath }),
      puppeteer: {
        headless: true,
        protocolTimeout: 60_000,
        ...(executablePath ? { executablePath } : {}),
        args: this.env.WHATSAPP_NO_SANDBOX === "true" ? ["--no-sandbox", "--disable-setuid-sandbox"] : [],
      },
    });
    this.client = client;
    client.on("qr", (qr) => {
      if (this.stopped || this.client !== client) return;
      this.state = "qr";
      const revision = ++this.qrRevision;
      terminalQr.generate(qr, { small: true });
      console.log(`[demo-notifications] Scan WhatsApp QR using Linked devices. QR image: ${this.qrPath}`);
      // Serialize writes/removals so an old QR cannot overwrite a new client's QR.
      this.qrWork = this.qrWork.then(async () => {
        const image = await qrcode.toBuffer(qr, { width: 420, margin: 2 });
        if (this.stopped || this.client !== client || this.state !== "qr" || this.qrRevision !== revision) return;
        this.qrImage = `data:image/png;base64,${image.toString("base64")}`;
        await writeFile(this.qrPath, image, { mode: 0o600 });
      }).catch(() => console.warn("[demo-notifications] QR image could not be saved; scan the terminal QR instead."));
    });
    client.on("ready", () => {
      if (this.stopped || this.client !== client) return;
      this.state = "ready";
      this.retry = 0;
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
      void this.removeQr();
      console.log("[demo-notifications] WhatsApp connected.");
    });
    client.on("auth_failure", () => {
      if (this.stopped || this.client !== client) return;
      this.state = "error";
      console.warn("[demo-notifications] WhatsApp authentication failed; reconnecting.");
      this.scheduleReconnect();
    });
    client.on("disconnected", () => {
      if (this.stopped || this.client !== client) return;
      this.state = "disconnected";
      console.warn("[demo-notifications] WhatsApp disconnected; queued notifications are retained.");
      this.scheduleReconnect();
    });
    try { await client.initialize(); }
    catch {
      if (this.stopped || this.client !== client) return;
      this.state = "error";
      this.scheduleReconnect();
      throw new Error("WHATSAPP_INITIALIZATION_FAILED");
    }
  }

  private scheduleReconnect() {
    if (this.stopped || this.reconnectTimer) return;
    const delay = Math.min(300_000, 5_000 * 2 ** Math.min(this.retry++, 6));
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      void this.reconnect().catch(() => console.warn("[demo-notifications] WhatsApp reconnect failed; retry scheduled."));
    }, delay);
  }

  private async reconnect() {
    const previous = this.client;
    this.client = null;
    if (previous) await this.closeBrowser(previous);
    if (this.stopped) return;
    // A QR initialization can still be waiting; closing its browser settles it.
    await this.starting?.catch(() => {});
    await this.initialize();
  }

  /**
   * Unlinks the current WhatsApp account (or abandons a pending QR) and starts
   * a fresh session so a new QR is shown for linking another phone.
   */
  async logout() {
    if (this.stopped) return;
    const client = this.client;
    const wasReady = this.isReady();
    // Detach first so the "disconnected" event from logout does not schedule a reconnect.
    this.client = null;
    this.state = "starting";
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    this.retry = 0;
    await this.removeQr();
    if (client) {
      // LocalAuth.logout also deletes the saved session; it can fail on locked files (Windows).
      if (wasReady) await client.logout().catch(() => console.warn("[demo-notifications] WhatsApp logout did not complete cleanly; starting a new session anyway."));
      await this.closeBrowser(client);
    }
    await this.starting?.catch(() => {});
    await this.initialize();
  }

  private removeQr() {
    ++this.qrRevision;
    this.qrImage = null;
    this.qrWork = this.qrWork.then(() => unlink(this.qrPath).catch(() => {}));
    return this.qrWork;
  }

  private async closeBrowser(client: InstanceType<typeof Client>) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        client.destroy().catch(() => {}),
        new Promise<void>((resolve) => { timer = setTimeout(resolve, 5_000); }),
      ]);
    } finally { if (timer) clearTimeout(timer); }
  }

  async send(recipient: string, text: string) {
    const client = this.client;
    if (!this.isReady() || !client) throw new Error("WHATSAPP_NOT_CONNECTED");
    const phone = normalizeWhatsAppRecipient(recipient);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        (async () => {
          const contact = await client.getNumberId(phone);
          if (!contact) throw new Error("WHATSAPP_RECIPIENT_UNAVAILABLE");
          const sent = await client.sendMessage(contact._serialized, text, { sendSeen: false });
          return sent.id._serialized;
        })(),
        new Promise<never>((_resolve, reject) => { timer = setTimeout(() => reject(new Error("WHATSAPP_SEND_TIMEOUT")), 60_000); }),
      ]);
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "WHATSAPP_SEND_TIMEOUT" && this.client === client && !this.stopped) {
        this.client = null;
        this.state = "error";
        await this.closeBrowser(client);
        this.scheduleReconnect();
      }
      throw new Error(["WHATSAPP_RECIPIENT_UNAVAILABLE", "WHATSAPP_SEND_TIMEOUT"].includes(code) ? code : "WHATSAPP_SEND_FAILED");
    } finally { if (timer) clearTimeout(timer); }
  }

  async destroy() {
    this.stopped = true;
    this.state = "disconnected";
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    const client = this.client;
    this.client = null;
    await this.removeQr();
    if (client) await this.closeBrowser(client);
  }
}
