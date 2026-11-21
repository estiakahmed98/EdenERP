/**
 * Custom Next.js server: serves the app and the live-chat WebSocket
 * (lib/chat/ws-server.ts at /api/chat/ws) on the same port.
 *
 *   npm run dev     -> tsx server.ts          (development, Turbopack)
 *   npm run start   -> tsx server.ts --prod   (after `npm run build`)
 *
 * Also supervises the demo-notification worker (WhatsApp/email) as a child
 * process when DEMO_NOTIFICATIONS_ENABLED=true — see lib/demo-notifications/supervisor.ts.
 *
 * Needs a long-running Node host (VPS, Docker, Railway, Render…). Serverless
 * platforms such as Vercel cannot hold WebSocket connections.
 */
import "dotenv/config";
import { createServer } from "node:http";

const prod = process.argv.includes("--prod") || process.env.NODE_ENV === "production";
if (prod) (process.env as Record<string, string>).NODE_ENV = "production";

const port = Number.parseInt(process.env.PORT || "3000", 10);
// Bind address (unset = all interfaces, like `next start`). Next.js itself is told
// "localhost", as `next start` does, so request.url keeps a usable origin.
const bindHost = process.env.HOSTNAME || undefined;

async function main() {
  // Imported after NODE_ENV is settled.
  const { default: next } = await import("next");
  const { attachChatServer } = await import("./lib/chat/ws-server");

  const httpServer = createServer();
  const app = next({ dev: !prod, hostname: "localhost", port, httpServer, turbopack: !process.argv.includes("--webpack") });
  const handle = app.getRequestHandler();
  await app.prepare();

  // Registered before Next.js' own upgrade listener; ours only claims /api/chat/ws.
  const selfHost = !bindHost || bindHost === "0.0.0.0" || bindHost === "::" ? "127.0.0.1" : bindHost;
  attachChatServer(httpServer, { sessionUrl: `http://${selfHost}:${port}/api/auth/session` });
  httpServer.on("request", (req, res) => void handle(req, res));

  httpServer.listen(port, bindHost, () => {
    console.log(`> Ready on http://localhost:${port} (${prod ? "production" : "development"}) — chat WS on /api/chat/ws`);
  });

  // Demo-request WhatsApp/email worker as a supervised child process
  // (only when DEMO_NOTIFICATIONS_ENABLED=true; NOTIFICATIONS_WORKER=off to opt out).
  const { startNotificationWorker } = await import("./lib/demo-notifications/supervisor");
  const stopNotificationWorker = startNotificationWorker();

  let shuttingDown = false;
  const shutdown = () => {
    if (shuttingDown) return;
    shuttingDown = true;
    setTimeout(() => process.exit(0), 10_000).unref();
    void (stopNotificationWorker?.() ?? Promise.resolve()).finally(() => {
      httpServer.close(() => process.exit(0));
    });
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
