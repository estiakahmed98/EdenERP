
import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Banknote,
  BarChart3,
  BookOpen,
  Building2,
  CalendarRange,
  ChevronDown,
  FileText,
  Globe,
  Landmark,
  Languages,
  LayoutGrid,
  Lock,
  Percent,
  Receipt,
  ReceiptText,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
} from 'lucide-react'
 
/* ================================================================== */
/* 1. CONTENT                                                         */
/* ================================================================== */
 
 
const PAGE_URL = 'https://adonerp.com/apps/accounting/accounting-hub'
 
const meta = {
  title: 'Accounting Hub: Live Accounting Dashboard for Bangladeshi Businesses | Adon ERP',
  description:
    'See revenue, net income, receivables, payables and total assets on one live screen, in taka, lakh and crore. The Accounting Hub of Adon ERP, built for companies in Bangladesh.',
  keywords: [
    'accounting dashboard Bangladesh',
    'accounting software Bangladesh',
    'ERP accounting module',
    'accounts receivable dashboard',
    'VAT register Bangladesh',
    'Adon ERP accounting',
  ],
}
 
const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Apps', href: '/apps' },
  { name: 'Accounting', href: '/apps/accounting' },
  { name: 'Accounting Hub', href: '/apps/accounting/accounting-hub' },
]
 
/* ------------------------------------------------------------------ */
/* Section 1: hero                                                     */
/* ------------------------------------------------------------------ */
 
const hero = {
  title: 'Accounting Hub: the whole state of your books, on one screen',
  lead:
    'Sales, profit, what customers owe you, what you owe suppliers and what the company owns. Five figures, read live from your ledgers, shown in taka the way you already talk about money: in lakh and crore.',
  primaryCta: { label: 'Book a demo', href: '/demo' },
  secondaryCta: { label: 'See all accounting tools', href: '#tools' },
  note: 'Now onboarding companies in Dhaka.',
}
 
/** Sample company shown inside the product preview. Invented data. */
const sample = {
  company: 'Nodi Polymer Industries',
  kpis: [
    {
      key: 'revenue',
      label: 'Revenue (YTD)',
      short: '3.46 Cr',
      full: 'BDT 34,621,845.50',
      tone: 'positive' as const,
      note: 'sales since the year began',
    },
    {
      key: 'net',
      label: 'Net income',
      short: '41.2 L',
      full: 'BDT 4,118,320.75',
      tone: 'positive' as const,
      note: 'what is left after every cost',
    },
    {
      key: 'ar',
      label: 'AR outstanding',
      short: '1.84 Cr',
      full: 'BDT 18,402,960.00',
      tone: 'warning' as const,
      note: 'still with customers. Chase this',
    },
    {
      key: 'ap',
      label: 'AP outstanding',
      short: '26.7 L',
      full: 'BDT 2,671,415.20',
      tone: 'neutral' as const,
      note: 'what you owe suppliers',
    },
    {
      key: 'assets',
      label: 'Total assets',
      short: '12.9 Cr',
      full: 'BDT 129,384,602.10',
      tone: 'neutral' as const,
      note: 'everything the company holds',
    },
  ],
  /** Income statement in crore. Revenue - COGS = gross profit; - opex = net income. */
  incomeStatement: [
    { label: 'Revenue', value: 3.46, kind: 'in' as const },
    { label: 'COGS', value: 2.38, kind: 'out' as const },
    { label: 'Gross profit', value: 1.08, kind: 'sub' as const },
    { label: 'Op expense', value: 0.67, kind: 'cost' as const },
    { label: 'Net income', value: 0.41, kind: 'result' as const },
  ],
  grossMargin: '31.2%',
  /** Operating expenses in lakh, totals 67.0 L */
  opex: [
    { label: 'Salaries', value: 48.9 },
    { label: 'Utilities', value: 7.2 },
    { label: 'Transport', value: 5.6 },
    { label: 'Other', value: 5.3 },
  ],
  /** Receivables in lakh */
  topCustomers: [
    { name: 'Arshi Textiles', value: 62.4 },
    { name: 'Nilachol Garments', value: 41.8 },
    { name: 'Dhanshiri Apparel', value: 29.5 },
    { name: 'Surma Fabrics', value: 18.1 },
    { name: 'Kushiyara Knit', value: 11.6 },
  ],
}
 
/* ------------------------------------------------------------------ */
/* Section 2: what each number means                                   */
/* ------------------------------------------------------------------ */
 
