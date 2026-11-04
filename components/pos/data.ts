export const posSlugs = [
  "register-till",
  "shifts",
  "receipts",
  "day-summary-z",
  "outlet-dashboard",
  "loyalty-vouchers",
  "transfers",
  "stock-lots",
  "outlet-stock",
  "outlets-registers",
] as const;
export type PosSlug = (typeof posSlugs)[number];
export const company = "Denim House Ltd";
type PageContent = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  lab: string;
  labDescription: string;
  steps: [string, string][];
  related: PosSlug[];
};
export const pages: Record<PosSlug, PageContent> = {
  "register-till": {
    title: "Register (Till)",
    eyebrow: "THE EVERYDAY CHECKOUT",
    headline: "A great sale starts",
    accent: "at the counter.",
    description:
      "Give every basket a clear path from product lookup to tender, receipt and shift reconciliation.",
    lab: "Build a basket",
    labDescription:
      "Try product search, quantities and cash tender. This is a local checkout simulation; it creates no sale or payment.",
    steps: [
      ["Find the item", "Look up a SKU or search your product catalogue."],
      ["Build the basket", "Review quantities and the VAT-inclusive price."],
      ["Take tender", "Check the amount received and change due."],
      ["Keep the trail", "Connect the receipt to its cashier and shift."],
    ],
    related: ["shifts", "receipts", "outlet-stock"],
  },
  shifts: {
    title: "Shifts",
    eyebrow: "EVERY DRAWER, ACCOUNTED FOR",
    headline: "Open with confidence.",
    accent: "Close with clarity.",
    description:
      "Bring the cashier, float, receipts and counted cash into one shift story. Make every difference visible.",
    lab: "Reconcile a cash drawer",
    labDescription:
      "Compare a local count with the supplied closed-shift cash figure. Nothing is closed or posted.",
    steps: [
      ["Open the drawer", "Identify the cashier, register and opening float."],
      ["Trade through the shift", "Keep receipts connected to their source."],
      ["Count the cash", "Compare the physical count with expected cash."],
      [
        "Review the difference",
        "Investigate variance before the accounting handoff.",
      ],
    ],
    related: ["register-till", "day-summary-z", "receipts"],
  },
  receipts: {
    title: "Receipts",
    eyebrow: "THE DETAIL BEHIND THE SALE",
    headline: "Small receipt.",
    accent: "Complete story.",
    description:
      "Follow the basket, tender and tax in a readable sales record. Find the detail without losing the context.",
    lab: "Inspect a receipt",
    labDescription:
      "No receipt screenshot was supplied. This illustrative receipt is assembled from the supplied day-summary item and totals, not an original receipt record.",
    steps: [
      ["Find the sale", "Search the receipt reference or item."],
      ["Read the basket", "See the product, quantity and inclusive total."],
      ["Check the tender", "Follow the payment method and tax breakdown."],
      [
        "Trace the context",
        "Return to the register, shift and reporting view.",
      ],
    ],
    related: ["register-till", "shifts", "day-summary-z"],
  },
  "day-summary-z": {
    title: "Day Summary (Z)",
    eyebrow: "THE DAY, BALANCED",
    headline: "Every sale adds up",
    accent: "to a clearer close.",
    description:
      "Turn a busy trading day into a concise view of sales, VAT, cost and margin, with the tender detail alongside.",
    lab: "Read the close",
    labDescription:
      "Explore the supplied one-receipt summary in totals or a sales bridge. This is a historical snapshot, not today's trading.",
    steps: [
      ["Choose the scope", "Review the relevant shift or trading day."],
      ["Read the totals", "Bring sales, refunds, VAT and discounts together."],
      ["Explain the margin", "Separate tax and cost from the sales value."],
      ["Review the detail", "Check tender, category and top-item breakdowns."],
    ],
    related: ["shifts", "outlet-dashboard", "receipts"],
  },
  "outlet-dashboard": {
    title: "Outlet Dashboard",
    eyebrow: "A RETAILER’S WIDER VIEW",
    headline: "The pulse of retail.",
    accent: "In one place.",
    description:
      "See sales, basket value and margin alongside the products and registers behind them. A focused view for outlet decisions.",
    lab: "Explore the outlet snapshot",
    labDescription:
      "Switch between the supplied sales and stock-cover views. The screenshot's 14-day window is historical; no daily series has been invented.",
    steps: [
      ["Set the context", "Identify the outlet and reporting window."],
      ["Read the signal", "Review sales, receipts and average basket."],
      [
        "Follow the drivers",
        "Inspect the supplied product and register detail.",
      ],
      ["Choose the next view", "Move into stock, shifts or checkout."],
    ],
    related: ["outlet-stock", "day-summary-z", "loyalty-vouchers"],
  },
  "loyalty-vouchers": {
    title: "Loyalty & Vouchers",
    eyebrow: "A REASON TO RETURN",
    headline: "Make the next visit",
    accent: "part of this one.",
    description:
      "Bring loyalty balances and gift vouchers into the retail conversation, with a clear distinction between points and stored value.",
    lab: "Explore a redemption",
    labDescription:
      "Try an illustrative points conversion. The screenshot supplies aggregate balances only; no customer, voucher code or redemption rule is assumed.",
    steps: [
      [
        "Identify the customer",
        "Connect the visit with the right loyalty account.",
      ],
      [
        "Review the balance",
        "Keep available points distinct from voucher value.",
      ],
      ["Apply the policy", "Use the configured earning and redemption rules."],
      ["Retain the evidence", "Trace the movement back to the sale."],
    ],
    related: ["register-till", "outlet-dashboard", "receipts"],
  },
  transfers: {
    title: "Transfers",
    eyebrow: "FROM FACTORY TO SHOP FLOOR",
    headline: "Move the stock.",
    accent: "Keep the story.",
    description:
      "See where goods leave, where they arrive and what changes in between. One transfer, two sides of the handover.",
    lab: "Follow a transfer",
    labDescription:
      "Inspect the two supplied received transfers. A separate local receiving exercise lets you explore quantity variance without changing either record.",
    steps: [
      [
        "Prepare the transfer",
        "Identify the source, destination and item lines.",
      ],
      ["Send the stock", "Record what leaves the supplying location."],
      ["Receive against dispatch", "Compare what arrives with what was sent."],
      ["Explain differences", "Keep shortages and markdowns visible."],
    ],
    related: ["outlet-stock", "outlets-registers", "stock-lots"],
  },
  "stock-lots": {
    title: "Stock Lots",
    eyebrow: "ONE PURCHASE. MANY POSSIBILITIES.",
    headline: "Open the bale.",
    accent: "Unpack the value.",
    description:
      "Turn a lump-price purchase into a structured intake, with item quantities and an explainable share of the lot cost.",
    lab: "Explore cost apportionment",
    labDescription:
      "Use an illustrative two-line intake to distribute the supplied BDT 180,000 lot cost. The original SKU intake was not supplied.",
    steps: [
      ["Receive the lot", "Identify the supplier and lump purchase price."],
      ["Sort the intake", "Break the opened lot into item quantities."],
      ["Apportion the cost", "Review the selected allocation basis."],
      [
        "Review before posting",
        "Check that allocated values equal the lot cost.",
      ],
    ],
    related: ["outlet-stock", "transfers", "outlets-registers"],
  },
  "outlet-stock": {
    title: "Outlet Stock",
    eyebrow: "KNOW WHAT’S ON THE SHELF",
    headline: "The right stock.",
    accent: "A sharper view.",
    description:
      "Bring on-hand quantity, cost and retail value together. Count with context, then understand the difference.",
    lab: "Explore the stock room",
    labDescription:
      "Search the six supplied Bashundhara City stock lines. A local count exercise shows quantity variance; it posts no stock adjustment.",
    steps: [
      ["Choose the outlet", "Keep the stock view tied to a location."],
      ["Find the item", "Review the SKU, on-hand balance and valuation."],
      ["Count the shelf", "Compare a physical count with the snapshot."],
      ["Resolve the variance", "Review differences before any adjustment."],
    ],
    related: ["transfers", "stock-lots", "outlet-dashboard"],
  },
  "outlets-registers": {
    title: "Outlets & Registers",
    eyebrow: "THE FOUNDATIONS OF RETAIL",
    headline: "Many locations.",
    accent: "One connected counter.",
    description:
      "Give every outlet its place and every register its context. Keep warehouse identity, counter sales and cashier access connected.",
    lab: "Explore your retail network",
    labDescription:
      "Select a supplied location to inspect its outlet designation and register. This read-only view does not change warehouse settings.",
    steps: [
      ["Define the outlet", "Identify which warehouses sell over the counter."],
      ["Connect a register", "Associate the till with its selling location."],
      ["Set the rules", "Configure tax and retail policy in the product."],
      ["Assign the cashier", "Give each operator a clear register context."],
    ],
    related: ["register-till", "outlet-stock", "shifts"],
  },
};

