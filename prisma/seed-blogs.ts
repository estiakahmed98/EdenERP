/**
 * Demo blog posts (Game of Thrones themed ERP stories) so the public blog
 * (/community/learn/blog) and /admin/blog have something to show.
 *
 * Runs as part of the main seed:
 *   npx prisma db seed                      # adds / refreshes the demo posts
 *   npx prisma db seed -- --reset-blogs     # removes only these demo posts
 *
 * Safe to re-run: posts are matched by slug (all slugs start with "got-"),
 * so real posts are never touched. Fictional pen names, original text.
 */
import { db } from "../lib/db";

const PREFIX = "got-";
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=70`;

type Seed = {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string; // YYYY-MM-DD (stored as UTC midnight)
  image: string;
  ads?: string;
  content: string;
};

const POSTS: Seed[] = [
  {
    slug: "got-winter-is-coming-inventory-planning",
    title: "Winter Is Coming: Plan Your Inventory Before the Long Night",
    summary:
      "The Night's Watch never ran out of firewood by accident. Here is how demand forecasting and safety stock keep your warehouse stocked before the cold season hits.",
    author: "Maester Aemon",
    date: "2026-11-03",
    image: img("photo-1586528116311-ad8dd3c8310d"),
    ads: img("photo-1506905925346-21bda4d32df4", 700),
    content: `
<h2>Winter does not wait for a purchase order</h2>
<p>Every great house knows the same truth: the seasons change whether or not the granary is full. Businesses face their own winters — festival rush, monsoon delays, a supplier that simply stops answering ravens.</p>
<h2>Three habits that keep the castle fed</h2>
<ul>
  <li><strong>Forecast from history, not hope.</strong> Use last year's stock movements to project demand per warehouse.</li>
  <li><strong>Set reorder points.</strong> When firewood drops below the line, a purchase requisition is raised automatically.</li>
  <li><strong>Keep safety stock</strong> for the items you can least afford to run out of.</li>
</ul>
<blockquote>"The man who passes the sentence should swing the sword" — and the planner who orders the stock should see the stock.</blockquote>
<p>With one inventory summary across every warehouse, gate pass and weighbridge ticket, the Lord Commander can see the whole realm on a single screen.</p>`,
  },
  {
    slug: "got-iron-throne-of-accounting",
    title: "The Iron Throne of Accounting: One Ledger to Rule Them All",
    summary:
      "Seven kingdoms, seven spreadsheets, zero agreement on the truth. See how a single chart of accounts ends the war between departments.",
    author: "Tyrion Lannister",
    date: "2026-10-18",
    image: img("photo-1554224155-6726b3ff858f"),
    content: `
<h2>When every department keeps its own books</h2>
<p>Sales says revenue is up. Finance says cash is down. Both are right — they are just reading different scrolls.</p>
<h2>One chart of accounts, one story</h2>
<p>Journal entries, invoices, bills and bank reconciliation all post to the same ledgers, so a number means the same thing in every room of the Red Keep.</p>
<ol>
  <li>Define the chart of accounts once.</li>
  <li>Post invoices and bills straight into the ledger.</li>
  <li>Reconcile the bank daily, not at year end.</li>
  <li>Close the financial year with one click and a clean audit trail.</li>
</ol>
<p>A Lannister always pays his debts — and with aging reports for receivables and payables, you will know exactly who owes whom.</p>`,
  },
  {
    slug: "got-garment-factory-and-the-wall",
    title: "Guarding the Wall: How an ERP Protects a Garments Factory Floor",
    summary:
      "Line planning boards, TNA calendars and style costing — the watchers on the wall of every buying-house order.",
    author: "Jon Snow",
    date: "2026-10-02",
    image: img("photo-1565793298595-6a879b1d9492"),
    content: `
<h2>The order is the enemy beyond the wall</h2>
<p>A late trim, a missed lab dip, a booking that never reached the factory: small cracks become big breaches.</p>
<h2>What the watch keeps an eye on</h2>
<ul>
  <li><strong>TNA calendar</strong> — every milestone, every owner, every due date.</li>
  <li><strong>Material booking</strong> against the style's bill of materials.</li>
  <li><strong>Line planning board</strong> to balance capacity across lines.</li>
  <li><strong>Style costing</strong> that shows profitability before you accept the order.</li>