const numbers = {
  title: 'Five numbers, five questions an owner actually asks',
  intro:
    'A dashboard is only useful if you know what to do with what it shows. Here is what each figure on the hub means, where it comes from, and when it should make you pick up the phone.',
  rows: [
    {
      label: 'Revenue (YTD)',
      question: 'Are we selling more than we were?',
      body:
        'Everything invoiced since your fiscal year started. Most companies here run July to June, so by December this is about six months of sales. Compare it with the same point last year, not with last month.',
      source: 'Invoices (AR)',
    },
    {
      label: 'Net income',
      question: 'After every cost, did we make money?',
      body:
        'Revenue, minus the cost of what you sold, minus salaries, rent, fuel and everything else it takes to run. When this goes negative the hub shows it in red. It does not soften bad news.',
      source: 'Ledgers and Journal Entries',
    },
    {
      label: 'AR outstanding',
      question: 'How much of our money is sitting with buyers?',
      body:
        'Invoices sent and not yet paid. For a factory selling to large buyers on 60 or 90 days, this is often bigger than the bank balance, and it is the figure that decides whether salaries go out on time.',
      source: 'Invoices (AR) and Receipts',
    },
    {
      label: 'AP outstanding',
      question: 'Who are we holding up?',
      body:
        'Supplier bills you have accepted and not paid. A small AP next to a large AR means you are financing your customers. Worth knowing before you ask the bank for working capital.',
      source: 'Bills (AP)',
    },
    {
      label: 'Total assets',
      question: 'How big is this business, really?',
      body:
        'Cash, bank balances, stock, receivables, machinery and property, added up from the balance sheet. It is the number a lender or investor will look at first.',
      source: 'the asset accounts in your Chart of Accounts',
    },
  ],
  charts: [
    {
      title: 'The income statement in five bars',
      body:
        'Revenue, cost of goods, gross profit, running costs and net income, side by side. Gross margin sits in the corner, so you can see at a glance when raw material prices start eating into it.',
    },
    {
      title: 'Where the running costs go',
      body:
        'Operating expenses split by type. In a factory, salaries are usually the biggest slice. When fuel or transport starts to grow, you see it here before you see it in the year-end accounts.',
    },
    {
      title: 'Top five customers by what they owe',
      body:
        'Your call list for the week. If one name holds a third of all receivables, that is a concentration risk, and it is better to see it on a Monday morning than in an audit.',
    },
    {
      title: 'Top five vendors by what you owe',
      body:
        'Who to pay first, and who you can reasonably talk to about terms. Useful the week before Eid, when every supplier wants to be paid at once.',
    },
  ],
}
 
/* ------------------------------------------------------------------ */
/* Section 3: the tools behind the hub                                 */
/* ------------------------------------------------------------------ */
 
const tools = {
  title: 'Seventeen tools feed the hub. You never type a number twice.',
  intro:
    'The hub does not hold figures of its own. Every number on it is read from the work your team already does in the tools below: an invoice raised, a cheque deposited, a bill approved.',
  groups: [
    {
      name: 'Keep the books',
      items: [
        {
          name: 'Chart of Accounts',
          slug: 'chart-of-accounts',
          body: 'The list of every account money moves through. Set it up once; every report reads from it.',
        },
        {
          name: 'Journal Entries',
          slug: 'journal-entries',
          body: 'For entries that do not come from an invoice or bill: depreciation, accruals, corrections.',
        },
        {
          name: 'Ledgers',
          slug: 'ledgers',
          body: 'Open any account and see every taka in and out, with the running balance.',
        },
      ],
    },
    {
      name: 'Sell and collect',
      items: [
        {
          name: 'Customers',
          slug: 'customers',
          body: 'Every buyer, and what each of them owes you today.',
        },
        {
          name: 'Delivery Challans',
          slug: 'delivery-challans',
          body: 'Goods leaving the gate, recorded so delivery and billing can be matched.',
        },
        {
          name: 'Invoices (AR)',
          slug: 'invoices',
          body: 'Bill customers with VAT. Unpaid invoices make up the AR figure on the hub.',
        },
        {
          name: 'Receipts',
          slug: 'receipts',
          body: 'Money in by cash, cheque or bank transfer, set against the invoice it pays.',
        },
      ],
    },
    {
      name: 'Buy and pay',
      items: [
        {
          name: 'Vendors',
          slug: 'vendors',
          body: 'Your suppliers, and what you owe each one.',
        },
        {
          name: 'Purchase Orders',
          slug: 'purchase-orders',
          body: 'Agree price and quantity before goods arrive, so the bill can be checked.',
        },
        {
          name: 'Bills (AP)',
          slug: 'bills',
          body: 'Supplier bills waiting for payment. Together they make the AP figure.',
        },
        {
          name: 'Items / Products',
          slug: 'items-products',
          body: 'What you buy and sell, with units and prices.',
        },
      ],
    },
    {
      name: 'Cash and bank',
      items: [
        {
          name: 'Bank Accounts',
          slug: 'bank-accounts',
          body: 'Every account the company holds, with balances to check against the statement.',
        },
        {
          name: 'Cheque Register',
          slug: 'cheque-register',
          body: 'Cheques received and issued, with their dates, so none is forgotten in a drawer.',
        },
        {
          name: 'Petty Cash',
          slug: 'petty-cash',
          body: 'Tea, rickshaw fare, courier. Small amounts that add up by June.',
        },
      ],
    },
    {
      name: 'Close and comply',
      items: [
        {
          name: 'VAT Register',
          slug: 'vat-register',
          body: 'VAT on sales and VAT on purchases, side by side for the monthly return.',
        },
        {
          name: 'Financial Reports',
          slug: 'financial-reports',
          body: 'Profit and loss, balance sheet and the statements a bank or auditor asks for.',
        },
        {
          name: 'Closing & FY',
          slug: 'closing-fiscal-year',
          body: 'Close the month, lock the year, open the next one with clean balances.',
        },
      ],
    },
  ],
}
 
