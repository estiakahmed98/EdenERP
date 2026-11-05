export const hospitalitySlugs = [
  "restaurant",
  "fast-food",
  "guest-house",
  "beverage-distributor",
  "hotel",
] as const;
export type HospitalitySlug = (typeof hospitalitySlugs)[number];
export type TicketStage = "queued" | "preparing" | "ready";
export type RoomState = "ready" | "occupied" | "service";
type Content = {
  title: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  story: string;
  stages: { label: string; title: string; body: string; points: string[] }[];
  tools: { title: string; href: string; body: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const restaurantPos = tool(
  "Restaurant POS",
  "/apps/sales/pos-restaurant",
  "Explore the existing dining and checkout presentation.",
);
const items = tool(
  "Items & products",
  "/apps/accounting/items-products",
  "Look at the item records behind the service.",
);
const stock = tool(
  "Stock movements",
  "/apps/inventory/stock-movements",
  "Follow the inventory movement presentation.",
);
const invoices = tool(
  "Customer invoices",
  "/apps/accounting/invoices-ar",
  "Explore customer billing records and the receivables view.",
);
const customers = tool(
  "Customer records",
  "/apps/accounting/customers",
  "Look at the existing customer-record presentation.",
);
const reports = tool(
  "Financial reports",
  "/apps/accounting/financial-reports",
  "Explore the reporting presentation with an advisor.",
);
export const pages: Record<HospitalitySlug, Content> = {
  restaurant: {
    title: "Restaurant",
    eyebrow: "THE ART OF A WELL-RUN SERVICE",
    headline: "A thoughtful table.",
    accent: "A well-connected service.",
    description:
      "Bring the dining room, the counter and the details behind each order into one considered experience. A clearer operational conversation, from the first seat to the last bill.",
    demoTitle: "Find the right table for the party.",
    demoDescription:
      "Choose a fictional table and enter a party size. Compare seats locally, without checking live availability or making a reservation.",
    story: "Every service has a rhythm. Give it a clear path.",
    stages: [
      {
        label: "The dining room",
        title: "Start with the table and the party.",
        body: "Use the seating exercise to discuss how table identity and seat counts fit your dining-room process.",
        points: ["Table identity", "Party size", "Seat comparison"],
      },
      {
        label: "The order",
        title: "Carry context from the table to the counter.",
        body: "Explore the existing Restaurant POS presentation to discuss ordering and checkout in your own operation.",
        points: ["Order detail", "Service handoff", "Checkout context"],
      },
      {
        label: "The close",
        title: "Keep the records behind service readable.",
        body: "Review item, stock and billing presentations without treating the local seating exercise as a live restaurant system.",
        points: ["Item records", "Stock movements", "Billing detail"],
      },
    ],
    tools: [restaurantPos, items, stock, invoices],
    faqs: [
      [
        "Does choosing a table reserve it?",
        "No. The floor plan and table states are fictional. Selecting a table only compares its seats with the entered party size.",
      ],
      [
        "Can the example combine tables?",
        "No. It considers one selected table at a time. Combined seating and scheduling requirements can be discussed with an advisor.",
      ],
      [
        "Where can we discuss real restaurant workflows?",
        "Use the shared advisor button and bring your dining-room, order, kitchen and checkout questions to the conversation.",
      ],
    ],
  },
  "fast-food": {
    title: "Fast Food",
    eyebrow: "A CLEARER VIEW OF THE KITCHEN PASS",
    headline: "The next order.",
    accent: "A clearer handoff.",
    description:
      "Give the rush a readable rhythm. Bring the ticket, the preparation stage and the collection handoff into focus with a fresh perspective on fast-food operations.",
    demoTitle: "Move a ticket through the kitchen pass.",
    demoDescription:
      "Advance three fictional tickets from queued to preparing to ready. The board is an editable local example, separate from any real kitchen.",
    story: "Keep the handoff visible, one ticket at a time.",
    stages: [
      {
        label: "The ticket",
        title: "Let the order carry its detail.",
        body: "Each example ticket has its own identifier and short item list, ready for a conversation about your ordering process.",
        points: ["Ticket identifier", "Item detail", "Initial stage"],
      },
      {
        label: "The preparation",
        title: "Show the stage, without guessing the time.",
        body: "Change stages explicitly in the example. No simulated live timer or invented speed improvement is shown.",
        points: ["Queued", "Preparing", "Ready"],
      },
      {
        label: "The handoff",
        title: "Connect the kitchen conversation to the wider product.",
        body: "Explore the existing POS, item and stock presentations when reviewing the counter-to-kitchen journey.",
        points: ["Order context", "Collection handoff", "Stock records"],
      },
    ],
    tools: [
      restaurantPos,
      items,
      stock,
      tool(
        "Loyalty & vouchers",
        "/apps/pos/loyalty-vouchers",
        "Explore the existing customer-rewards presentation.",
      ),
    ],
    faqs: [
      [
        "Is the board connected to a kitchen?",
        "No. All tickets and stages are fictional and change only in this page’s local state.",
      ],
      [
        "Does Ready mean an order was completed or paid?",
        "No. Ready is only a stage in the local example. It does not complete a sale, notify a guest or record a payment.",
      ],
      [
        "Can I restart the example?",
        "Yes. Reset restores the three fictional tickets and their original stages.",
      ],
    ],
  },
  "guest-house": {
    title: "Guest House",
    eyebrow: "A WARM WELCOME, WITH THE DETAILS IN PLACE",
    headline: "A stay to remember.",
    accent: "The detail, thoughtfully kept.",
    description:
      "Bring arrival dates, room choices and the conversation behind the guest’s stay into a calm, considered view. Hospitality begins with attention to the small things.",
    demoTitle: "Explore a simple stay estimate.",
    demoDescription:
      "Choose example arrival and departure dates and an entered nightly rate. Calculate nights and room charges, without creating a booking.",
    story: "Make the stay easy to follow, from arrival to departure.",
    stages: [
      {
        label: "The arrival",
        title: "Keep the dates clear from the start.",
        body: "The local exercise uses explicit arrival and departure dates and counts nights between them.",
        points: ["Arrival date", "Departure date", "Night count"],
      },
      {
        label: "The stay",
        title: "Make the entered rate visible.",
        body: "Use an illustrative nightly rate to understand the arithmetic behind a simple room-charge estimate.",
        points: [
          "Entered nightly rate",
          "Calculated room charge",
          "Visible assumptions",
        ],
      },
      {
        label: "The departure",
        title: "Bring guest records and billing into the conversation.",
        body: "Explore existing customer and accounting presentations for the wider record-keeping discussion. The estimate is not a hospitality booking engine.",
        points: ["Customer context", "Billing records", "Accounting review"],
      },
    ],
    tools: [
      customers,
      invoices,
      tool(
        "Customer receipts",
        "/apps/accounting/receipts",
        "Explore recorded customer payments in the accounting presentation.",
      ),
      reports,
    ],
    faqs: [
      [
        "Will these dates check room availability?",
        "No. This is a local nights-and-rate exercise with no room inventory or reservation connection.",
      ],
      [
        "What is included in the estimate?",
        "Only the number of nights multiplied by the entered nightly room rate. Taxes, meals, other services and discounts are not included.",
      ],
      [
        "Can I use historical dates?",
        "Yes. The fictional exercise accepts valid dates from 2000 through 2100, with a stay of 1 to 365 nights. It is not a booking request.",
      ],
    ],
  },
  "beverage-distributor": {
    title: "Beverage Distributor",
    eyebrow: "FROM THE DEPOT TO THE NEXT OUTLET",
    headline: "Keep the cartons moving.",
    accent: "Keep every unit in view.",
    description:
      "Bring cartons, unit counts and outlet handoffs into a clear distribution story. Follow the detail from the stock record to the next dispatch conversation.",
    demoTitle: "Build a small carton-load example.",
    demoDescription:
      "Change carton counts and units per carton, then compare the resulting units with an entered count limit. No vehicle load or dispatch is approved.",
    story: "Follow the quantity through each handoff.",
    stages: [
      {
        label: "The depot",
        title: "Start with the carton and its unit count.",
        body: "The example keeps cartons and individual units distinct for each fictional beverage item.",
        points: ["Item identity", "Carton count", "Units per carton"],
      },
      {
        label: "The load",
        title: "Read the totals before the next handoff.",
        body: "Compare total units with an entered unit-count limit. Weight, volume, stacking and vehicle constraints need their own checks.",
        points: ["Total cartons", "Individual units", "Entered count limit"],
      },
      {
        label: "The outlet",
        title: "Bring the stock and trip records into view.",
        body: "Explore the existing distributor-stock, trip and van-stock presentations to discuss your distribution process.",
        points: ["Distributor stock", "Trip context", "Outlet handoff"],
      },
    ],
    tools: [
      tool(
        "Distributor stock",
        "/apps/sales/crm/dms/distributor-stock",
        "Explore the existing distributor-stock presentation.",
      ),
      tool(
        "Trip records",
        "/apps/sales/crm/van-sales/trips",
        "Look at the trip and outlet-visit presentation.",
      ),
      tool(
        "Van stock",
        "/apps/sales/crm/van-sales/van-stock",
        "Explore stock held on a van in the existing product view.",
      ),
      invoices,
    ],
    faqs: [
      [
        "Does a count inside the limit approve a vehicle load?",
        "No. The exercise compares counts only. It does not account for weight, volume, stacking, actual capacity or delivery constraints.",
      ],
      [
        "Are these real beverage or stock records?",
        "No. All item identifiers, carton counts and units per carton are fictional and can be edited locally.",
      ],
      [
        "Does changing a carton count create a dispatch?",
        "No. There is no dispatch, route assignment, reservation or stock movement created by the example.",
      ],
    ],
  },
  hotel: {
    title: "Hotel",
    eyebrow: "A CONSIDERED VIEW OF THE WHOLE PROPERTY",
    headline: "Every room has a story.",
    accent: "See the property with clarity.",
    description:
      "Bring room status, service context and the numbers behind a property-day into one composed experience. A thoughtful perspective on hospitality, floor by floor.",
    demoTitle: "Explore a small property-day snapshot.",
    demoDescription:
      "Change six fictional room states and inspect the resulting count and room-charge arithmetic. This example is not connected to reservations or housekeeping.",
    story: "See the property through a few useful perspectives.",
    stages: [
      {
        label: "The room picture",
        title: "Keep the room and its state together.",
        body: "Each fictional room can be marked ready, occupied or service in the local board. These are example states, not live availability.",
        points: ["Room identity", "Floor context", "Explicit state"],
      },
      {
        label: "The day’s numbers",
        title: "Make the arithmetic assumptions visible.",
        body: "The example compares occupied rooms with ready plus occupied rooms. Rooms in service are excluded from that denominator.",
        points: ["Room counts", "Declared denominator", "Example room charges"],
      },
      {
        label: "The record",
        title: "Bring billing and reporting questions to the review.",
        body: "Explore the existing accounting presentations for your records discussion without inferring a dedicated hotel/PMS integration.",
        points: ["Customer records", "Billing context", "Financial reporting"],
      },
    ],
    tools: [
      customers,
      invoices,
      tool(
        "Customer receipts",
        "/apps/accounting/receipts",
        "Explore the accounting receipt presentation.",
      ),
      reports,
    ],
    faqs: [
      [
        "Does this change actual room inventory?",
        "No. The room board is fictional and updates only local page state. It does not change reservations, housekeeping or availability.",
      ],
      [
        "How is the example occupancy percentage calculated?",
        "Occupied rooms divided by ready plus occupied rooms. Rooms marked service are excluded. If every room is in service, the percentage stays undefined rather than showing zero.",
      ],
      [
        "What does the room-charge total represent?",
        "It sums the displayed fictional daily rates for occupied rooms only. It is not posted revenue, guest billing or a hotel performance report.",
      ],
    ],
  },
};
export const tables = [
  { id: "T01", seats: 2, state: "open" },
  { id: "T02", seats: 4, state: "open" },
  { id: "T03", seats: 6, state: "occupied" },
  { id: "T04", seats: 4, state: "open" },
] as const;
export const ticketStages: TicketStage[] = ["queued", "preparing", "ready"];
export const ticketLabels: Record<TicketStage, string> = {
  queued: "Queued",
  preparing: "Preparing",
  ready: "Ready",
};
export const tickets: { id: string; items: string[]; stage: TicketStage }[] = [
  {
    id: "EX-K01",
    items: ["1 × house burger", "1 × potato side"],
    stage: "queued",
  },
  { id: "EX-K02", items: ["2 × veggie wraps"], stage: "preparing" },
  { id: "EX-K03", items: ["1 × sandwich", "1 × juice"], stage: "ready" },
];
export const arrivalDate = "2026-12-15",
  departureDate = "2026-12-18";
export const drinks = [
  { id: "EX-D01", name: "Sparkling water", cartons: 12, units: 12 },
  { id: "EX-D02", name: "Fruit juice", cartons: 8, units: 24 },
  { id: "EX-D03", name: "Cold brew", cartons: 6, units: 6 },
] as const;
export const roomStates: RoomState[] = ["ready", "occupied", "service"];
export const roomLabels: Record<RoomState, string> = {
  ready: "Ready",
  occupied: "Occupied",
  service: "Service",
};
export const rooms: {
  id: string;
  floor: string;
  rate: number;
  state: RoomState;
}[] = [
  { id: "101", floor: "01", rate: 4500, state: "occupied" },
  { id: "102", floor: "01", rate: 4500, state: "ready" },
  { id: "103", floor: "01", rate: 5200, state: "service" },
  { id: "201", floor: "02", rate: 6000, state: "occupied" },
  { id: "202", floor: "02", rate: 6000, state: "occupied" },
  { id: "203", floor: "02", rate: 6500, state: "ready" },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (amount: number) =>
  new Intl.NumberFormat("en-US").format(amount);
export const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