</ul>
<p>Merchandisers, planners and the factory finally share one source of truth. The night is dark, but the dashboard is bright.</p>`,
  },
  {
    slug: "got-faceless-payroll",
    title: "Payroll Without Many Faces: Salary Runs in Minutes, Not Days",
    summary:
      "Salary structures, tax brackets, PF and gratuity — approved once and paid on time, whatever the realm throws at you.",
    author: "Arya Stark",
    date: "2026-09-21",
    image: img("photo-1521791136064-7986c2920216"),
    content: `
<h2>A girl has no spreadsheet</h2>
<p>Payroll is unforgiving: one wrong deduction and the whole kingdom hears about it. Automating the run removes the guesswork.</p>
<h2>The flow</h2>
<ol>
  <li>Define components and structures per grade.</li>
  <li>Pull attendance, leave and overtime automatically.</li>
  <li>Apply tax brackets and PF / gratuity rules.</li>
  <li>Approve once from the inbox; payslips reach everyone.</li>
</ol>
<p>Employees open their own portal to see payslips, leave balance and PF — no more knocking on the HR door at midnight.</p>`,
  },
  {
    slug: "got-dragons-and-manufacturing-mrp",
    title: "Dragons, Dothraki and MRP: Planning Production Without Burning Down the Plant",
    summary:
      "Bill of materials, work centers and capacity planning — keep the dragons fed and the production orders flying on schedule.",
    author: "Daenerys Targaryen",
    date: "2026-08-30",
    image: img("photo-1504384308090-c894fdcc538d"),
    content: `
<h2>Power is only useful when it is planned</h2>
<p>A powerful plant with no schedule is just a very expensive fire hazard.</p>
<h2>From demand to shop floor</h2>
<ul>
  <li><strong>Bill of materials</strong> explodes demand into exact material needs.</li>
  <li><strong>MRP planning</strong> tells you what to buy and when.</li>
  <li><strong>Capacity planning</strong> checks work centers before you promise a date.</li>
  <li><strong>Quality control</strong> catches defects before they leave the gates.</li>
</ul>
<p>Break the wheel of firefighting. Plan it, schedule it, and let the production orders take flight.</p>`,
  },
  {
    slug: "got-braavos-trade-finance",
    title: "The Iron Bank Always Gets Paid: Trade Finance Made Simple",
    summary:
      "Letters of credit, TT remittances and export papers — keep the Iron Bank happy and your shipments moving.",
    author: "Tycho Nestoris",
    date: "2026-08-12",
    image: img("photo-1486406146926-c627a92ad1ab"),
    content: `
<h2>Exporting is a conversation with banks</h2>
<p>Sales contracts, letters of credit, shipments and remittances all have deadlines — and the bank remembers every one.</p>
<h2>Keep every document in step</h2>
<ul>
  <li>Link each LC to its sales contract and shipment.</li>
  <li>Track amendments and expiry dates.</li>
  <li>Prepare Bangladesh export papers from the same data.</li>
  <li>Record TT remittances against the right invoices.</li>
</ul>
<p>When the paperwork matches, the money moves. The Iron Bank will have its due — on time.</p>`,
  },
  {
    slug: "got-realm-wide-crm",
    title: "Ravens, Scouts and CRM: Know Every Lord Before You Meet Him",
    summary:
      "A pipeline for deals, a 360° view of every account and a visit log that never forgets — scouting done right.",
    author: "Varys",
    date: "2026-07-25",
    image: img("photo-1460925895917-afdab827c52f"),
    content: `
<h2>Information is the real currency</h2>
<p>The little birds whisper, but a CRM remembers: who you met, what was promised and when the follow-up is due.</p>
<h2>What the spymaster tracks</h2>
<ul>
  <li><strong>Pipeline</strong> from lead to signed deal.</li>
  <li><strong>Customer 360</strong> with orders, credit and collections.</li>
  <li><strong>Visit log</strong> for the field team.</li>
  <li><strong>Targets and forecast</strong> so the council sees what is coming.</li>
</ul>
<p>Every account has a story. Make sure your team has read it before the meeting.</p>`,
  },
  {
    slug: "got-castle-black-logistics",
    title: "Gate Passes at Castle Black: Weighbridge Accuracy Without the Arguments",
    summary:
      "Weight-based receiving, gate passes and stock movements — fewer disputes at the gate, less shrinkage in the vault.",
    author: "Samwell Tarly",
    date: "2026-06-14",
    image: img("photo-1558769132-cb1aea458c5e"),
    content: `
<h2>Counting is a noble profession</h2>
<p>For bulk goods, the weighbridge is the truth. Connect it to receiving and the arguments at the gate end.</p>
<h2>A cleaner flow</h2>
<ol>
  <li>Issue a gate pass when the truck arrives.</li>
  <li>Weigh in, unload, weigh out — net weight is calculated automatically.</li>
  <li>Post the goods receipt and landed cost.</li>
  <li>Move stock between warehouses with a full audit trail.</li>