export const stock = [
  {
    sku: "DH-5343",
    name: "Slim Straight Jean — 10 oz Black",
    qty: 30,
    cost: 1043.59,
    value: 31307.7,
    price: 3110,
    retail: 93300,
  },
  {
    sku: "DH-6026",
    name: "LR Baggy Taper — 12 oz Denim",
    qty: 288,
    cost: 1316.05,
    value: 379022.4,
    price: 3620,
    retail: 1042560,
  },
  {
    sku: "DH-6070",
    name: "Athletic Fit Jean — 12 oz Denim",
    qty: 192,
    cost: 1261.09,
    value: 242129.28,
    price: 3450,
    retail: 662400,
  },
  {
    sku: "DH-7101",
    name: "Three-Quarter Pant — Cotton Twill",
    qty: 80,
    cost: 609.22,
    value: 48737.6,
    price: 2270,
    retail: 181600,
  },
  {
    sku: "LOT-TOP-BLU",
    name: "Ladies’ Top — Blue (assorted sizes)",
    qty: 380,
    cost: 190.45,
    value: 72371,
    price: 690,
    retail: 262200,
  },
  {
    sku: "LOT-TOP-RED",
    name: "Ladies’ Top — Red (assorted sizes)",
    qty: 420,
    cost: 190.45,
    value: 79989,
    price: 690,
    retail: 289800,
  },
];
export const shifts = [
  {
    id: "SHF-2026-000024",
    register: "R1-BSC",
    cashier: "RASEL",
    opened: "Oct 20, 12:30 PM",
    closed: "—",
    float: 0,
    cash: null,
    receipts: 1,
    status: "Open",
  },
  {
    id: "SHF-2026-000023",
    register: "R1-BSC",
    cashier: "RASEL",
    opened: "Oct 05, 12:20 PM",
    closed: "Oct 05, 12:21 PM",
    float: 0,
    cash: 3450,
    receipts: 1,
    status: "Posted",
  },
  {
    id: "SHF-2026-000022",
    register: "R1-JFP",
    cashier: "RASEL",
    opened: "Oct 03, 07:00 PM",
    closed: "Oct 08, 12:54 PM",
    float: 1,
    cash: 7071,
    receipts: 2,
    status: "Posted",
  },
  {
    id: "SHF-2026-000021",
    register: "R1-JFP",
    cashier: "RASEL",
    opened: "Oct 03, 06:49 PM",
    closed: "Oct 03, 06:52 PM",
    float: 1,
    cash: 3111,
    receipts: 1,
    status: "Posted",
  },
  {
    id: "SHF-2026-000020",
    register: "R1-JFP",
    cashier: "Sohel Rana",
    opened: "Oct 03, 05:29 PM",
    closed: "Oct 03, 05:35 PM",
    float: 0,
    cash: 10350,
    receipts: 2,
    status: "Posted",
  },
  {
    id: "SHF-2026-000019",
    register: "R1-BSC",
    cashier: "Rina Akter",
    opened: "Sep 26, 04:37 PM",
    closed: "Oct 03, 05:29 PM",
    float: 0,
    cash: 0,
    receipts: 0,
    status: "Posted",
  },
  {
    id: "SHF-2026-000018",
    register: "R1-JFP",
    cashier: "Rina Akter",
    opened: "Sep 22, 07:18 PM",
    closed: "Sep 22, 07:30 PM",
    float: 1,
    cash: 2271,
    receipts: 1,
    status: "Posted",
  },
  {
    id: "SHF-2026-000015",
    register: "R1-BSC",
    cashier: "Rina Akter",
    opened: "Sep 20, 10:00 AM",
    closed: "Sep 22, 07:41 PM",
    float: 5000,
    cash: 14670,
    receipts: 3,
    status: "Posted",
  },
];
export const transfers = [
  {
    id: "STR-2026-000002",
    from: "FG",
    to: "OUT2",
    outlet: "Jamuna Future Park",
    sent: "Sep 19, 04:00 PM",
    received: "Oct 03, 06:53 PM",
    lines: 3,
    qty: 27,
    value: 18897.39,
    shortage: null,
    markdown: null,
  },
  {
    id: "STR-2026-000001",
    from: "FG",
    to: "OUT1",
    outlet: "Bashundhara City",
    sent: "Sep 11, 03:00 PM",
    received: "Sep 12, 10:30 AM",
    lines: 3,
    qty: 48,
    value: 33487.48,
    shortage: 587.99,
    markdown: 4305.84,
  },
];
export const locations = [
  {
    code: "CN",
    name: "Spare Parts & Consumables",
    address: "Factory, Kashimpur, Gazipur",
    outlet: false,
    register: null,
  },
  {
    code: "FG",
    name: "Finished Goods Warehouse",
    address: "Factory, Kashimpur, Gazipur",
    outlet: false,
    register: null,
  },
  {
    code: "OUT1",
    name: "Bashundhara City",
    address: "Level 5, Bashundhara City Shopping Complex, Panthapath, Dhaka",
    outlet: true,
    register: "R1-BSC",
  },
  {
    code: "OUT2",
    name: "Jamuna Future Park",
    address: "Level 3, Jamuna Future Park, Kuril, Dhaka",
    outlet: true,
    register: "R1-JFP",
  },
  {
    code: "RM",
    name: "Fabric & Trims Store",
    address: "Factory, Kashimpur, Gazipur",
    outlet: false,
    register: null,
  },
  {
    code: "WIP",
    name: "Sewing Floor (WIP)",
    address: "Factory, Kashimpur, Gazipur",
    outlet: false,
    register: null,
  },
];
export const saleSummary = {
  gross: 3450,
  vat: 450,
  cost: 1261.09,
  margin: 1738.91,
  receipts: 1,
  items: 1,
  refunds: 0,
  discount: 0,
};
export const money = (value: number) =>
  `৳ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const number = (value: number) => value.toLocaleString("en-US");