/* ------------------------------------------------------------------ */
/* Section 4: made for Bangladesh + a day with the hub                 */
/* ------------------------------------------------------------------ */
 
const local = {
  title: 'Made for the way books are kept in Bangladesh',
  intro:
    'Most accounting software is written somewhere else and adjusted for us later. Adon ERP started here, so the paperwork you actually handle every day has a proper place in it.',
  points: [
    {
      icon: 'receipt' as const,
      title: 'VAT from the first invoice',
      body:
        'VAT is recorded on every sale and purchase as it happens, and lands in the VAT Register. When the monthly return is due, your figures are already in one place.',
    },
    {
      icon: 'cheque' as const,
      title: 'Cheques, including post-dated ones',
      body:
        'Buyers still pay by cheque, often dated weeks ahead. The Cheque Register keeps each one with its date, so you know what can be deposited today.',
    },
    {
      icon: 'lakh' as const,
      title: 'Lakh and crore, not millions',
      body:
        'The hub shows 2.92 Cr and 58 L, with the full taka amount underneath. Nobody has to convert numbers in their head before a meeting.',
    },
    {
      icon: 'language' as const,
      title: 'English or Bangla',
      body:
        'Switch the language from the top bar. The owner can read in Bangla while the accountant works in English, on the same books.',
    },
    {
      icon: 'companies' as const,
      title: 'More than one company',
      body:
        'A factory and a trading arm, or three sister concerns? Switch company from the top bar. Each keeps its own books.',
    },
    {
      icon: 'calendar' as const,
      title: 'Your fiscal year, your dates',
      body:
        'Close the year when your company closes it, whether that is June like most firms here or December for a foreign parent.',
    },
  ],
  day: {
    title: 'A normal Tuesday with the hub',
    intro: 'How an accounts team at a mid-sized packaging factory might use it.',
    steps: [
      {
        time: '9:30 am',
        text: 'The accounts head opens the hub. Receivables are up since last week, and the top-five list shows exactly which buyer is behind it.',
      },
      {
        time: '11:00 am',
        text: 'The Cheque Register shows two cheques dated today. One goes to the bank. The other buyer asks for a week, and the call is noted.',
      },
      {
        time: '2:30 pm',
        text: 'The store sends a delivery challan for film rolls that left the gate. The invoice goes out the same afternoon, VAT included.',
      },
      {
        time: '4:00 pm',
        text: 'A resin supplier’s bill arrives and is checked against the purchase order before it is accepted.',
      },
      {
        time: '6:15 pm',
        text: 'Petty cash is counted and closed. When the owner checks the hub from home, today’s numbers are already in it.',
      },
    ],
  },
}
 
/* ------------------------------------------------------------------ */
/* Section 5: industries, FAQ, closing call to action                  */
/* ------------------------------------------------------------------ */
 
