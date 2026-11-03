export const manufacturingSlugs = [
  "work-centers",
  "routings",
  "bill-of-materials",
  "mrp-planning",
  "capacity-planning",
  "master-schedule-mps",
  "scheduling-aps",
  "line-planning-board",
  "order-allocation",
  "shop-floor",
  "batches-lots",
  "serial-numbers",
  "qc-templates",
  "quality-control",
  "scrap-waste",
  "subcontracting",
  "standard-costing",
  "production-costing",
] as const;

export type ManufacturingSlug = (typeof manufacturingSlugs)[number];
export type PreviewView = "table" | "board" | "timeline" | "cost" | "trace";
export type SampleRow = readonly [
  id: string,
  name: string,
  context: string,
  status: string,
  value: number,
  progress: number,
  note: string,
];
export type ContentStep = readonly [title: string, description: string];
export type ModuleLink = ManufacturingSlug | "production-orders";
export type Capability = readonly [
  title: string,
  description: string,
  link: ModuleLink,
];

export type ManufacturingModuleContent = {
  title: string;
  category: string;
  icon:
    | "factory"
    | "route"
    | "layers"
    | "plan"
    | "gauge"
    | "calendar"
    | "board"
    | "allocation"
    | "floor"
    | "batch"
    | "serial"
    | "template"
    | "quality"
    | "scrap"
    | "vendor"
    | "standard"
    | "cost";
  hero: readonly [intro: string, highlight: string];
  description: string;
  flow: readonly [string, string, string];
  callout: string;
  note: string;
  workspaceTitle: string;
  workspaceDescription: string;
  view: PreviewView;
  contextLabel: string;
  valueLabel: string;
  totalLabel: string;
  unit: "units" | "hours" | "kg" | "BDT" | "checks" | "operations";
  progressLabel: string;
  focusStatus: string;
  rows: readonly SampleRow[];
  workflow: readonly [ContentStep, ContentStep, ContentStep, ContentStep];
  capabilities: readonly [Capability, Capability, Capability];
};

/** All records and figures below are illustrative product-preview data. */
export const manufacturingModules: Record<
  ManufacturingSlug,
  ManufacturingModuleContent
