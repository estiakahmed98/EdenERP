import { pathToFileURL } from "node:url";
import { encode } from "next-auth/jwt";

const pp = await import(pathToFileURL(process.argv[2] + "/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js").href);
const out = process.argv[3];
const token = await encode({ token: { id: "t", name: "Estiak Ahmed", email: "admin@example.com", role: "ADMIN" }, secret: "local-visual-test-secret" });

const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=60`;
const mk = (id: number, title: string, author: string, photo: string) => ({
  id, title, author, image: img(photo), date: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  summary: "<p>From TNA calendars to line planning boards, here is how connected data removes the daily chaos on a busy factory floor.</p>",
});
const blogs = [
  mk(1, "How an ERP changes a garments factory floor", "Estiak Ahmed", "photo-1565793298595-6a879b1d9492"),
  mk(2, "VAT registers without the spreadsheet hangover", "Nusrat Jahan", "photo-1554224155-6726b3ff858f"),
  mk(3, "Payroll runs in minutes, not days", "Karim Hossain", "photo-1521791136064-7986c2920216"),
  mk(4, "Warehouse accuracy: gate passes to weighbridge", "Rahim Uddin", "photo-1586528116311-ad8dd3c8310d"),
  mk(5, "Costing a style from fabric to freight", "Estiak Ahmed", "photo-1558769132-cb1aea458c5e"),
];

const browser = await pp.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox", "--incognito"] });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

for (const scheme of ["light", "dark"]) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
  await page.setCookie({ name: "next-auth.session-token", value: token, domain: "localhost", path: "/" });
  await page.setViewport({ width: 1440, height: 1000 });
  await page.setRequestInterception(true);
  page.on("request", (req: { url: () => string; method: () => string; respond: (r: unknown) => void; continue: () => void }) => {
    if (req.url().includes("/api/blog?") && req.method() === "GET") {
      req.respond({ status: 200, contentType: "application/json", body: JSON.stringify({ blogs, pagination: { pages: 3, total: 29, page: 1 } }) });
    } else req.continue();
  });
  page.on("pageerror", (e: Error) => console.log("PAGEERROR", e.message.slice(0, 200)));

  const go = async (name: string, url: string, after?: () => Promise<void>) => {
    await page.goto("http://localhost:3200" + url, { waitUntil: "networkidle2", timeout: 120000 });
    await wait(900);
    if (after) await after();
    await page.screenshot({ path: `${out}/d-${name}-${scheme}.png` });
    console.log("saved", name, scheme);
  };
  await go("blog-grid", "/admin/blog");
  if (scheme === "light") {
    await go("blog-list", "/admin/blog", async () => {
      await page.evaluate(() => (document.querySelector("button[aria-label='List view']") as HTMLElement).click());
      await wait(500);
    });
    await go("blog-new", "/admin/blog", async () => {
      await page.evaluate(() => ([...document.querySelectorAll("button")].find((b) => b.textContent?.includes("New post")) as HTMLElement).click());
      await wait(1500);
    });
  }
  await go("pricing", "/admin/pricing");
  if (scheme === "light") {
    await go("pricing-plans", "/admin/pricing", async () => {
      await page.evaluate(() => ([...document.querySelectorAll("[role=tab]")].find((b) => b.textContent?.includes("Plans")) as HTMLElement).click());
      await wait(800);
    });
  }
  await go("demo", "/admin/demo-bookings");
  await go("dash", "/admin");
  await page.close();
}
await browser.close();