const industries = {
  title: 'Same hub, set up for your trade',
  intro:
    'A restaurant and a textile mill read the same five numbers very differently. Pick your industry to see how the books are usually set up for it.',
  groups: [
    {
      name: 'Retail',
      slug: 'retail',
      angle: 'Daily sales, supplier credit and stock that moves fast.',
      items: ['Book Store', 'Clothing Store', 'Furniture Store', 'Grocery Store', 'Hardware Store', 'Toy Store'],
    },
    {
      name: 'Food & Hospitality',
      slug: 'food-hospitality',
      angle: 'Cash-heavy days, perishable stock, VAT on every bill.',
      items: ['Bar and Pub', 'Restaurant', 'Fast Food', 'Guest House', 'Beverage Distributor', 'Hotel'],
    },
    {
      name: 'Real Estate',
      slug: 'real-estate',
      angle: 'Long projects, staged payments, advances held for months.',
      items: ['Real Estate Agency', 'Architecture Firm', 'Construction', 'Property Management', 'Gardening', 'Property Owner Association'],
    },
    {
      name: 'Consulting',
      slug: 'consulting',
      angle: 'Time is the product, so invoices and receivables are everything.',
      items: ['Accounting Firm', 'IT Consultancy', 'Marketing Agency', 'Law Firm', 'Talent Acquisition', 'Audit & Certification'],
    },
    {
      name: 'Manufacturing',
      slug: 'manufacturing',
      angle: 'Raw material in, finished goods out, large buyers who pay late.',
      items: ['Textile', 'Metal', 'Furnitures', 'Food', 'Brewery', 'Corporate Gifts'],
    },
    {
      name: 'Health & Fitness',
      slug: 'health-fitness',
      angle: 'Memberships, small tickets and a lot of receipts.',
      items: ['Sports Club', 'Eyewear Store', 'Fitness Center', 'Wellness Practitioners', 'Pharmacy', 'Hair Salon'],
    },
    {
      name: 'Trades',
      slug: 'trades',
      angle: 'Jobs, parts, and payment collected on site.',
      items: ['Handyman', 'IT Hardware & Support', 'Solar Energy Systems', 'Electronic Store', 'Cleaning Services', 'HVAC Services'],
    },
    {
      name: 'Others',
      slug: 'others',
      angle: 'Nonprofits, rentals, studios. The books still have to balance.',
      items: ['Nonprofit Organization', 'Environmental Agency', 'Billboard Rental', 'Photography', 'Bike Leasing', 'Software Reseller'],
    },
  ],
}
 
const faq = {
  title: 'Questions we get about the Accounting Hub',
  items: [
    {
      q: 'What is the Accounting Hub in Adon ERP?',
      a: 'It is the first screen of the Accounting app. It shows revenue for the year so far, net income, receivables, payables and total assets, along with an income statement chart, an expense breakdown and your top customers and vendors by balance. Everything on it is live.',
    },
    {
      q: 'Where do the numbers on the hub come from?',
      a: 'From the work your team already records: invoices, receipts, bills, journal entries, bank and cheque records. The hub reads them from the ledgers. There is nothing to type into the hub itself, so it cannot fall out of step with the books.',
    },
    {
      q: 'Does it handle VAT in Bangladesh?',
      a: 'Yes. VAT is captured on invoices and bills and collected in the VAT Register, so sales VAT and purchase VAT for the month are in one place when your return is due.',
    },
    {
      q: 'Can we see amounts in lakh and crore?',
      a: 'Yes. Headline figures are shown in Cr and L, with the full taka amount printed underneath each one.',
    },
    {
      q: 'Can one login manage more than one company?',
      a: 'Yes. Group companies can switch between companies from the top bar, and each company keeps its own chart of accounts, ledgers and reports.',
    },
    {
      q: 'Is the software available in Bangla?',
      a: 'Yes. You can switch between English and Bangla from the top bar at any time.',
    },
    {
      q: 'Do we need an accountant to use it?',
      a: 'Someone who understands debits and credits should set up the chart of accounts and post journal entries. The hub itself is written for owners and managers, and does not need accounting training to read.',
    },
    {
      q: 'Where is Adon ERP available?',
      a: 'We are currently onboarding companies in Dhaka. Book a demo and we will walk through the hub using numbers that look like your business.',
    },
  ],
}
 
const closing = {
  title: 'Tell us how your business runs. We will show you this screen set up like it.',
  body:
    'A live demo in English or Bangla, using sample books close to your own trade, with time for your accountant’s questions.',
  primaryCta: { label: 'Book a demo', href: '/demo' },
  secondaryCta: { label: 'Explore the Accounting app', href: '/apps/accounting' },
}
 
/* ================================================================== */
/* 2. SHARED PIECES                                                   */
/* ================================================================== */
 
const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
 
function PrimaryButton({ href, children, inverted = false }: { href: string; children: ReactNode; inverted?: boolean }) {
  return (
    <Link
      href={href}
      className={
        inverted
          ? `${base} bg-white text-[var(--purple-dark)] hover:bg-white/90`
          : `${base} btn-gradient text-white`
      }
    >
      {children}
    </Link>
  )
}
 
function SecondaryButton({ href, children, inverted = false }: { href: string; children: ReactNode; inverted?: boolean }) {
  return (
    <Link
      href={href}
      className={
        inverted
          ? `${base} border border-white/35 text-white hover:bg-white/10`
          : `${base} border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary`
      }
    >
      {children}
    </Link>
  )
}
 
 
/** Renders one or more JSON-LD blocks. Server component, no client JS. */
function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data]
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here; we escape "<" to avoid </script> injection.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
 