> = {
  "work-centers": {
    title: "Work Centers",
    category: "Production foundation",
    icon: "factory",
    hero: ["Give every operation", "the right place to run."],
    description:
      "Bring machines, teams and external resources into one production model. Define working hours, practical capacity and rates before the first job reaches the floor.",
    flow: ["Resource calendar", "Work center", "Available capacity"],
    callout: "Know your limits before you plan.",
    note: "A machine is only as available as its calendar. Include downtime in the plan.",
    workspaceTitle: "A clear picture of your production resources.",
    workspaceDescription:
      "Explore sample work centers, compare their planned load and select a resource to see its operating context.",
    view: "board",
    contextLabel: "Resource / shift",
    valueLabel: "Daily capacity",
    totalLabel: "Combined daily capacity",
    unit: "hours",
    progressLabel: "Planned utilization",
    focusStatus: "Available",
    rows: [
      [
        "WC-EXT-01",
        "Film extrusion",
        "Extrusion hall · 2 shifts",
        "Available",
        16,
        78,
        "Two shifts provide 16 practical hours. Reserve a maintenance window before adding weekend work.",
      ],
      [
        "WC-PRT-02",
        "Flexographic printing",
        "Print hall · 2 shifts",
        "Available",
        14,
        64,
        "Ink changes and cleaning are included in the practical shift allowance.",
      ],
      [
        "WC-CUT-03",
        "Cutting & sealing",
        "Conversion line · 2 shifts",
        "At capacity",
        16,
        100,
        "The sample plan fills today's capacity. Review another work center before assigning additional operations.",
      ],
      [
        "WC-PACK-04",
        "Packing station",
        "Finishing area · 1 shift",
        "Maintenance",
        6,
        0,
        "The station is held for maintenance in this example. Its nominal hours remain visible for reference.",
      ],
    ],
    workflow: [
      [
        "Define the resource",
        "Choose a machine, labor group, line or external work center.",
      ],
      [
        "Set its calendar",
        "Record shifts, working hours and expected downtime.",
      ],
      [
        "Assign capacity & rates",
        "Set practical capacity and the rates used in production costing.",
      ],
      [
        "Connect operations",
        "Reuse the resource in routings and review its planned load.",
      ],
    ],
    capabilities: [
      [
        "Capacity with context",
        "Use practical hours to make planning decisions grounded in resource availability.",
        "capacity-planning",
      ],
      [
        "One resource, many routes",
        "Keep reusable work centers connected to the operations they perform.",
        "routings",
      ],
      [
        "Rates that explain cost",
        "Carry labor, machine and overhead assumptions into standard cost cards.",
        "standard-costing",
      ],
    ],
  },
  routings: {
    title: "Routings",
    category: "Production foundation",
    icon: "route",
    hero: ["Turn a recipe into", "a repeatable process."],
    description:
      "Define the sequence of operations, the work center for each step and the time it takes. Give planning, execution and costing a common production route.",
    flow: ["Operation sequence", "Work centers & time", "Executable route"],
    callout: "The right steps, in the right order.",
    note: "Setup time belongs to the batch. Run time belongs to the operation.",
    workspaceTitle: "See how each product moves through the floor.",
    workspaceDescription:
      "Inspect sample routes and their operation counts. Select a route to review its sequence and timing assumptions.",
    view: "table",
    contextLabel: "Operation sequence",
    valueLabel: "Operations",
    totalLabel: "Defined operations",
    unit: "operations",
    progressLabel: "Route readiness",
    focusStatus: "Released",
    rows: [
      [
        "RT-PB-01",
        "PE poly bag route",
        "Extrude → Print → Seal → Inspect",
        "Released",
        4,
        100,
        "Four operations connect extrusion to final inspection. Setup is planned per batch and sealing time per unit.",
      ],
      [
        "RT-CT-02",
        "5-ply carton route",
        "Corrugate → Cut → Fold → Glue → Pack",
        "Released",
        5,
        100,
        "Five steps use dedicated conversion resources; packing follows the glue cure allowance.",
      ],
      [
        "RT-ZP-03",
        "Zipper bag route",
        "Extrude → Print → Zip → Seal → QC",
        "Review",
        5,
        80,
        "The zipper attachment operation is awaiting a reviewed work-center time.",
      ],
      [
        "RT-TG-04",
        "Printed tag route",
        "Print → Cut → Punch",
        "Draft",
        3,
        40,
        "The draft sequence is ready for timing estimates before release.",
      ],
    ],
    workflow: [
      [
        "Choose a product",
        "Create a route for the product and its production method.",
      ],
      [
        "Sequence operations",
        "Arrange work in execution order with space for future steps.",
      ],
      [
        "Set time & resources",
        "Choose work centers and per-unit, batch or fixed timing.",
      ],
      [
        "Release the route",
        "Connect quality checks and use the route on production orders.",
      ],
    ],
    capabilities: [
      [
        "Operations meet resources",
        "Every routing step has an operating work center behind it.",
        "work-centers",
      ],
      [
        "Quality in the sequence",
        "Place inspection checkpoints where the process needs them.",
        "quality-control",
      ],
      [
        "A route with a cost",
        "Use operation times and resource rates in cost rollups.",
        "standard-costing",
      ],
    ],
  },
  "bill-of-materials": {
    title: "Bill of Materials",
    category: "Production foundation",
    icon: "layers",
    hero: ["Every input accounted for.", "Every output defined."],
    description:
      "Build a clear production recipe for materials, quantities and expected outputs. Include co-products, by-products and scrap so the production model reflects the real process.",
    flow: ["Materials & quantities", "Production recipe", "Products & yield"],
    callout: "A good production plan starts here.",
    note: "Specify the output basis first. Material requirements only make sense against a defined batch quantity.",
    workspaceTitle: "Your recipes, with the details that matter.",
    workspaceDescription:
      "Browse sample BOM versions and their batch outputs. Each record explains its material and yield assumptions.",
    view: "table",
    contextLabel: "Version / materials",
    valueLabel: "Batch output",
    totalLabel: "Combined sample output",
    unit: "units",
    progressLabel: "Recipe readiness",
    focusStatus: "Released",
    rows: [
      [
        "BOM-PB-01",
        "PE poly bag 26×44",
        "v2.1 · Resin, masterbatch, ink",
        "Released",
        1000,
        100,
        "The sample recipe produces 1,000 bags. Resin, masterbatch and ink are planned against this output basis.",
      ],
      [
        "BOM-CT-02",
        "5-ply carton box",
        "v1.3 · Liner, medium, adhesive",
        "Released",
        500,
        100,
        "Paper layers and adhesive form the principal inputs. Offcuts are identified separately from finished output.",
      ],
      [
        "BOM-ZP-03",
        "Zipper poly bag",
        "v1.0 · Film, zipper, ink",
        "Review",
        1000,
        75,
        "The zipper quantity is under review before this recipe becomes the default production BOM.",
      ],
      [
        "BOM-TG-04",
        "Printed hang tag",
        "v0.2 · Board, ink, string",
        "Draft",
        2000,
        40,
        "A draft recipe for board, print ink and string. Confirm yield assumptions before release.",
      ],
    ],
    workflow: [
      [
        "Define the output",
        "Choose the finished product, BOM type and batch quantity.",
      ],
      [
        "Build the inputs",
        "Add material quantities with the correct units of measure.",
      ],
      [
        "Account for yield",
        "Identify co-products, by-products, process loss and scrap.",
      ],
      [
        "Use the recipe",
        "Link the approved BOM to planning and production orders.",
      ],
    ],
    capabilities: [
      [
        "Requirements from recipes",
        "Use product demand and BOM quantities to calculate material needs.",
        "mrp-planning",
      ],
      [
        "A consistent order starting point",
        "Production orders use the recipe as their material basis.",
        "production-orders",
      ],
      [
        "Joint output, clear cost shares",
        "Keep expected outputs connected to standard cost assumptions.",
        "standard-costing",
      ],
    ],
  },
  "mrp-planning": {
    title: "MRP Planning",
    category: "Material & production planning",
    icon: "plan",
    hero: ["Turn demand into", "a material-ready plan."],
    description:
      "Bring demand, BOM requirements, available stock and scheduled receipts into the same planning conversation. Identify shortages before they hold up production.",
    flow: ["Demand & BOMs", "Net requirements", "Supply proposals"],
    callout: "Find the shortage before the floor does.",
    note: "Check stock and expected receipts before proposing new supply. Plan the net requirement.",
    workspaceTitle: "Material requirements with a clear next action.",
    workspaceDescription:
      "Explore an illustrative planning run. Compare material coverage and inspect the proposed action for each requirement.",
    view: "table",
    contextLabel: "Demand source / material",
    valueLabel: "Net requirement",
    totalLabel: "Net material requirement",
    unit: "kg",
    progressLabel: "Material coverage",
    focusStatus: "Shortage",
    rows: [
      [
        "MRP-001",
        "LDPE resin",
        "MO-0148 · Film extrusion",
        "Shortage",
        480,
        60,
        "Gross need is 1,200 kg and available supply is 720 kg. The net requirement in this sample is 480 kg.",
      ],
      [
        "MRP-002",
        "White masterbatch",
        "MO-0148 · Color additive",
        "Covered",
        0,
        100,
        "Available material covers the planned requirement; no additional supply is proposed in this example.",
      ],
      [
        "MRP-003",
        "Kraft liner paper",
        "MO-0147 · Carton conversion",
        "Shortage",
        300,
        50,
        "A 600 kg requirement has 300 kg covered. Review the delivery lead time for the remaining 300 kg.",
      ],
      [
        "MRP-004",
        "Printing ink",
        "MO-0146 · Flexo print",
        "Incoming",
        0,
        80,
        "An expected receipt covers the remaining demand. Confirm its arrival date against the planned start.",
      ],
    ],
    workflow: [
      [
        "Collect demand",
        "Review order demand and the master production schedule.",
      ],
      [
        "Expand the BOM",
        "Translate planned output into component requirements.",
      ],
      [
        "Net available supply",
        "Account for stock, reservations and scheduled receipts.",
      ],
      [
        "Review exceptions",
        "Resolve shortages and consider timed supply proposals.",
      ],
    ],
    capabilities: [
      [
        "Demand has a schedule",
        "Connect material needs to the quantities and dates in the MPS.",
        "master-schedule-mps",
      ],
      [
        "Recipes drive requirements",
        "Keep component quantities tied to the chosen production BOM.",
        "bill-of-materials",
      ],
      [
        "Capacity completes the picture",
        "Review material readiness alongside practical production capacity.",
        "capacity-planning",
      ],
    ],
  },
  "capacity-planning": {
    title: "Capacity Planning",
    category: "Material & production planning",
    icon: "gauge",
    hero: ["Make room for demand.", "Before you promise it."],
    description:
      "Compare planned work with practical resource capacity. Make overloaded periods visible and review the work-center choices behind each production commitment.",
    flow: ["Planned operations", "Resource load", "Feasible capacity"],
    callout: "Spot the bottleneck early.",
    note: "Nominal hours are a starting point. Shifts, maintenance and efficiency shape usable capacity.",
    workspaceTitle: "See where your production plan needs space.",
    workspaceDescription:
      "Review sample resource loads across a five-day planning window. Switch to the register for capacity and utilization details.",
    view: "timeline",
    contextLabel: "Resource calendar",
    valueLabel: "Weekly capacity",
    totalLabel: "Weekly resource capacity",
    unit: "hours",
    progressLabel: "Planned utilization",
    focusStatus: "Overloaded",
    rows: [
      [
        "CAP-EXT",
        "Film extrusion",
        "WC-EXT-01 · 5 working days",
        "Balanced",
        80,
        85,
        "The sample extrusion plan uses 68 of 80 hours, leaving 12 hours for additional work.",
      ],
      [
        "CAP-PRT",
        "Flexo printing",
        "WC-PRT-02 · 5 working days",
        "Overloaded",
        70,
        100,
        "Demand requires 78 hours against 70 available. The meter is capped at 100%; the 8-hour overload needs action.",
      ],
      [
        "CAP-CUT",
        "Cutting & sealing",
        "WC-CUT-03 · 5 working days",
        "Balanced",
        80,
        75,
        "Sixty hours are planned against 80 available. Review operation compatibility before shifting work here.",
      ],
      [
        "CAP-PACK",
        "Packing station",
        "WC-PACK-04 · 5 working days",
        "Available",
        30,
        40,
        "The packing window has 18 spare hours in this sample planning week.",
      ],
    ],
    workflow: [
      [
        "Start with the load",
        "Collect planned operation hours by work center and period.",
      ],
      [
        "Apply the calendar",
        "Compare work with practical shifts and working time.",
      ],
      [
        "Find constraints",
        "Identify overloaded resources and unavailable periods.",
      ],
      [
        "Balance the plan",
        "Review alternate resources, timing and capacity assumptions.",
      ],
    ],
    capabilities: [
      [
        "Practical resource calendars",
        "Capacity starts with the work centers that carry the plan.",
        "work-centers",
      ],
      [
        "Sequence a feasible schedule",
        "Use the capacity picture when reviewing operation timing.",
        "scheduling-aps",
      ],
      [
        "Keep commitments realistic",
        "Review the master schedule against resource constraints.",
        "master-schedule-mps",
      ],
    ],
  },
  "master-schedule-mps": {
    title: "Master Schedule (MPS)",
    category: "Material & production planning",
    icon: "calendar",
    hero: ["Give demand a date.", "Give production a direction."],
    description:
      "Translate product demand into a time-phased production plan. Align quantities, planning periods and supply assumptions before detailed scheduling begins.",
    flow: ["Product demand", "Master schedule", "Production targets"],
    callout: "One shared plan for the week ahead.",
    note: "A production target needs a quantity and a period. Review both against materials and capacity.",
    workspaceTitle: "A shared view of what to make, and when.",
    workspaceDescription:
      "Explore sample product targets across an illustrative production week. Select a target to review its planning basis.",
    view: "timeline",
    contextLabel: "Planning basis",
    valueLabel: "Planned quantity",
    totalLabel: "Scheduled sample output",
    unit: "units",
    progressLabel: "Plan readiness",
    focusStatus: "Approved",
    rows: [
      [
        "MPS-001",
        "PE poly bag 26×44",
        "Customer demand · Week A",
        "Approved",
        12000,
        100,
        "A 12,000-unit target is approved in the sample plan, subject to normal material and capacity checks.",
      ],
      [
        "MPS-002",
        "5-ply carton box",
        "Sales orders · Week A",
        "Approved",
        4500,
        100,
        "The carton target groups committed demand into a weekly production quantity.",
      ],
      [
        "MPS-003",
        "Zipper poly bag",
        "Replenishment · Week A",
        "Review",
        8000,
        70,
        "The replenishment target is being reviewed against the printing resource constraint.",
      ],
      [
        "MPS-004",
        "Printed hang tag",
        "Forecast demand · Week A",
        "Draft",
        10000,
        35,
        "A draft forecast-based target is visible separately from approved production commitments.",
      ],
    ],
    workflow: [
      [
        "Review demand",
        "Bring product demand and expected stock needs into view.",
      ],
      [
        "Set period targets",
        "Choose production quantities for each planning window.",
      ],
      [
        "Check feasibility",
        "Review material availability and resource capacity.",
      ],
      [
        "Approve the baseline",
        "Use the agreed schedule to guide detailed planning.",
      ],
    ],
    capabilities: [
      [
        "Materials behind the target",
        "Translate scheduled output into component requirements.",
        "mrp-planning",
      ],
      [
        "Capacity behind the promise",
        "Check whether resources can support the intended plan.",
        "capacity-planning",
      ],
      [
        "Orders that execute the plan",
        "Turn agreed quantities into production work.",
        "production-orders",
      ],
    ],
  },
  "scheduling-aps": {
    title: "Scheduling (APS)",
    category: "Detailed production planning",
    icon: "calendar",
    hero: ["Sequence the work.", "Make every hour count."],
    description:
      "Bring operation timing, resource availability and production priorities into a clear scheduling view. Review the sequence before releasing work to the shop floor.",
    flow: ["Orders & priorities", "Resource sequence", "Scheduled operations"],
    callout: "A clear sequence beats a crowded queue.",
    note: "Respect operation dependencies. A free machine cannot run a job whose previous step is unfinished.",
    workspaceTitle: "A schedule you can read at a glance.",
    workspaceDescription:
      "Inspect an illustrative five-day operation plan. Select a scheduled job to see its constraint and release context.",
    view: "timeline",
    contextLabel: "Resource / dependency",
    valueLabel: "Run time",
    totalLabel: "Scheduled operation time",
    unit: "hours",
    progressLabel: "Operation completion",
    focusStatus: "Scheduled",
    rows: [
      [
        "APS-101",
        "MO-0148 · Film extrusion",
        "WC-EXT-01 · First operation",
        "Running",
        12,
        72,
        "Extrusion is in progress; its output feeds the printing operation in the example sequence.",
      ],
      [
        "APS-102",
        "MO-0148 · Flexo printing",
        "WC-PRT-02 · After extrusion",
        "Scheduled",
        8,
        0,
        "Printing follows extrusion and includes its setup allowance in the sample run time.",
      ],
      [
        "APS-103",
        "MO-0147 · Carton conversion",
        "WC-CUT-03 · Material constraint",
        "Blocked",
        10,
        0,
        "The operation has a scheduling window but remains blocked by material availability.",
      ],
      [
        "APS-104",
        "MO-0146 · Bag sealing",
        "WC-CUT-03 · After zipper fit",
        "Scheduled",
        6,
        0,
        "Sealing follows zipper attachment. Review the preceding operation before releasing work.",
      ],
    ],
    workflow: [
      [
        "Collect the work",
        "Review production orders, operations and priorities.",
      ],
      [
        "Respect constraints",
        "Check calendars, dependencies and material readiness.",
      ],
      ["Sequence operations", "Place work into a resource-based schedule."],
      [
        "Review & release",
        "Resolve exceptions and communicate the working sequence.",
      ],
    ],
    capabilities: [
      [
        "Know the available hours",
        "Bring practical resource capacity into the scheduling review.",
        "capacity-planning",
      ],
      [
        "A visual plan by line",
        "Follow scheduled work in the production line view.",
        "line-planning-board",
      ],
      [
        "From timing to execution",
        "Give the floor a clear operation sequence.",
        "shop-floor",
      ],
    ],
  },
  "line-planning-board": {
    title: "Line Planning Board",
    category: "Detailed production planning",
    icon: "board",
    hero: ["Every line in view.", "Every handoff clearer."],
    description:
      "See the work assigned to each production line, its place in the plan and the jobs that need attention. Give planners and the floor a shared visual reference.",
    flow: ["Order priorities", "Line assignments", "Visible production plan"],
    callout: "Follow the work across the line.",
    note: "Keep line assignments visible. Resolve a blocked handoff before loading more work behind it.",
    workspaceTitle: "Your line plan, without the blind spots.",
    workspaceDescription:
      "Browse sample line assignments by execution state. Switch between board and register views to inspect the same work.",
    view: "board",
    contextLabel: "Line assignment",
    valueLabel: "Assigned output",
    totalLabel: "Output on the sample board",
    unit: "units",
    progressLabel: "Job completion",
    focusStatus: "Running",
    rows: [
      [
        "LINE-101",
        "MO-0148 · PE bags",
        "Line A-01 · Extrusion",
        "Running",
        2400,
        72,
        "Line A-01 is executing the extrusion job. Follow the remaining output before the next handoff.",
      ],
      [
        "LINE-102",
        "MO-0146 · Zipper bags",
        "Line A-02 · Conversion",
        "Ready",
        3200,
        0,
        "The sample job is assigned and ready for its first planned operation.",
      ],
      [
        "LINE-103",
        "MO-0147 · Cartons",
        "Line B-02 · Folding",
        "Blocked",
        1800,
        42,
        "The carton assignment needs material attention before work can continue.",
      ],
      [
        "LINE-104",
        "MO-0145 · Hang tags",
        "Line C-01 · Finishing",
        "Completed",
        1600,
        100,
        "Finishing is complete. The assignment remains visible as part of the board's production context.",
      ],
    ],
    workflow: [
      [
        "Review the queue",
        "Start with the production work that needs line capacity.",
      ],
      [
        "Assign the line",
        "Match the job to an appropriate production resource.",
      ],
      [
        "Follow the handoffs",
        "Review readiness, running work and blocked assignments.",
      ],
      [
        "Reconcile progress",
        "Compare the visible plan with execution and completion.",
      ],
    ],
    capabilities: [
      [
        "A schedule behind the board",
        "Keep assignments connected to the detailed operation plan.",
        "scheduling-aps",
      ],
      [
        "Work at the station",
        "Follow what operators are executing on the floor.",
        "shop-floor",
      ],
      [
        "Allocation with context",
        "Review the order quantities committed to each line.",
        "order-allocation",
      ],
    ],
  },
  "order-allocation": {
    title: "Order Allocation",
    category: "Detailed production planning",
    icon: "allocation",
    hero: ["Place every order", "where it can succeed."],
    description:
      "Connect production quantities to suitable lines and resources. Review allocated work, remaining quantities and the constraints behind each assignment.",
    flow: ["Order quantity", "Resource assignment", "Allocated work"],
    callout: "Make the commitment visible.",
    note: "An allocation is a production commitment. Check both resource suitability and remaining quantity.",
    workspaceTitle: "A clear owner for every production quantity.",
    workspaceDescription:
      "Explore sample allocations and compare how much of each order has been assigned to a production line.",
    view: "board",
    contextLabel: "Assigned resource",
    valueLabel: "Allocated quantity",
    totalLabel: "Allocated sample output",
    unit: "units",
    progressLabel: "Order allocation",
    focusStatus: "Allocated",
    rows: [
      [
        "ALC-101",
        "MO-0148 · PE bags",
        "Line A-01 · 2,400 of 2,400",
        "Allocated",
        2400,
        100,
        "The full sample order quantity is assigned to line A-01.",
      ],
      [
        "ALC-102",
        "MO-0147 · Cartons",
        "Line B-02 · 900 of 1,800",
        "Partial",
        900,
        50,
        "Half of the sample order is allocated. Review capacity for the remaining 900 units.",
      ],
      [
        "ALC-103",
        "MO-0146 · Zipper bags",
        "Line A-02 · 3,200 of 3,200",
        "Allocated",
        3200,
        100,
        "The order quantity is assigned, with execution readiness reviewed separately.",
      ],
      [
        "ALC-104",
        "MO-0144 · Backboards",
        "Awaiting resource selection",
        "Unallocated",
        0,
        0,
        "No production quantity is allocated in this example. Choose a suitable resource after reviewing the plan.",
      ],
    ],
    workflow: [
      [
        "Choose the order",
        "Review the product, quantity and required production method.",
      ],
      [
        "Check the resource",
        "Compare suitability, capacity and planned workload.",
      ],
      [
        "Assign quantities",
        "Allocate the intended quantity and review any remainder.",
      ],
      [
        "Follow the commitment",
        "Keep the allocation visible through planning and execution.",
      ],
    ],
    capabilities: [
      [
        "Capacity before commitment",
        "Check practical resource load before assigning output.",
        "capacity-planning",
      ],
      [
        "Assignments on a shared board",
        "Make line-level commitments visible to the production team.",
        "line-planning-board",
      ],
      [
        "One production order context",
        "Connect the allocation to the order it supports.",
        "production-orders",
      ],
    ],
  },
  "shop-floor": {
    title: "Shop Floor",
    category: "Production execution",
    icon: "floor",
    hero: ["Bring the plan", "to the people making it."],
    description:
      "Keep operations, output and quality checkpoints close to the work. Help teams follow the production sequence and record what happens at each station.",
    flow: ["Released operation", "Operator execution", "Recorded output"],
    callout: "The next operation, right in front of you.",
    note: "Record output where the work happens. Keep accepted output, by-products and scrap distinct.",
    workspaceTitle: "A focused view of the work on the floor.",
    workspaceDescription:
      "Select sample operation cards to inspect progress, work-center context and the next action at the station.",
    view: "board",
    contextLabel: "Station / operation",
    valueLabel: "Target quantity",
    totalLabel: "Sample operation targets",
    unit: "units",
    progressLabel: "Recorded output",
    focusStatus: "Running",
    rows: [
      [
        "OP-0148-10",
        "PE bag extrusion",
        "WC-EXT-01 · MO-0148",
        "Running",
        2400,
        72,
        "The operation has recorded 1,728 of 2,400 target units. Review the remaining production quantity.",
      ],
      [
        "OP-0146-20",
        "Zipper attachment",
        "WC-CUT-03 · MO-0146",
        "Ready",
        3200,
        0,
        "The sample operation is ready. Confirm the assigned station and quality instructions before starting.",
      ],
      [
        "OP-0147-30",
        "Carton folding",
        "WC-CUT-03 · MO-0147",
        "Blocked",
        1800,
        42,
        "A material shortage is holding the next production quantity. Keep the exception visible to planning.",
      ],
      [
        "OP-0145-40",
        "Tag final inspection",
        "WC-PACK-04 · MO-0145",
        "Completed",
        1600,
        100,
        "All target units are recorded for the sample operation and the completion check is finished.",
      ],
    ],
    workflow: [
      [
        "Find the operation",
        "Open the assigned production work and station context.",
      ],
      [
        "Run the sequence",
        "Follow operation instructions and required checkpoints.",
      ],
      [
        "Record actual output",
        "Capture finished output and distinguish process losses.",
      ],
      [
        "Validate the handoff",
        "Complete the operation and prepare the next step.",
      ],
    ],
    capabilities: [
      [
        "Instructions from the route",
        "Keep the operation sequence linked to the production method.",
        "routings",
      ],
      [
        "Quality at the station",
        "Inspect the product where defects can be identified.",
        "quality-control",
      ],
      [
        "Actual production cost",
        "Use execution context when reviewing actual order costs.",
        "production-costing",
      ],
    ],
  },
  "batches-lots": {
    title: "Batches / Lots",
    category: "Production traceability",
    icon: "batch",
    hero: ["Follow the batch.", "Keep its story intact."],
    description:
      "Give grouped production and material quantities a traceable identity. Follow lot references across receipt, production, inspection and finished output.",
    flow: ["Input lot", "Production batch", "Output lot"],
    callout: "A reference that follows the material.",
    note: "Keep the input-to-output relationship. A batch label is most useful when its production history is clear.",
    workspaceTitle: "Trace the batch behind the finished quantity.",
    workspaceDescription:
      "Select a sample lot to explore its source, production and quality context. The trace is illustrative and does not change stock.",
    view: "trace",
    contextLabel: "Source / production reference",
    valueLabel: "Lot quantity",
    totalLabel: "Sample lot quantity",
    unit: "kg",
    progressLabel: "Trace record completeness",
    focusStatus: "Released",
    rows: [
      [
        "LOT-RM-1101",
        "LDPE resin lot",
        "Receipt GRN-1101 · Supplier batch R81",
        "Released",
        1200,
        100,
        "Supplier lot R81 is received and identified as an input source for the sample production run.",
      ],
      [
        "LOT-WIP-1102",
        "Extruded film batch",
        "LOT-RM-1101 → MO-0148",
        "In process",
        720,
        75,
        "The in-process film batch retains its input lot and production-order reference.",
      ],
      [
        "LOT-FG-1103",
        "Finished PE bag lot",
        "MO-0148 → Final inspection",
        "Released",
        650,
        100,
        "The finished lot links accepted output to the production order and its inspection context.",
      ],
      [
        "LOT-QH-1104",
        "Printed film hold lot",
        "MO-0146 · Print inspection",
        "On hold",
        180,
        60,
        "This sample lot is held for print review. Its status remains distinct from released quantities.",
      ],
    ],
    workflow: [
      [
        "Identify the source",
        "Record the input lot and its receipt reference.",
      ],
      [
        "Link production",
        "Keep source lots associated with the production batch.",
      ],
      ["Review quality", "Follow inspection and release or hold status."],
      [
        "Trace the output",
        "Retain the relationship to finished production quantities.",
      ],
    ],
    capabilities: [
      [
        "An order behind every batch",
        "Follow the production work that transformed the material.",
        "production-orders",
      ],
      [
        "Release with quality context",
        "Keep inspections associated with the lot under review.",
        "quality-control",
      ],
      [
        "Individual identity where needed",
        "Use serial-level records for individually tracked products.",
        "serial-numbers",
      ],
    ],
  },
  "serial-numbers": {
    title: "Serial Numbers",
    category: "Production traceability",
    icon: "serial",
    hero: ["An identity for", "every individual unit."],
    description:
      "Follow individually identified products through production and quality review. Connect each serial reference to the product and production context behind it.",
    flow: ["Product identity", "Serial assignment", "Unit history"],
    callout: "One unit. One traceable reference.",
    note: "Use serials for individual identity and lots for grouped quantities. Choose the level your product needs.",
    workspaceTitle: "Look beyond the quantity to the individual unit.",
    workspaceDescription:
      "Search sample serial references and select a unit to inspect its production and quality context.",
    view: "trace",
    contextLabel: "Order / product reference",
    valueLabel: "Identified units",
    totalLabel: "Individually tracked units",
    unit: "units",
    progressLabel: "Unit record completeness",
    focusStatus: "Released",
    rows: [
      [
        "SN-2026-00081",
        "Sealing unit assembly",
        "MO-0161 · Product SEAL-01",
        "Released",
        1,
        100,
        "The sample unit has a production reference and completed inspection context.",
      ],
      [
        "SN-2026-00082",
        "Sealing unit assembly",
        "MO-0161 · Product SEAL-01",
        "In process",
        1,
        70,
        "Assembly is recorded; the final inspection reference is still pending.",
      ],
      [
        "SN-2026-00083",
        "Scale controller",
        "MO-0162 · Product CTRL-02",
        "On hold",
        1,
        80,
        "A calibration review holds this individual unit separately from the rest of its production group.",
      ],
      [
        "SN-2026-00084",
        "Scale controller",
        "MO-0162 · Product CTRL-02",
        "Released",
        1,
        100,
        "This unit is individually identified with a completed quality reference.",
      ],
    ],
    workflow: [
      [
        "Choose serial tracking",
        "Identify the products that need unit-level references.",
      ],
      [
        "Assign the identity",
        "Associate an individual serial with its production context.",
      ],
      [
        "Follow inspections",
        "Review the checks and status attached to the unit.",
      ],
      [
        "Retain the history",
        "Keep the identity available for later traceability review.",
      ],
    ],
    capabilities: [
      [
        "Production context",
        "Find the order associated with the individual product.",
        "production-orders",
      ],
      [
        "Quality at unit level",
        "Review the inspection context for an identified unit.",
        "quality-control",
      ],
      [
        "Batch-level relationships",
        "Keep grouped material history alongside unit identity.",
        "batches-lots",
      ],
    ],
  },
  "qc-templates": {
    title: "QC Templates",
    category: "Quality management",
    icon: "template",
    hero: ["Define quality once.", "Inspect consistently."],
    description:
      "Build reusable inspection templates with clear parameters, result types and acceptable limits. Give each checkpoint a consistent definition of what to measure.",
    flow: ["Quality parameters", "Inspection template", "Consistent checks"],
    callout: "Make the acceptance criteria clear.",
    note: "A useful quality parameter has a result type, a limit and a clear requirement to record it.",
    workspaceTitle: "The standard behind every inspection.",
    workspaceDescription:
      "Browse sample inspection templates, their parameter counts and readiness. Review where each template fits in production.",
    view: "table",
    contextLabel: "Inspection point",
    valueLabel: "Parameters",
    totalLabel: "Defined sample parameters",
    unit: "checks",
    progressLabel: "Template readiness",
    focusStatus: "Active",
    rows: [
      [
        "QCT-001",
        "Film thickness check",
        "In-process · Extrusion",
        "Active",
        4,
        100,
        "Numeric thickness readings, width and appearance checks define the sample extrusion inspection.",
      ],
      [
        "QCT-002",
        "Print quality review",
        "In-process · Flexographic print",
        "Active",
        5,
        100,
        "Registration, shade, adhesion and visual criteria provide a repeatable print review.",
      ],
      [
        "QCT-003",
        "Carton strength check",
        "Final inspection · Carton",
        "Review",
        3,
        70,
        "The sample strength template is awaiting confirmation of its acceptance limits.",
      ],
      [
        "QCT-004",
        "Bag seal integrity",
        "Final inspection · Sealing",
        "Draft",
        4,
        50,
        "A draft template describes seal appearance and integrity checks before approval.",
      ],
    ],
    workflow: [
      [
        "Choose the checkpoint",
        "Identify the product or process point to inspect.",
      ],
      [
        "Define parameters",
        "Choose numeric, selection or descriptive result types.",
      ],
      [
        "Set acceptable limits",
        "Record ranges and mandatory inspection requirements.",
      ],
      [
        "Reuse the template",
        "Apply the agreed standard to the relevant quality check.",
      ],
    ],
    capabilities: [
      [
        "Checks with a common standard",
        "Use consistent parameters when recording inspection results.",
        "quality-control",
      ],
      [
        "The right point in the route",
        "Associate checkpoints with the operation being performed.",
        "routings",
      ],
      [
        "Instructions near the work",
        "Keep inspection context available during execution.",
        "shop-floor",
      ],
    ],
  },
  "quality-control": {
    title: "Quality Control",
    category: "Quality management",
    icon: "quality",
    hero: ["Make quality visible.", "At every checkpoint."],
    description:
      "Keep inspection parameters, acceptance limits and recorded results together. Follow quality checks from material intake through production to finished output.",
    flow: ["Defined standard", "Recorded inspection", "Quality decision"],
    callout: "Catch the exception where it happens.",
    note: "A completed inspection needs its required results. Keep out-of-spec findings visible until reviewed.",
    workspaceTitle: "A clear view of checks, findings and decisions.",
    workspaceDescription:
      "Explore sample quality records and select an inspection to review its scope and result context.",
    view: "board",
    contextLabel: "Template / checkpoint",
    valueLabel: "Required checks",
    totalLabel: "Required sample checks",
    unit: "checks",
    progressLabel: "Results recorded",
    focusStatus: "Review",
    rows: [
      [
        "QC-1101",
        "Film thickness inspection",
        "QCT-001 · MO-0148",
        "Passed",
        4,
        100,
        "All four sample results are recorded. Thickness and width measurements fall inside the defined limits.",
      ],
      [
        "QC-1102",
        "Print registration check",
        "QCT-002 · MO-0146",
        "Review",
        5,
        100,
        "Five results are recorded, with one registration finding requiring review before release.",
      ],
      [
        "QC-1103",
        "Carton final inspection",
        "QCT-003 · MO-0147",
        "In progress",
        3,
        67,
        "Two of three required results are recorded. The final strength reading remains pending.",
      ],
      [
        "QC-1104",
        "Seal integrity check",
        "QCT-004 · MO-0148",
        "Pending",
        4,
        0,
        "The final sealing checkpoint is waiting for its operation output in this sample.",
      ],
    ],
    workflow: [
      [
        "Select the standard",
        "Choose the inspection template and production reference.",
      ],
      ["Record the results", "Capture each required value at the checkpoint."],
      [
        "Review exceptions",
        "Compare findings with numeric ranges and acceptance criteria.",
      ],
      [
        "Complete the check",
        "Retain the inspection result with its production context.",
      ],
    ],
    capabilities: [
      [
        "Reusable inspection standards",
        "Keep parameters and limits consistent across checks.",
        "qc-templates",
      ],
      [
        "Quality inside execution",
        "Place inspection work alongside production operations.",
        "shop-floor",
      ],
      [
        "A lot behind the finding",
        "Follow the batch context of the inspected quantity.",
        "batches-lots",
      ],
    ],
  },
  "scrap-waste": {
    title: "Scrap / Waste",
    category: "Production execution",
    icon: "scrap",
    hero: ["See the loss.", "Understand the cause."],
    description:
      "Keep scrap, recoverable offcuts and process waste visible in production. Connect each recorded quantity to its source operation and disposition context.",
    flow: ["Production loss", "Reason & quantity", "Recovery or disposal"],
    callout: "Small losses deserve a clear record.",
    note: "Separate recoverable material from disposal waste. Their quantities and treatment tell different stories.",
    workspaceTitle: "Turn production loss into a useful conversation.",
    workspaceDescription:
      "Review sample loss records by reason and disposition. Select a record to inspect what happened and what can be recovered.",
    view: "table",
    contextLabel: "Operation / reason",
    valueLabel: "Recorded loss",
    totalLabel: "Recorded sample loss",
    unit: "kg",
    progressLabel: "Recoverable share",
    focusStatus: "Recoverable",
    rows: [
      [
        "SCR-001",
        "Film edge trim",
        "Extrusion · Edge trimming",
        "Recoverable",
        28,
        90,
        "Most of this clean trim is identified as recoverable in the sample record; keep the recovery decision separate from the loss entry.",
      ],
      [
        "SCR-002",
        "Print setup waste",
        "Printing · Color setup",
        "Review",
        12,
        25,
        "The setup waste requires a disposition review because ink contamination affects recovery options.",
      ],
      [
        "SCR-003",
        "Carton offcuts",
        "Cutting · Die layout",
        "Recoverable",
        35,
        100,
        "Clean paper offcuts are recorded against the source operation and designated for recovery.",
      ],
      [
        "SCR-004",
        "Damaged seals",
        "Sealing · Temperature variance",
        "Disposal",
        8,
        0,
        "The damaged output is not designated recoverable in this example. Review the temperature finding with quality.",
      ],
    ],
    workflow: [
      [
        "Identify the source",
        "Connect the loss to an order and production operation.",
      ],
      [
        "Measure the quantity",
        "Record the material, quantity and loss reason.",
      ],
      [
        "Review disposition",
        "Distinguish recovery, review and disposal quantities.",
      ],
      [
        "Understand the impact",
        "Use the record when reviewing yield and actual production cost.",
      ],
    ],
    capabilities: [
      [
        "Expected yield in the recipe",
        "Compare production losses with the BOM's output assumptions.",
        "bill-of-materials",
      ],
      [
        "Findings behind the loss",
        "Keep quality exceptions in the investigation context.",
        "quality-control",
      ],
      [
        "Loss has a cost",
        "Review the effect of process loss on actual production cost.",
        "production-costing",
      ],
    ],
  },
  subcontracting: {
    title: "Subcontracting",
    category: "External production",
    icon: "vendor",
    hero: ["Outside processing.", "Inside your production view."],
    description:
      "Keep externally performed operations connected to the same production flow. Follow the processing scope, sent quantities and expected returns with a clear vendor reference.",
    flow: ["External operation", "Vendor processing", "Returned output"],
    callout: "The operation leaves. The context stays.",
    note: "Reconcile sent quantities with returned output, accepted loss and outstanding work.",
    workspaceTitle: "A clear view of the work beyond your floor.",
    workspaceDescription:
      "Inspect illustrative external-processing jobs and their return progress. Vendor names below are sample resource labels.",
    view: "board",
    contextLabel: "External resource / operation",
    valueLabel: "Sent quantity",
    totalLabel: "Sample quantity sent",
    unit: "units",
    progressLabel: "Returned quantity",
    focusStatus: "With vendor",
    rows: [
      [
        "SUB-001",
        "Laminated carton finish",
        "Vendor resource A · Lamination",
        "With vendor",
        1500,
        60,
        "Nine hundred of 1,500 sent units are returned in this sample. Review the outstanding 600 before closing the job.",
      ],
      [
        "SUB-002",
        "Specialty print pass",
        "Vendor resource B · Foil print",
        "Ready to send",
        2000,
        0,
        "The processing scope is prepared. The sample job has not yet recorded a returned quantity.",
      ],
      [
        "SUB-003",
        "Custom die cutting",
        "Vendor resource C · Die cut",
        "Returned",
        800,
        100,
        "The full sent quantity is returned and remains linked to its external processing reference.",
      ],
      [
        "SUB-004",
        "Coated tag finish",
        "Vendor resource A · Coating",
        "Review",
        1200,
        80,
        "The returned quantity is partial. Review quality and the remaining units before completion.",
      ],
    ],
    workflow: [
      [
        "Define external work",
        "Identify the routing operation performed by a vendor resource.",
      ],
      [
        "Prepare the handoff",
        "Review the processing scope and quantities to send.",
      ],
      [
        "Follow the return",
        "Track returned output and remaining external work.",
      ],
      [
        "Reconcile the job",
        "Review quality, losses and processing cost before closure.",
      ],
    ],
    capabilities: [
      [
        "A vendor step in the route",
        "Keep external operations inside the production sequence.",
        "routings",
      ],
      [
        "The originating order",
        "Follow the production requirement behind outside processing.",
        "production-orders",
      ],
      [
        "External processing cost",
        "Keep outside-operation cost in the order cost conversation.",
        "production-costing",
      ],
    ],
  },
  "standard-costing": {
    title: "Standard Costing",
    category: "Manufacturing cost control",
    icon: "standard",
    hero: ["Know the expected cost.", "Before production starts."],
    description:
      "Bring BOM materials, routing time and work-center rates into a standard production cost. Keep a dated baseline for comparing what the order actually costs.",
    flow: ["BOM & resource rates", "Cost rollup", "Frozen cost baseline"],
    callout: "Build the baseline from the same recipe.",
    note: "Freeze the assumptions with the version. A useful variance needs a stable standard to compare against.",
    workspaceTitle: "An expected cost you can explain.",
    workspaceDescription:
      "Explore the component breakdown of an illustrative 1,000-unit cost card. Values are sample BDT amounts.",
    view: "cost",
    contextLabel: "Cost basis",
    valueLabel: "Standard amount",
    totalLabel: "Sample standard batch cost",
    unit: "BDT",
    progressLabel: "Basis reviewed",
    focusStatus: "Reviewed",
    rows: [
      [
        "STD-MAT",
        "Direct materials",
        "BOM-PB-01 · 1,000-unit batch",
        "Reviewed",
        18500,
        100,
        "The material component uses the sample BOM quantity basis and its reference material rates.",
      ],
      [
        "STD-LAB",
        "Direct labor",
        "RT-PB-01 · Operation time",
        "Reviewed",
        2400,
        100,
        "Labor cost follows the routing time and the sample work-center labor rate.",
      ],
      [
        "STD-MCH",
        "Machine cost",
        "WC-EXT-01 · Machine rate",
        "Reviewed",
        1600,
        100,
        "Machine time and the reference machine rate form the sample machine component.",
      ],
      [
        "STD-OVH",
        "Production overhead",
        "Work-center overhead basis",
        "Review",
        2500,
        75,
        "The overhead assumption remains under review before the sample cost card is frozen.",
      ],
    ],
    workflow: [
      [
        "Review the basis",
        "Confirm the BOM, routing and work-center rate assumptions.",
      ],
      [
        "Roll up components",
        "Combine material, labor, machine and overhead cost.",
      ],
      [
        "Review output shares",
        "Check allocation assumptions for joint production outputs.",
      ],
      [
        "Freeze the version",
        "Retain a dated standard for later actual-cost comparison.",
      ],
    ],
    capabilities: [
      [
        "Materials from the recipe",
        "Keep standard input quantities tied to the production BOM.",
        "bill-of-materials",
      ],
      [
        "Rates from the resource",
        "Use the work-center assumptions behind operation cost.",
        "work-centers",
      ],
      [
        "A baseline for actuals",
        "Compare completed production against the frozen standard.",
        "production-costing",
      ],
    ],
  },
  "production-costing": {
    title: "Production Costing",
    category: "Manufacturing cost control",
    icon: "cost",
    hero: ["Follow the actual cost.", "Explain the difference."],
    description:
      "Bring recorded material, operation and processing costs into an order-level view. Review the actual production cost alongside the standard assumptions behind the plan.",
    flow: ["Recorded production", "Actual order cost", "Variance review"],
    callout: "Every variance starts with a question.",
    note: "Compare like with like: the same product, output basis and cost scope.",
    workspaceTitle: "The cost behind a completed production job.",
    workspaceDescription:
      "Inspect a sample 1,000-unit order cost breakdown. Standard references in each component explain the example variance.",
    view: "cost",
    contextLabel: "Standard reference",
    valueLabel: "Actual amount",
    totalLabel: "Sample actual batch cost",
    unit: "BDT",
    progressLabel: "Cost record completeness",
    focusStatus: "Posted",
    rows: [
      [
        "ACT-MAT",
        "Direct materials",
        "Standard BDT 18,500 · +BDT 700",
        "Posted",
        19200,
        100,
        "Actual material cost is BDT 19,200 against a BDT 18,500 standard. Review consumption and rate differences.",
      ],
      [
        "ACT-LAB",
        "Direct labor",
        "Standard BDT 2,400 · +BDT 200",
        "Posted",
        2600,
        100,
        "Recorded labor cost is BDT 200 above the sample standard. Review the operation time basis.",
      ],
      [
        "ACT-MCH",
        "Machine cost",
        "Standard BDT 1,600 · −BDT 100",
        "Posted",
        1500,
        100,
        "The actual machine component is BDT 100 below its reference standard in this example.",
      ],
      [
        "ACT-OVH",
        "Production overhead",
        "Standard BDT 2,500 · +BDT 200",
        "Review",
        2700,
        80,
        "The overhead component is under review. The example batch totals BDT 26,000 against a BDT 25,000 standard.",
      ],
    ],
    workflow: [
      [
        "Gather actual records",
        "Review material, operation and outside-processing cost context.",
      ],
      [
        "Build the order cost",
        "Group the actual components against the output basis.",
      ],
      [
        "Compare the standard",
        "Use the matching cost version and production quantity.",
      ],
      [
        "Explain the variance",
        "Review the reasons before completing the cost discussion.",
      ],
    ],
    capabilities: [
      [
        "A stable comparison point",
        "Use a dated standard cost card for the variance review.",
        "standard-costing",
      ],
      [
        "Output behind the cost",
        "Keep cost analysis connected to the production order.",
        "production-orders",
      ],
      [
        "Loss behind the difference",
        "Review scrap and yield when explaining actual production cost.",
        "scrap-waste",
      ],
    ],
  },
};
