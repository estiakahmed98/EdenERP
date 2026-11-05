export const industrialSlugs = ["textile", "metal", "furniture"] as const;
export type IndustrialSlug = (typeof industrialSlugs)[number];
type Content = {
  title: string;
  category: string;
  eyebrow: string;
  headline: string;
  accent: string;
  description: string;
  demoTitle: string;
  demoDescription: string;
  steps: [string, string][];
  tools: { title: string; href: string; body: string }[];
  related: { title: string; href: string }[];
  faqs: [string, string][];
};
const tool = (title: string, href: string, body: string) => ({
  title,
  href,
  body,
});
const bom = tool(
  "Bill of materials",
  "/apps/manufacturing/bill-of-materials",
  "Explore component and material records in the existing presentation.",
);
const orders = tool(
  "Production orders",
  "/apps/manufacturing/production-orders",
  "Follow the production-order presentation.",
);
const routings = tool(
  "Routings",
  "/apps/manufacturing/routings",
  "Explore the sequence of operations and work-centre context.",
);
const qc = tool(
  "Quality control",
  "/apps/manufacturing/quality-control",
  "Look at the inspection and quality workspace.",
);
const manufacturingLinks = [
  { title: "Steel", href: "/industries/steel" },
  { title: "Agro & Rice", href: "/industries/agro-rice" },
];
export const pages: Record<IndustrialSlug, Content> = {
  textile: {
    title: "Textile Manufacturing",
    category: "Garments & Textile",
    eyebrow: "FROM THE FIRST THREAD TO THE FINISH",
    headline: "A fabric of connected details.",
    accent: "A clearer manufacturing story.",
    description:
      "Bring the material, process stage and length assumptions into a considered view. Keep the detail behind the fabric as readable as the fabric itself.",
    demoTitle: "Follow an example length through three stages.",
    demoDescription:
      "Enter an incoming fabric length and three fictional loss percentages. See sequential length arithmetic, with each stage rounded to millimetres.",
    steps: [
      [
        "The material",
        "Keep the lot identity and unit of measure clear from the start.",
      ],
      [
        "The process",
        "Read each entered stage assumption before the next handoff.",
      ],
      [
        "The record",
        "Explore the existing lot, order, routing and quality presentations.",
      ],
    ],
    tools: [
      tool(
        "Batches & lots",
        "/apps/manufacturing/batches-lots",
        "Explore lot identity and traceability context.",
      ),
      orders,
      routings,
      qc,
    ],
    related: [
      { title: "Garments", href: "/industries/garments" },
      { title: "Accessories", href: "/industries/accessories" },
      { title: "Buying House", href: "/industries/buying-house" },
      { title: "Merchandising", href: "/industries/merchandising" },
    ],
    faqs: [
      [
        "Is the loss percentage a textile standard?",
        "No. Every percentage is an editable assumption. The exercise models length subtraction only, without material, machine or process recommendations.",
      ],
      [
        "Does the example convert yarn into fabric?",
        "No. It keeps metres throughout. It does not convert mass to length, model width or GSM, or estimate dye/chemical requirements.",
      ],
      [
        "How are the stage values calculated?",
        "Each stage applies its entered loss percentage to the previous stage’s remaining length, then rounds that result to the nearest millimetre. This is not a saved production forecast.",
      ],
    ],
  },
  metal: {
    title: "Metal Fabrication",
    category: "Manufacturing",
    eyebrow: "THE DETAIL BEHIND EVERY PIECE",
    headline: "Precision starts with clarity.",
    accent: "From the stock bar to the job.",
    description:
      "Bring stock length, requested pieces and the assumptions behind a cutting conversation into focus. A measured, modern perspective on fabrication work.",
    demoTitle: "Explore a simple one-length cutting pattern.",
    demoDescription:
      "Enter stock length, piece length, a per-piece allowance and requested pieces. Calculate grouped patterns in whole millimetres, without creating a cutting plan.",
    steps: [
      [
        "The stock",
        "Keep stock length and requested piece length in the same unit.",
      ],
      ["The allowance", "Make the assumed consumption per piece explicit."],
      [
        "The handoff",
        "Explore BOM, routing, scrap and production-order presentations.",
      ],
    ],
    tools: [
      bom,
      routings,
      tool(
        "Scrap & waste",
        "/apps/manufacturing/scrap-waste",
        "Explore the existing scrap and waste presentation.",
      ),
      orders,
    ],
    related: [
      ...manufacturingLinks,
      {
        title: "Furniture Production",
        href: "/industries/manufacturing/furniture",
      },
      { title: "Textile", href: "/industries/manufacturing/textile" },
    ],
    faqs: [
      [
        "Is this a machine-ready cutting plan?",
        "No. It is one-dimensional arithmetic with one piece length. It does not evaluate tools, material properties, fixtures, end trim or machine constraints.",
      ],
      [
        "What does the allowance represent?",
        "An entered whole-millimetre allowance consumed for every piece, including final separation. It is an explicit example assumption, not a recommended kerf or end-trim rule.",
      ],
      [
        "How are the patterns grouped?",
        "The example shows the count of full-pattern bars and, when necessary, one partial-pattern bar. Remaining length is an arithmetic remainder, not a guaranteed reusable offcut.",
      ],
    ],
  },
  furniture: {
    title: "Furniture Production",
    category: "Manufacturing",
    eyebrow: "CRAFT IN THE OBJECT. CLARITY IN THE PARTS.",
    headline: "Thoughtfully made.",
    accent: "Clearly connected, part by part.",
    description:
      "Bring the design, component counts and assembly conversation into one composed experience. Keep the records behind each furniture piece in view.",
    demoTitle: "Read the components behind a small batch.",
    demoDescription:
      "Enter a fictional order quantity, per-chair component counts and stock. Compare component-only kit coverage, without reserving parts or releasing production.",
    steps: [
      [
        "The design",
        "Keep the product identity and component context together.",
      ],
      [
        "The parts",
        "Compare whole-piece requirements for each component separately.",
      ],
      [
        "The assembly",
        "Explore BOM, production, costing and quality presentations.",
      ],
    ],
    tools: [
      bom,
      orders,
      tool(
        "Production costing",
        "/apps/manufacturing/production-costing",
        "Explore the existing manufacturing-cost presentation.",
      ),
      qc,
    ],
    related: [
      ...manufacturingLinks,
      { title: "Metal Fabrication", href: "/industries/manufacturing/metal" },
      { title: "Furniture Retail", href: "/industries/retail/furniture-store" },
    ],
    faqs: [
      [
        "Does kit coverage mean furniture is available?",
        "No. The count considers only the three entered component lines. It excludes labour, machines, other materials, quality and assembly constraints.",
      ],
      [
        "What units does the example use?",
        "Whole pieces for each separately identified component. It does not combine timber volume, fabric length or weight into a piece count.",
      ],
      [
        "Does editing the example reserve or order parts?",
        "No. Every figure is fictional and changes locally. No stock reservation, purchasing, BOM change or production order is created.",
      ],
    ],
  },
};
export const textileStages = ["Preparation", "Colour process", "Finishing"];
export const defaultLosses = [1, 2, 0.5];
export const components = [
  { id: "EX-F01", name: "Leg component", perUnit: 4, stock: 80 },
  { id: "EX-F02", name: "Seat panel", perUnit: 1, stock: 30 },
  { id: "EX-F03", name: "Fastener kit", perUnit: 1, stock: 20 },
] as const;
export const num = (value: number, decimals = 0) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals }).format(
    value,
  );
export const routeFor = (slug: IndustrialSlug) =>
  `/industries/manufacturing/${slug}`;
