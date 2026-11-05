export const retailSlugs = [
  "book-store",
  "clothing-store",
  "furniture-store",
  "grocery-store",
  "hardware-store",
  "toy-store",
] as const;
export type RetailSlug = (typeof retailSlugs)[number];
type Content = {
  title: string;
  category: string;
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
const pos = tool(
  "Point of sale",
  "/apps/pos/register-till",
  "Explore the register and checkout presentation.",
);
const stock = tool(
  "Outlet stock",
  "/apps/pos/outlet-stock",
  "Look at the stock and count-sheet workspace.",
);
const loyalty = tool(
  "Loyalty & vouchers",
  "/apps/pos/loyalty-vouchers",
  "Explore the customer-rewards presentation.",
);
const outlets = tool(
  "Outlet dashboard",
  "/apps/pos/outlet-dashboard",
  "Follow the outlet reporting presentation.",
);
const transfers = tool(
  "Stock transfers",
  "/apps/pos/transfers",
  "Explore the warehouse-to-outlet handoff.",
);
const products = tool(
  "Items & products",
  "/apps/accounting/items-products",
  "Look at item records and catalogue context.",
);
export const pages: Record<RetailSlug, Content> = {
  "book-store": {
    title: "Book Store",
    category: "FOR THE BUSINESS OF BOOKS",
    headline: "A good story starts",
    accent: "with a well-run bookstore.",
    description:
      "Bring the shelf, the reader and the counter into one conversation. Explore a retail experience shaped around books and the details behind every title.",
    demoTitle: "Build a reader’s basket.",
    demoDescription:
      "Pick from three fictional titles and adjust their quantities. See the basket update in BDT, without placing an order.",
    story: "From a title on the shelf to a reader at the counter.",
    stages: [
      {
        label: "The catalogue",
        title: "Give every title a clear place.",
        body: "Discuss how title, edition, item identity and shelf context fit into your own catalogue.",
        points: ["Item identity", "Edition context", "Shelf and stock"],
      },
      {
        label: "The counter",
        title: "Keep the basket easy to read.",
        body: "Use the local book basket to explore quantities and prices, then open the register presentation for the wider checkout conversation.",
        points: ["Selected titles", "Piece quantities", "Clear basket total"],
      },
      {
        label: "The return visit",
        title: "Make room for the next chapter.",
        body: "Explore customer loyalty and outlet reporting with an advisor using your own retail process.",
        points: ["Customer context", "Rewards discussion", "Outlet reporting"],
      },
    ],
    tools: [pos, stock, loyalty, outlets],
    faqs: [
      [
        "Are these real books and prices?",
        "No. The titles, identifiers, stock and BDT prices are fictional examples. The local basket does not check availability or create a sale.",
      ],
      [
        "Does the example include taxes or discounts?",
        "No. It totals the entered book quantities at the displayed illustrative unit prices. The full checkout workflow is discussed separately.",
      ],
      [
        "Can we review our catalogue and counter process?",
        "Yes. Use the shared advisor button to discuss catalogue structure, checkout, stock and customer-rewards questions.",
      ],
    ],
  },
  "clothing-store": {
    title: "Clothing Store",
    category: "A CLEARER VIEW OF YOUR COLLECTION",
    headline: "Every colour. Every size.",
    accent: "One considered retail experience.",
    description:
      "Give the collection a clear operational picture—from colour and size combinations to the stock behind the next customer request.",
    demoTitle: "Find the detail behind a variant.",
    demoDescription:
      "Choose a fictional colour and size, then compare the requested pieces with illustrative stock. Nothing is reserved or sold.",
    story: "Let the collection’s details travel with the sale.",
    stages: [
      {
        label: "The collection",
        title: "Start with the colour and size.",
        body: "A garment is more than its style name. Explore the variants that give a collection its retail detail.",
        points: ["Style identity", "Colour choices", "Size combinations"],
      },
      {
        label: "The stock picture",
        title: "Read the specific variant.",
        body: "The example checks the selected colour-size combination, rather than combining unlike variants into a single stock promise.",
        points: [
          "Variant identifier",
          "Example on-hand pieces",
          "Requested pieces",
        ],
      },
      {
        label: "The store journey",
        title: "Connect the collection to the outlet.",
        body: "Explore the existing outlet and transfer presentations for a discussion of where the collection lives.",
        points: ["Outlet records", "Stock handoffs", "Register context"],
      },
    ],
    tools: [products, stock, transfers, pos],
    faqs: [
      [
        "Is the variant stock connected to a live store?",
        "No. All nine colour-size combinations contain fictional stock values. The comparison happens only in your browser.",
      ],
      [
        "Will choosing a variant reserve it?",
        "No. The result is an illustrative quantity comparison; it creates no reservation, transfer or sale.",
      ],
      [
        "What happens when a request exceeds the example stock?",
        "The example shows the shortfall for that exact variant. It does not claim that another outlet can fulfil it.",
      ],
    ],
  },
  "furniture-store": {
    title: "Furniture Store",
    category: "FROM THE SHOWROOM TO THE ORDER",
    headline: "A beautiful room.",
    accent: "A clearer order behind it.",
    description:
      "Bring finishes, furniture pieces and delivery context into a considered retail conversation. Make the details behind the showroom arrangement easy to follow.",
    demoTitle: "Compose a small showroom set.",
    demoDescription:
      "Select a fictional finish, piece quantities and an illustrative delivery amount. The calculation is a local estimate, not a saved quotation.",
    story: "Keep the choices behind the room in view.",
    stages: [
      {
        label: "The arrangement",
        title: "See the pieces as a set.",
        body: "Use the furniture composition to discuss which pieces belong together and how they appear on the order.",
        points: ["Selected furniture", "Piece quantities", "Room context"],
      },
      {
        label: "The finish",
        title: "Make the chosen finish explicit.",
        body: "The local example applies a displayed fictional surcharge to every selected piece. Actual pricing rules are not inferred.",
        points: [
          "Finish selection",
          "Visible surcharge",
          "Calculated piece values",
        ],
      },
      {
        label: "The handoff",
        title: "Carry delivery context into the conversation.",
        body: "The entered delivery amount is arithmetic only. Discuss real order and dispatch requirements with an advisor.",
        points: ["Order detail", "Delivery context", "Stock handoff"],
      },
    ],
    tools: [products, pos, stock, transfers],
    faqs: [
      [
        "Is this an actual furniture quote?",
        "No. The furniture, finishes, unit prices and delivery amount are fictional assumptions. The example does not save a quote or promise availability.",
      ],
      [
        "How is the finish surcharge applied?",
        "The displayed surcharge is added to each selected furniture piece before quantity multiplication. Delivery is added once to the set.",
      ],
      [
        "Does the room drawing check furniture dimensions?",
        "No. It is a conceptual top-view illustration, not a scale plan or a room-fit calculation.",
      ],
    ],
  },
  "grocery-store": {
    title: "Grocery Store",
    category: "A FRESH PERSPECTIVE ON RETAIL",
    headline: "The everyday shop.",
    accent: "With the details in view.",
    description:
      "Keep the counter moving while bringing the batch, quantity and date conversation closer to the shelf. A fresh visual perspective on everyday retail work.",
    demoTitle: "Read the dates behind the shelf.",
    demoDescription:
      "Move an example reference date and inspect four fictional batches. Date differences are calendar arithmetic, not a food-safety or saleability decision.",
    story: "Make shelf context part of the daily conversation.",
    stages: [
      {
        label: "Incoming stock",
        title: "Give the batch its context.",
        body: "Discuss item, received quantity and recorded dates as separate details rather than one generic stock number.",
        points: ["Item and batch", "Recorded quantity", "Recorded date"],
      },
      {
        label: "Date review",
        title: "Keep the reference date visible.",
        body: "The date exercise identifies past, matching and future labels relative to an entered date. The three-day window is an editable example assumption.",
        points: [
          "Reference date",
          "Calendar-day difference",
          "Review-window assumption",
        ],
      },
      {
        label: "The counter",
        title: "Connect the shelf with the next sale.",
        body: "Explore the existing stock and register presentations for your store’s operational discussion.",
        points: [
          "Shelf and store context",
          "Register workflow",
          "Outlet reporting",
        ],
      },
    ],
    tools: [stock, pos, transfers, outlets],
    faqs: [
      [
        "Does a future date mean a batch is safe to sell?",
        "No. This example only subtracts dates. It does not assess storage conditions, food safety, legal requirements or saleability.",
      ],
      [
        "Are these real batch records?",
        "No. All batch identifiers, quantities and dates are fictional and remain unchanged when you move the example reference date.",
      ],
      [
        "Does the review window change inventory?",
        "No. It only changes which date labels fall inside the local example window. There is no stock write-off or purchasing action.",
      ],
    ],
  },
  "hardware-store": {
    title: "Hardware Store",
    category: "PRECISION AT THE TRADE COUNTER",
    headline: "From the smallest fixing",
    accent: "to the complete order.",
    description:
      "Bring packs, individual units and trade-counter quantities into focus. Keep the numbers behind the requested item as precise as the job it belongs to.",
    demoTitle: "Turn a unit shortage into whole packs.",
    demoDescription:
      "Enter a target quantity, example stock and units per pack. Calculate the packs needed and the remaining units, without creating a purchase.",
    story: "Keep the unit clear from shelf to counter.",
    stages: [
      {
        label: "Item identity",
        title: "Start with the exact item.",
        body: "A fixing’s item record and unit matter. The concept drawing is decorative; actual specifications belong in your own records.",
        points: [
          "Item identifier",
          "Recorded specification",
          "Unit of measure",
        ],
      },
      {
        label: "Pack arithmetic",
        title: "Order in packs. Read the result in units.",
        body: "The local calculator rounds purchase packs upward so the example unit target can be met.",
        points: ["Target units", "Units already on hand", "Whole packs needed"],
      },
      {
        label: "Counter handoff",
        title: "Keep purchasing and selling context distinct.",
        body: "Explore the stock and register presentations without turning the arithmetic example into a real purchase or sale.",
        points: ["Stock context", "Counter request", "Product records"],
      },
    ],
    tools: [products, stock, pos, transfers],
    faqs: [
      [
        "Does the calculator order stock?",
        "No. It calculates a pack quantity from entered whole numbers. No supplier order, reservation or stock movement is created.",
      ],
      [
        "Why can there be units left over?",
        "When the shortage is not divisible by the pack size, the result rounds up to a full pack. The remaining units are shown explicitly.",
      ],
      [
        "Does the drawing specify a certified fixing?",
        "No. It is a conceptual illustration only. It does not represent an actual product specification or certification.",
      ],
    ],
  },
  "toy-store": {
    title: "Toy Store",
    category: "A LITTLE PLAY. A LOT MORE CLARITY.",
    headline: "Make space for play.",
    accent: "Keep the shop in order.",
    description:
      "Bring a playful collection to life while keeping the basket, gifting detail and stock conversation clear. Retail deserves a little imagination and a considered workflow.",
    demoTitle: "Put together a gift basket.",
    demoDescription:
      "Choose fictional toys, add optional gift wrap and compare the total with an entered budget. The example does not process a payment or reserve items.",
    story: "Give the joyful part a thoughtful retail backdrop.",
    stages: [
      {
        label: "The collection",
        title: "Let each item have its own identity.",
        body: "Explore the collection through fictional product cards, with visible prices and separate item records.",
        points: [
          "Product identity",
          "Displayed example price",
          "Selected pieces",
        ],
      },
      {
        label: "The gift",
        title: "Make the basket easy to understand.",
        body: "The gift example adds the selected toys and a single entered wrap charge before comparing the total with the budget.",
        points: ["Selected toys", "Optional wrap", "Budget difference"],
      },
      {
        label: "The next visit",
        title: "Carry the conversation beyond the gift.",
        body: "Explore loyalty, checkout and outlet reporting without inventing reviews or safety badges.",
        points: [
          "Checkout context",
          "Customer-rewards discussion",
          "Outlet reporting",
        ],
      },
    ],
    tools: [pos, loyalty, stock, outlets],
    faqs: [
      [
        "Are these toys available for purchase?",
        "No. The products, prices and identifiers are fictional. The example has no checkout, payment or stock reservation.",
      ],
      [
        "Does the page recommend toys for a particular age?",
        "No. The illustrations have no age guidance, safety claims or certifications. Actual product suitability needs its own verified information.",
      ],
      [
        "What if the basket exceeds the entered budget?",
        "The local example shows the amount over budget. You can change the selection or budget without submitting anything.",
      ],
    ],
  },
};
export const books = [
  {
    id: "EX-B01",
    name: "The Quiet Atlas",
    detail: "Travel essays · paperback",
    price: 450,
    colour: "blue",
  },
  {
    id: "EX-B02",
    name: "Small Garden Notes",
    detail: "Nature journal · hardback",
    price: 680,
    colour: "green",
  },
  {
    id: "EX-B03",
    name: "A City in Lines",
    detail: "Illustrated fiction · paperback",
    price: 520,
    colour: "sand",
  },
] as const;
export const colours = [
  { id: "navy", name: "Navy", hex: "#31527a" },
  { id: "sage", name: "Sage", hex: "#91a990" },
  { id: "cream", name: "Cream", hex: "#ded5c3" },
] as const;
export const clothingSizes = ["S", "M", "L"] as const;
export const variantStock = [
  [8, 12, 5],
  [4, 0, 7],
  [6, 9, 3],
];
export const furniture = [
  { id: "sofa", name: "Studio sofa", price: 28500 },
  { id: "chair", name: "Reading chair", price: 12500 },
  { id: "table", name: "Low table", price: 6800 },
] as const;
export const finishes = [
  { id: "natural", name: "Natural", extra: 0 },
  { id: "oak", name: "Warm oak", extra: 900 },
  { id: "walnut", name: "Walnut", extra: 1500 },
] as const;
export const batches = [
  { id: "EX-G01", name: "Milk carton", quantity: 24, date: "2026-12-14" },
  { id: "EX-G02", name: "Yoghurt cup", quantity: 36, date: "2026-12-16" },
  { id: "EX-G03", name: "Bread loaf", quantity: 18, date: "2026-12-15" },
  { id: "EX-G04", name: "Oat pack", quantity: 42, date: "2027-01-12" },
] as const;
export const referenceDate = "2026-12-15";
export const toys = [
  {
    id: "EX-T01",
    name: "Shape blocks",
    detail: "Fictional wooden set",
    price: 850,
    kind: "blocks",
  },
  {
    id: "EX-T02",
    name: "Little train",
    detail: "Fictional play collection",
    price: 1250,
    kind: "train",
  },
  {
    id: "EX-T03",
    name: "Pattern puzzle",
    detail: "Fictional puzzle box",
    price: 650,
    kind: "puzzle",
  },
] as const;
export const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
export const num = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
export const dateLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
