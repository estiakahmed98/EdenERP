import { fork, type ChildProcess } from "node:child_process";
import { resolve } from "node:path";
import { notificationsEnabled } from "./config";

/**
 * Runs scripts/demo-notifications-worker.ts as a child of the web server so
 * `npm run dev` / `npm start` is enough. The worker stays a separate process
 * (Chromium and SMTP never block web requests) and a PostgreSQL advisory lock
 * still guarantees a single active worker per database.
 *
 * Set NOTIFICATIONS_WORKER=off to run the worker yourself (or on another machine).
 */
export function startNotificationWorker(env: Record<string, string | undefined> = process.env) {
  if (!notificationsEnabled(env)) return null;
  if (env.NOTIFICATIONS_WORKER === "off") {
    console.log("[notifications] Auto-start disabled (NOTIFICATIONS_WORKER=off). Run npm run notifications:worker separately.");
    return null;
  }

  const script = resolve("scripts/demo-notifications-worker.ts");
  let child: ChildProcess | null = null;
  let stopping = false;
  let failures = 0;
  let restartTimer: ReturnType<typeof setTimeout> | undefined;

  const spawnWorker = () => {
    if (stopping) return;
    // Reuse the parent's loader flags (tsx), so TypeScript runs the same way.
    child = fork(script, [], { execArgv: process.execArgv, stdio: "inherit", env: process.env });
    const startedAt = Date.now();
    child.on("exit", (code) => {
      child = null;
      if (stopping) return;
      if (code === 0) return; // Disabled or a clean stop: nothing to supervise.
      // Healthy for a while before failing: start backoff over.
      failures = Date.now() - startedAt > 120_000 ? 1 : failures + 1;
      const delay = Math.min(60_000, 5_000 * 2 ** (failures - 1));
      console.warn(`[notifications] Worker exited (code ${code}). Restarting in ${Math.round(delay / 1000)}s.`);
      restartTimer = setTimeout(spawnWorker, delay);
    });
  };

  spawnWorker();

  /** Asks the worker to finish current deliveries and close WhatsApp/Chromium cleanly. */
  return function stopNotificationWorker(timeoutMs = 8_000): Promise<void> {
    stopping = true;
    clearTimeout(restartTimer);
    const running = child;
    if (!running || running.exitCode !== null) return Promise.resolve();
    return new Promise((done) => {
      const timer = setTimeout(() => { running.kill(); done(); }, timeoutMs);
      running.once("exit", () => { clearTimeout(timer); done(); });
      // IPC instead of signals: Windows cannot deliver SIGTERM to a handler.
      if (running.connected) running.send({ type: "shutdown" });
      else running.kill("SIGTERM");
    });
  };
}