type Crumb = { name: string; href: string }
 
function breadcrumbSchema(items: Crumb[], origin = 'https://adonerp.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: origin + c.href,
    })),
  }
}
 
function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
 
/** Visible breadcrumb trail. The last item is the current page. */
function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className="rounded-sm underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-border">
                    /
                  </span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
 
/* ================================================================== */
/* 3. PRODUCT PREVIEW                                                 */
/* ================================================================== */
 
/**
 * A coded (not screenshot) preview of the real Accounting Hub screen.
 * Crisp on every screen, follows light/dark/theme tokens, and the text
 * inside it is readable by search engines.
 *
 * Handwritten notes sit above the five figures on large screens: the one
 * "human" moment of the page. They draw in once on load.
 */
 
const sidebar = [
  { label: 'Accounting Hub', icon: LayoutGrid, active: true },
  { label: 'Chart of Accounts', icon: BookOpen },
  { label: 'Journal Entries', icon: FileText },
  { label: 'Ledgers', icon: BookOpen },
  { label: 'Invoices (AR)', icon: FileText },
  { label: 'Bills (AP)', icon: Receipt },
  { label: 'Purchase Orders', icon: ShoppingCart },
  { label: 'Customers', icon: Users },
  { label: 'Vendors', icon: Users },
  { label: 'Bank Accounts', icon: Landmark },
  { label: 'Delivery Challans', icon: Truck },
  { label: 'Petty Cash', icon: Wallet },
  { label: 'Closing & FY', icon: Lock },
  { label: 'Financial Reports', icon: BarChart3 },
  { label: 'VAT Register', icon: Percent },
]
 
const toneClass = {
  positive: 'text-foreground',
  negative: 'text-destructive',
  warning: 'text-foreground',
  neutral: 'text-foreground',
} as const
 
const topBorder = {
  revenue: 'before:bg-[var(--teal)]',
  net: 'before:bg-[var(--teal)]',
  ar: 'before:bg-amber-500',
  ap: 'before:bg-destructive',
  assets: 'before:bg-primary',
} as const
 
const barColor = {
  in: 'bg-[var(--teal)]',
  out: 'bg-destructive/85',
  sub: 'bg-primary',
  cost: 'bg-amber-500',
  result: 'bg-[var(--teal)]',
} as const
 
const donutColors = [
  'var(--primary)',
  'var(--teal)',
  'oklch(0.77 0.16 70)',
  'var(--muted-foreground)',
]
 
function Donut() {
  const total = sample.opex.reduce((s, d) => s + d.value, 0)
  const r = 40
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90" aria-hidden="true">
      {sample.opex.map((d, i) => {
        const len = (d.value / total) * c
        const el = (
          <circle
            key={d.label}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={donutColors[i]}
            strokeWidth="14"
            strokeDasharray={`${len - 0.8} ${c - len + 0.8}`}
            strokeDashoffset={-offset}
          />
        )
        offset += len
        return el
      })}
    </svg>
  )
}
 
function Arrow() {
  return (
    <svg
      viewBox="0 0 40 46"
      className="hub-note-arrow h-11 w-9 text-[var(--purple-dark)] dark:text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3c10 6 16 14 13 24-1.5 5-3.5 9-5 14" />
      <path d="M10.5 36.5 16 42l4.5-6.5" />
    </svg>
  )
}
 
