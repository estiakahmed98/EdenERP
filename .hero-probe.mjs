import "dotenv/config";
import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.WHATSAPP_EXECUTABLE_PATH });
const page = await browser.newPage();
for (const [loc, w] of [["ja", 1440], ["ja", 390], ["en", 390], ["ar", 390]]) {
  await page.setViewport({ width: w, height: 800 });
  await page.goto("http://localhost:3000/" + loc, { waitUntil: "networkidle2", timeout: 120000 });
  let samples = 0, bad = 0, worst = "";
  for (let k = 0; k < 60; k++) {
    await new Promise((r) => setTimeout(r, 200));
    const m = await page.evaluate((rtl) => {
      const cur = [...document.querySelectorAll("h1 span[aria-hidden=true]")].find((s) => s.textContent === "|");
      if (!cur) return null;
      const anchor = cur.closest("span.relative");
      const c = cur.getBoundingClientRect(), a = anchor.getBoundingClientRect();
      const sameLine = Math.abs(c.top - a.top) < 4;
      return { sameLine, dy: Math.round(c.top - a.top), typed: anchor.parentElement.textContent.length };
    });
    if (!m) continue;
    samples++;
    if (!m.sameLine) { bad++; worst = JSON.stringify(m); }
    if (k === 30) { const h = await page.$("h1"); await h.screenshot({ path: "C:/Users/ESTIAK~1/AppData/Local/Temp/claude/13e62419f6f1c53e/771f7036-01b9-4e2c-99a3-dd8b966a18a3/scratchpad/shots/cursor-" + loc + "-" + w + ".png" }); }
  }
  console.log(loc, w, "samples", samples, "cursor off-line", bad, worst);
}
await browser.close();