</ol>
<p>Everything is written in the books — and unlike the Citadel's, these can be searched.</p>`,
  },
  {
    slug: "got-nights-watch-budgets",
    title: "The Night's Watch Budget: Make Every Coin Count on the Wall",
    summary:
      "Departmental budgets, requisitions and variance reports for lean organisations with long winters ahead.",
    author: "Jeor Mormont",
    date: "2026-05-09",
    image: img("photo-1542401886-65d6c61db217"),
    content: `
<h2>Spend like winter is coming</h2>
<p>A budget is a promise about the future. Tracking it against requisitions keeps the promise honest.</p>
<ul>
  <li>Plan budgets per department and version.</li>
  <li>Raise requisitions that check available budget first.</li>
  <li>Review variance weekly, not at year end.</li>
  <li>Route approvals to the right Lord Commander.</li>
</ul>
<p>The watch does not overspend. It simply plans better.</p>`,
  },
  {
    slug: "got-red-wedding-backups",
    title: "Never Trust a Wedding Invitation: Data Backups and Access Control",
    summary:
      "Role-based access, audit trails and backups — protect your realm from the betrayals you did not see coming.",
    author: "Walder Frey",
    date: "2026-03-28",
    image: img("photo-1518770660439-4636190af475"),
    content: `
<h2>Betrayal is rarely announced</h2>
<p>Most data disasters are boring: a wrong delete, an over-generous permission, a disk that quietly failed.</p>
<h2>Guardrails that work</h2>
<ul>
  <li>Give each person only the access their role needs.</li>
  <li>Keep an audit trail of who changed what, and when.</li>
  <li>Back up daily and test the restore.</li>
  <li>Review admin accounts every quarter.</li>
</ul>
<p>Hospitality laws are sacred in Westeros. In your ERP, access control is.</p>`,
  },
  {
    slug: "got-highgarden-ecommerce",
    title: "From Highgarden to Your Doorstep: Selling Online Without the Chaos",
    summary:
      "Connect your online shop to stock, pricing and accounts so every order leaves the garden fresh.",
    author: "Margaery Tyrell",
    date: "2026-02-11",
    image: img("photo-1560472354-b33ff0c44a43"),
    content: `
<h2>A good harvest needs good logistics</h2>
<p>Overselling an item you do not have is the fastest way to lose a customer. Keep the shop and the warehouse on the same page.</p>
<ul>
  <li>Live stock levels on every product page.</li>
  <li>Coupons and discounts managed in one place.</li>
  <li>Orders flow straight into invoicing and delivery challans.</li>
  <li>Returns update stock and accounts automatically.</li>
</ul>
<p>Grow the business, not the pile of manual reconciliations.</p>`,
  },
  {
    slug: "got-long-night-support",
    title: "Surviving the Long Night: Support, Training and Rollout Tips",
    summary:
      "A practical plan for rolling out an ERP across a whole organisation — and getting everyone to actually use it.",
    author: "Brienne of Tarth",
    date: "2025-12-16",
    image: img("photo-1519681393784-d120267933ba"),
    content: `
<h2>Rollouts succeed through loyalty, not luck</h2>
<p>The best software fails when people do not trust it. Start small, show quick wins, and keep promises.</p>
<ol>
  <li>Pick one process and one team for the pilot.</li>
  <li>Migrate clean data — not all data.</li>
  <li>Train by role, with real examples.</li>
  <li>Review feedback weekly and fix what hurts first.</li>
</ol>
<p>Keep your oath to the team and the realm will follow.</p>`,
  },
];

export async function resetDemoBlogs() {
  const result = await db.blog.deleteMany({
    where: { slug: { startsWith: PREFIX } },
  });
  console.log(`Removed ${result.count} demo blog posts.`);
}

export async function seedDemoBlogs() {
  for (const post of POSTS) {
    const data = {
      title: post.title,
      summary: post.summary,
      content: post.content.trim(),
      date: new Date(`${post.date}T00:00:00.000Z`),
      author: post.author,
      image: post.image,
      ads: post.ads ?? null,
    };
    await db.blog.upsert({
      where: { slug: post.slug },
      update: data,
      create: { slug: post.slug, ...data },
    });
  }
  const total = await db.blog.count();
  console.log(`Seeded ${POSTS.length} demo blog posts (${total} posts in total).`);
}