function HubPreview() {
  const max = Math.max(...sample.incomeStatement.map((d) => d.value))
  const custMax = Math.max(...sample.topCustomers.map((d) => d.value))
  const opexTotal = sample.opex.reduce((s, d) => s + d.value, 0)

  return (
    <figure className="relative">
      <style>{`
        @keyframes hub-draw { from { stroke-dashoffset: 80 } to { stroke-dashoffset: 0 } }
        @keyframes hub-ink { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
        .hub-note-arrow path { stroke-dasharray: 80; animation: hub-draw .9s ease-out both; animation-delay: var(--d, 0s) }
        .hub-note-text { animation: hub-ink .6s ease-out both; animation-delay: var(--d, 0s) }
        @media (prefers-reduced-motion: reduce) {
          .hub-note-arrow path, .hub-note-text { animation: none }
        }
      `}</style>

      {/* Handwritten notes, aligned with the five KPI cards (xl and up) */}
      <div className="hidden xl:grid xl:grid-cols-[208px_1fr]" aria-hidden="true">
        <div />
        <div className="grid grid-cols-5 gap-3 px-6 pb-1">
          {sample.kpis.map((k, i) => (
            <div
              key={k.key}
              className="flex flex-col items-start"
              style={{ ['--d' as string]: `${0.5 + i * 0.18}s` }}
            >
              <p className="hub-note-text showcase-heading-highlight max-w-[11rem] pl-3 text-[1.35rem] leading-[1.05] text-[var(--purple-dark)] dark:text-primary">
                {k.note}
              </p>
              <div className="pl-6">
                <Arrow />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The product frame — clipped with a fade mask */}
      <div className="relative overflow-hidden rounded-[14px] border border-border bg-background shadow-[0_1px_0_0_var(--border),0_30px_60px_-30px_oklch(0.3_0.08_257/0.35)]">
        {/* content wrapper that fades out */}
        <div className="relative max-h-[420px] overflow-hidden sm:max-h-[480px]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 sm:px-5">
            <div className="flex shrink-0 items-center gap-2 text-[13px]">
              <span className="font-semibold text-primary">Adon</span>
              <span className="-ml-1.5 font-semibold text-[var(--teal)]">ERP</span>
              <span className="hidden text-muted-foreground sm:inline">/</span>
              <span className="hidden font-medium text-foreground sm:inline">Accounting Hub</span>
            </div>
            <div className="flex min-w-0 items-center gap-2 text-[12px]">
              <span className="hidden items-center gap-1 rounded-md border border-border px-2 py-1 text-muted-foreground sm:inline-flex">
                <Globe className="h-3.5 w-3.5" /> English
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 font-medium text-foreground">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate">{sample.company}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            </div>
          </div>

          <div className="grid xl:grid-cols-[208px_1fr]">
            {/* sidebar — visible but fading toward the bottom */}
            <nav
              className="hidden border-r border-border bg-card px-3 py-4 xl:block"
              aria-label="Accounting tools in the product"
            >
              <ul className="space-y-0.5 text-[12.5px]">
                {sidebar.map(({ label, icon: Icon, active }, i) => (
                  <li
                    key={label}
                    className={
                      active
                        ? 'flex items-center gap-2.5 rounded-md bg-primary px-2.5 py-1.5 font-medium text-primary-foreground'
                        : `flex items-center gap-2.5 px-2.5 py-1.5 text-muted-foreground ${
                            i > 7 ? 'opacity-40' : ''
                          }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            </nav>

            {/* main — only top portion visible */}
            <div className="relative min-w-0 px-4 py-5 sm:px-6">
              <div className="mb-4">
                <p className="text-lg font-semibold text-foreground">Accounting Hub</p>
                <p className="text-[12.5px] text-muted-foreground">Live data from your accounting engine</p>
              </div>

              {/* five KPI cards — visible, but lower part fades */}
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                {sample.kpis.map((k) => (
                  <div
                    key={k.key}
                    className={`relative overflow-hidden rounded-lg border border-border bg-card px-3.5 pb-3 pt-4 before:absolute before:inset-x-0 before:top-0 before:h-[3px] ${topBorder[k.key as keyof typeof topBorder]}`}
                  >
                    <dt className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {k.label}
                    </dt>
                    <dd>
                      <span className={`mt-1.5 block text-[1.6rem] font-semibold leading-none tabular-nums ${toneClass[k.tone]}`}>
                        {k.short}
                      </span>
                      <span className="mt-1.5 block text-[10.5px] text-muted-foreground tabular-nums">
                        {k.full}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* charts — only top strip visible, rest cut by container */}
              <div className="mt-3 grid gap-3 lg:grid-cols-[1.55fr_1fr]">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[13px] font-semibold text-foreground">Income Statement (YTD)</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      Gross margin: <span className="font-semibold text-[var(--teal)]">{sample.grossMargin}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex h-40 items-end gap-3 border-b border-border sm:gap-5">
                    {sample.incomeStatement.map((d) => (
                      <div key={d.label} className="flex h-full flex-1 flex-col justify-end">
                        <span className="mb-1 text-center text-[10.5px] text-muted-foreground tabular-nums">
                          {d.value.toFixed(2)} Cr
                        </span>
                        <span
                          className={`block rounded-t-[3px] ${barColor[d.kind]}`}
                          style={{ height: `${(d.value / max) * 82}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-3 sm:gap-5">
                    {sample.incomeStatement.map((d) => (
                      <span key={d.label} className="flex-1 text-center text-[10.5px] leading-tight text-muted-foreground">
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-[13px] font-semibold text-foreground">Operating Expense Breakdown</p>
                  <div className="mt-3 flex items-center gap-5">
                    <Donut />
                    <ul className="space-y-1.5 text-[11.5px]">
                      {sample.opex.map((d, i) => (
                        <li key={d.label} className="flex items-center gap-2 text-muted-foreground">
                          <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: donutColors[i] }} />
                          {d.label}
                          <span className="ml-auto pl-2 font-medium text-foreground tabular-nums">{d.value} L</span>
                        </li>
                      ))}
                      <li className="border-t border-border pt-1.5 text-muted-foreground">
                        Total <span className="float-right font-medium text-foreground">{opexTotal.toFixed(1)} L</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* fade mask over the cut edge */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/95 to-transparent"
            aria-hidden="true"
          />

          {/* demo overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 pt-16">
            <p className="text-center text-[13.5px] text-muted-foreground">
              You're seeing a preview. The full hub is yours to explore.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg btn-gradient px-5 py-2.5 text-[14px] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-[12.5px] text-muted-foreground">
        A partial preview of the Accounting Hub. Company, customers and figures are sample data.
      </figcaption>
    </figure>
  )
}
 
/* ================================================================== */
/* 4. PAGE                                                            */
/* ================================================================== */
 
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Adon ERP',
    title: meta.title,
    description: meta.description,
    locale: 'en_BD',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  robots: { index: true, follow: true },
}
 
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Adon ERP Accounting Hub',
  url: PAGE_URL,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Accounting software',
  operatingSystem: 'Web browser',
  inLanguage: ['en', 'bn'],
  description: meta.description,
  featureList: tools.groups.flatMap((g) => g.items.map((i) => i.name)),
  areaServed: { '@type': 'City', name: 'Dhaka' },
  publisher: { '@type': 'Organization', name: 'Adon ERP', url: 'https://adonerp.com' },
}
 
/* Small helpers kept local: they only make sense on this page's rhythm. */
const wrap = 'mx-auto w-full max-w-[1240px] px-5 sm:px-8'
const h2 = 'showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] text-foreground sm:text-[2.4rem]'
const lead = 'text-[17px] leading-[1.65] text-muted-foreground'
const link =
  'rounded-sm underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
 
/** Faint ruled-ledger lines, used behind the hero preview and the day timeline. */
const ruled = {
  backgroundImage:
    'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, color-mix(in oklch, var(--primary) 9%, transparent) 31px, color-mix(in oklch, var(--primary) 9%, transparent) 32px)',
}
 
const localIcons = {
  receipt: ReceiptText,
  cheque: Banknote,
  language: Languages,
  companies: Building2,
  calendar: CalendarRange,
}
 
export default function AccountingHubPage() {
  return (
    <main className="bg-background text-foreground">
      <JsonLd data={[softwareSchema, breadcrumbSchema(breadcrumbs), faqSchema(faq.items)]} />
 
      {/* ============ 1. Hero ============ */}
      <section aria-labelledby="hub-title" className="relative overflow-hidden bg-[var(--cream)] pb-16 pt-8 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[46%] opacity-80" style={ruled} aria-hidden="true" />
        <div className={`${wrap} relative`}>
          <Breadcrumbs items={breadcrumbs} />
 
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="hub-title"
              className="showcase-heading text-[2.4rem] leading-[1.04] tracking-[-0.03em] text-[var(--ink)] sm:text-[3.4rem] lg:col-span-7 lg:text-[4rem]"
            >
              {hero.title}
            </h1>
            <div className="lg:col-span-5 lg:pb-2">
              <p className={lead}>{hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PrimaryButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PrimaryButton>
                <SecondaryButton href={hero.secondaryCta.href}>{hero.secondaryCta.label}</SecondaryButton>
              </div>
              <p className="mt-4 text-[13px] text-muted-foreground">{hero.note}</p>
            </div>
          </div>
 
          <div className="mt-12 lg:mt-16">
            <HubPreview />
          </div>
        </div>
      </section>
 
      {/* ============ 2. What the numbers mean ============ */}
      <section aria-labelledby="numbers-title" className="py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="numbers-title" className={h2}>
                {numbers.title}
              </h2>
              <p className={`${lead} mt-5`}>{numbers.intro}</p>
            </div>
          </div>
 
          <div className="lg:col-span-8">
            <dl className="border-b border-border">
              {numbers.rows.map((r) => (
                <div key={r.label} className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[1fr_1.15fr]">
                  <dt>
                    <span className="block text-[14px] font-medium text-primary">{r.label}</span>
                    <span className="mt-1.5 block text-[1.45rem] font-semibold leading-snug tracking-[-0.01em] text-foreground">
                      {r.question}
                    </span>
                  </dt>
                  <dd className="text-[15.5px] leading-[1.7] text-muted-foreground">
                    {r.body}
                    <span className="mt-3 block text-[13.5px]">
                      Comes from <span className="text-foreground">{r.source}</span>
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
 
            <h3 className="mt-16 text-[1.25rem] font-semibold text-foreground">And the four charts underneath</h3>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {numbers.charts.map((c) => (
                <div key={c.title} className="border-l-2 border-primary/25 pl-5">
                  <h4 className="text-[16px] font-semibold text-foreground">{c.title}</h4>
                  <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ============ 3. The tools behind the hub ============ */}
      <section id="tools" aria-labelledby="tools-title" className="scroll-mt-20 bg-[var(--gray-bg)] py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="tools-title" className={h2}>
              {tools.title}
            </h2>
            <p className={`${lead} mt-5`}>{tools.intro}</p>
          </div>
 
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {tools.groups.map((g) => (
              <div key={g.name}>
                <h3 className="border-b-2 border-primary pb-3 text-[15px] font-semibold text-foreground">{g.name}</h3>
                <ul className="mt-2">
                  {g.items.map((t) => (
                    <li key={t.slug} className="border-b border-border/80 py-4 last:border-b-0">
                      <Link href={`/apps/accounting/${t.slug}`} className={`${link} text-[15px] font-medium text-foreground`}>
                        {t.name}
                      </Link>
                      <p className="mt-1 text-[13.5px] leading-[1.55] text-muted-foreground">{t.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ============ 4. Made for Bangladesh ============ */}
      <section aria-labelledby="local-title" className="py-20 sm:py-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="local-title" className={h2}>
              {local.title}
            </h2>
            <p className={`${lead} mt-5`}>{local.intro}</p>
          </div>
 
          <div className="mt-14 grid gap-14 lg:grid-cols-12">
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
              {local.points.map((p) => {
                const Icon = p.icon === 'lakh' ? null : localIcons[p.icon]
                return (
                  <li key={p.title}>
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--purple-light)] text-primary"
                      aria-hidden="true"
                    >
                      {Icon ? <Icon className="h-[18px] w-[18px]" /> : <span className="text-[22px] font-semibold leading-none" style={{ fontFamily: 'var(--font-tiro-bangla), "Noto Sans Bengali", sans-serif' }}>৳</span>}
                    </span>
                    <h3 className="mt-4 text-[17px] font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.65] text-muted-foreground">{p.body}</p>
                  </li>
                )
              })}
            </ul>
 
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-[var(--cream)] p-6 sm:p-8">
                <h3 className="text-[1.3rem] font-semibold text-foreground">{local.day.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted-foreground">{local.day.intro}</p>
                <ol className="mt-6 space-y-0">
                  {local.day.steps.map((s, i) => (
                    <li key={s.time} className="relative grid grid-cols-[5.25rem_1fr] gap-3 pb-6 last:pb-0">
                      {i < local.day.steps.length - 1 && (
                        <span className="absolute bottom-[-6px] left-[6rem] top-[22px] w-px bg-primary/25" aria-hidden="true" />
                      )}
                      <time className="pt-0.5 text-[14px] font-semibold text-primary tabular-nums">{s.time}</time>
                      <p className="relative pl-5 text-[15px] leading-[1.6] text-foreground/90 before:absolute before:left-[-4.5px] before:top-[9px] before:h-2 before:w-2 before:rounded-full before:bg-primary">
                        {s.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ============ 5. Industries, FAQ, next step ============ */}
      <section aria-labelledby="industries-title" className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div className={wrap}>
          <div className="max-w-[46rem]">
            <h2 id="industries-title" className={h2}>
              {industries.title}
            </h2>
            <p className={`${lead} mt-5`}>{industries.intro}</p>
          </div>
 
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {industries.groups.map((g) => (
              <div key={g.slug}>
                <h3 className="border-b border-border pb-3 text-[16px] font-semibold text-primary">
                  <Link href={`/industries/${g.slug}`} className={link}>
                    {g.name}
                  </Link>
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-muted-foreground">{g.angle}</p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((name) => (
                    <li key={name}>
                      <Link
                        href={`/industries/${g.slug}/${slugify(name)}`}
                        className={`${link} text-[14.5px] text-foreground/85`}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
 
          <div className="mt-24 grid gap-10 lg:grid-cols-12">
            <h2 id="faq-title" className={`${h2} lg:col-span-4`}>
              {faq.title}
            </h2>
            <div className="divide-y divide-border border-y border-border lg:col-span-8">
              {faq.items.map((f) => (
                <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm text-[17px] font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    <h3>{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
 
          <div className="mt-24 overflow-hidden rounded-2xl bg-[var(--purple-dark)] px-6 py-12 text-white sm:px-12 sm:py-16 dark:bg-[var(--purple-light)]">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="showcase-heading text-[1.9rem] leading-[1.12] tracking-[-0.02em] sm:text-[2.5rem]">{closing.title}</h2>
                <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/75">{closing.body}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <PrimaryButton href={closing.primaryCta.href} inverted>
                  {closing.primaryCta.label}
                </PrimaryButton>
                <SecondaryButton href={closing.secondaryCta.href} inverted>
                  {closing.secondaryCta.label}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
 
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
 