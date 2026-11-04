export type MegaMenuLink = {
  groupKey?: string;
  labelKey: string;
  href: string;
};

export type MegaMenuColumn = {
  titleKey: string;
  accentClass: string;
  underlineClass: string;
  links: MegaMenuLink[];
};

export const appsMegaMenu: MegaMenuColumn[] = [
  {
    titleKey: "modules.accounting.title",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      {
        labelKey: "modules.accounting.links.accountingHub",
        href: "/apps/accounting/accounting-hub",
      },
      {
        labelKey: "modules.accounting.links.chartOfAccounts",
        href: "/apps/accounting/chart-of-accounts",
      },
      {
        labelKey: "modules.accounting.links.journalEntries",
        href: "/apps/accounting/journal-entries",
      },
      {
        labelKey: "modules.accounting.links.ledgers",
        href: "/apps/accounting/ledgers",
      },
      {
        labelKey: "modules.accounting.links.invoicesAr",
        href: "/apps/accounting/invoices-ar",
      },
      {
        labelKey: "modules.accounting.links.billsAp",
        href: "/apps/accounting/bills-ap",
      },
      {
        labelKey: "modules.accounting.links.purchaseOrders",
        href: "/apps/accounting/purchase-orders",
      },
      {
        labelKey: "modules.accounting.links.itemsProducts",
        href: "/apps/accounting/items-products",
      },
      {
        labelKey: "modules.accounting.links.customers",
        href: "/apps/accounting/customers",
      },
      {
        labelKey: "modules.accounting.links.vendors",
        href: "/apps/accounting/vendors",
      },
      {
        labelKey: "modules.accounting.links.bankAccounts",
        href: "/apps/accounting/bank-accounts",
      },
      {
        labelKey: "modules.accounting.links.receipts",
        href: "/apps/accounting/receipts",
      },
      {
        labelKey: "modules.accounting.links.deliveryChallans",
        href: "/apps/accounting/delivery-challans",
      },
      {
        labelKey: "modules.accounting.links.pettyCash",
        href: "/apps/accounting/petty-cash",
      },
      {
        labelKey: "modules.accounting.links.chequeRegister",
        href: "/apps/accounting/cheque-register",
      },
      {
        labelKey: "modules.accounting.links.closingFy",
        href: "/apps/accounting/closing-fy",
      },
      {
        labelKey: "modules.accounting.links.financialReports",
        href: "/apps/accounting/financial-reports",
      },
      {
        labelKey: "modules.accounting.links.vatRegister",
        href: "/apps/accounting/vat-register",
      },
      {
        labelKey: "modules.accounting.links.discountsCoupons",
        href: "/apps/accounting/discounts-coupons",
      },
      {
        labelKey: "modules.accounting.links.loanManagement",
        href: "/apps/accounting/loan-management",
      },
      {
        labelKey: "modules.accounting.links.fixedAssetRegister",
        href: "/apps/accounting/fixed-asset-register",
      },
      {
        labelKey: "modules.accounting.links.exchangeRates",
        href: "/apps/accounting/exchange-rates",
      },
      {
        labelKey: "modules.accounting.links.arApAging",
        href: "/apps/accounting/ar-ap-aging",
      },
      {
        labelKey: "modules.accounting.links.bankReconciliation",
        href: "/apps/accounting/bank-reconciliation",
      },
    ],
  },
  {
    titleKey: "modules.projectAccounting.title",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "modules.projectAccounting.links.overview",
        href: "/apps/project-accounting/projects",
      },
      {
        labelKey: "modules.projectAccounting.links.costCodes",
        href: "/apps/project-accounting/cost-codes",
      },
      {
        labelKey: "modules.projectAccounting.links.budgets",
        href: "/apps/project-accounting/budgets",
      },
      {
        labelKey: "modules.projectAccounting.links.jobCost",
        href: "/apps/project-accounting/job-cost",
      },
      {
        labelKey: "modules.projectAccounting.links.changeOrders",
        href: "/apps/project-accounting/change-orders",
      },
      {
        labelKey: "modules.projectAccounting.links.wip",
        href: "/apps/project-accounting/wip",
      },
      {
        labelKey: "modules.projectAccounting.links.progressBilling",
        href: "/apps/project-accounting/progress-billing",
      },
      {
        labelKey: "modules.projectAccounting.links.schedule",
        href: "/apps/project-accounting/schedule",
      },
      {
        labelKey: "modules.projectAccounting.links.risksIssues",
        href: "/apps/project-accounting/risks-issues",
      },
      {
        labelKey: "modules.projectAccounting.links.documents",
        href: "/apps/project-accounting/documents",
      },
      {
        labelKey: "modules.projectAccounting.links.milestones",
        href: "/apps/project-accounting/milestones",
      },
      {
        labelKey: "modules.projectAccounting.links.boq",
        href: "/apps/project-accounting/boq",
      },
      {
        labelKey: "modules.projectAccounting.links.billAllocations",
        href: "/apps/project-accounting/bill-allocations",
      },
      {
        labelKey: "modules.projectAccounting.links.pAndL",
        href: "/apps/project-accounting/p-and-l",
      },
    ],
  },
  {
    titleKey: "modules.budgetManagement.title",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      {
        labelKey: "modules.budgetManagement.links.overview",
        href: "/apps/Finance/budget-management",
      },
      {
        labelKey: "modules.budgetManagement.links.lines",
        href: "/apps/budget-management/lines",
      },
      {
        labelKey: "modules.budgetManagement.links.requisitions",
        href: "/apps/budget-management/requisitions",
      },
      {
        labelKey: "modules.budgetManagement.links.variance",
        href: "/apps/budget-management/variance",
      },
      {
        labelKey: "modules.budgetManagement.links.approvals",
        href: "/apps/budget-management/approvals",
      },
      {
        labelKey: "modules.budgetManagement.links.rbrf",
        href: "/apps/budget-management/rbrf",
      },
    ],
  },
  {
    titleKey: "modules.supplyChain.title",
    accentClass: "text-amber-500",
    underlineClass: "bg-amber-200",
    links: [
      {
        labelKey: "modules.supplyChain.links.overview",
        href: "/apps/supply-chain/overview",
      },
      {
        labelKey: "modules.supplyChain.links.goodsReceipts",
        href: "/apps/supply-chain/goods-receipts",
      },
      {
        labelKey: "modules.supplyChain.links.landedCost",
        href: "/apps/supply-chain/landed-cost",
      },
      {
        labelKey: "modules.supplyChain.links.procurement",
        href: "/apps/supply-chain/procurement",
      },
      {
        labelKey: "modules.supplyChain.links.purchaseRequisitions",
        href: "/apps/supply-chain/procurement/purchase-requisitions",
      },
      {
        labelKey: "modules.supplyChain.links.comparativeStatements",
        href: "/apps/supply-chain/procurement/comparative-statements",
      },
      {
        labelKey: "modules.supplyChain.links.tenderManagement",
        href: "/apps/supply-chain/tender-management",
      },
    ],
  },
  {
    titleKey: "modules.inventory.title",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      {
        labelKey: "modules.inventory.links.demandForecast",
        href: "/apps/inventory/demand-forecast",
      },
      {
        labelKey: "modules.inventory.links.warehouses",
        href: "/apps/inventory/warehouses",
      },
      {
        labelKey: "modules.inventory.links.stockMovements",
        href: "/apps/inventory/stock-movements",
      },
      {
        labelKey: "modules.inventory.links.inventorySummary",
        href: "/apps/inventory/inventory-summary",
      },
      {
        labelKey: "modules.inventory.links.gatePasses",
        href: "/apps/inventory/gate-passes",
      },
      {
        labelKey: "modules.inventory.links.weighbridgeScales",
        href: "/apps/inventory/weighbridge-scales",
      },
    ],
  },
  {
    titleKey: "modules.openPlatform.title",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      {
        labelKey: "modules.openPlatform.links.taxRates",
        href: "/apps/open-platform/tax-rates",
      },
      {
        labelKey: "modules.openPlatform.links.migrationStudio",
        href: "/apps/open-platform/migration-studio",
      },
      {
        labelKey: "modules.openPlatform.links.exportTakeout",
        href: "/apps/open-platform/export-takeout",
      },
    ],
  },
  {
    titleKey: "modules.manufacturing.title",
    accentClass: "text-teal-600",
    underlineClass: "bg-teal-200",
    links: [
      {
        labelKey: "modules.manufacturing.links.workCenters",
        href: "/apps/manufacturing/work-centers",
      },
      {
        labelKey: "modules.manufacturing.links.routings",
        href: "/apps/manufacturing/routings",
      },
      {
        labelKey: "modules.manufacturing.links.billOfMaterials",
        href: "/apps/manufacturing/bill-of-materials",
      },
      {
        labelKey: "modules.manufacturing.links.mrpPlanning",
        href: "/apps/manufacturing/mrp-planning",
      },
      {
        labelKey: "modules.manufacturing.links.capacityPlanning",
        href: "/apps/manufacturing/capacity-planning",
      },
      {
        labelKey: "modules.manufacturing.links.masterScheduleMps",
        href: "/apps/manufacturing/master-schedule-mps",
      },
      {
        labelKey: "modules.manufacturing.links.schedulingAps",
        href: "/apps/manufacturing/scheduling-aps",
      },
      {
        labelKey: "modules.manufacturing.links.linePlanningBoard",
        href: "/apps/manufacturing/line-planning-board",
      },
      {
        labelKey: "modules.manufacturing.links.orderAllocation",
        href: "/apps/manufacturing/order-allocation",
      },
      {
        labelKey: "modules.manufacturing.links.shopFloor",
        href: "/apps/manufacturing/shop-floor",
      },
      {
        labelKey: "modules.manufacturing.links.productionOrders",
        href: "/apps/manufacturing/production-orders",
      },
      {
        labelKey: "modules.manufacturing.links.batchesLots",
        href: "/apps/manufacturing/batches-lots",
      },
      {
        labelKey: "modules.manufacturing.links.serialNumbers",
        href: "/apps/manufacturing/serial-numbers",
      },
      {
        labelKey: "modules.manufacturing.links.qcTemplates",
        href: "/apps/manufacturing/qc-templates",
      },
      {
        labelKey: "modules.manufacturing.links.qualityControl",
        href: "/apps/manufacturing/quality-control",
      },
      {
        labelKey: "modules.manufacturing.links.scrapWaste",
        href: "/apps/manufacturing/scrap-waste",
      },
      {
        labelKey: "modules.manufacturing.links.subcontracting",
        href: "/apps/manufacturing/subcontracting",
      },
      {
        labelKey: "modules.manufacturing.links.standardCosting",
        href: "/apps/manufacturing/standard-costing",
      },
      {
        labelKey: "modules.manufacturing.links.productionCosting",
        href: "/apps/manufacturing/production-costing",
      },
    ],
  },
  {
    titleKey: "modules.quality.title",
    accentClass: "text-primary",
    underlineClass: "bg-primary/20",
    links: [
      {
        labelKey: "modules.quality.links.qualityDashboard",
        href: "/apps/quality/quality-dashboard",
      },
      {
        labelKey: "modules.quality.links.nonConformance",
        href: "/apps/quality/non-conformance",
      },
      { labelKey: "modules.quality.links.capa", href: "/apps/quality/capa" },
      {
        labelKey: "modules.quality.links.aqlSampling",
        href: "/apps/quality/aql-sampling",
      },
      { labelKey: "modules.quality.links.spc", href: "/apps/quality/spc" },
    ],
  },
  {
    titleKey: "modules.hrPayroll.title",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      {
        labelKey: "modules.hrPayroll.links.departments",
        href: "/apps/human-resources/departments",
      },
      {
        labelKey: "modules.hrPayroll.links.designations",
        href: "/apps/human-resources/designations",
      },
      {
        labelKey: "modules.hrPayroll.links.gradesSteps",
        href: "/apps/human-resources/grades-steps",
      },
      {
        labelKey: "modules.hrPayroll.links.salaryComponents",
        href: "/apps/human-resources/salary-components",
      },
      {
        labelKey: "modules.hrPayroll.links.salaryStructures",
        href: "/apps/human-resources/salary-structures",
      },
      {
        labelKey: "modules.hrPayroll.links.employees",
        href: "/apps/human-resources/employees",
      },
      {
        labelKey: "modules.hrPayroll.links.payrollRuns",
        href: "/apps/human-resources/payroll-runs",
      },
      {
        labelKey: "modules.hrPayroll.links.approvalsInbox",
        href: "/apps/human-resources/approvals-inbox",
      },
      {
        labelKey: "modules.hrPayroll.links.taxBracketsNbr",
        href: "/apps/human-resources/tax-brackets-nbr",
      },
      {
        labelKey: "modules.hrPayroll.links.form108Annual",
        href: "/apps/human-resources/form-108-annual",
      },
      {
        labelKey: "modules.hrPayroll.links.hrPolicyPfGratuity",
        href: "/apps/human-resources/hr-policy-pf-gratuity",
      },
      {
        labelKey: "modules.hrPayroll.links.shifts",
        href: "/apps/human-resources/shifts",
      },
      {
        labelKey: "modules.hrPayroll.links.holidayCalendar",
        href: "/apps/human-resources/holiday-calendar",
      },
      {
        labelKey: "modules.hrPayroll.links.leaveTypes",
        href: "/apps/human-resources/leave-types",
      },
      {
        labelKey: "modules.hrPayroll.links.leaveApplications",
        href: "/apps/human-resources/leave-applications",
      },
      {
        labelKey: "modules.hrPayroll.links.attendance",
        href: "/apps/human-resources/attendance",
      },
      {
        labelKey: "modules.hrPayroll.links.projects",
        href: "/apps/human-resources/projects",
      },
      {
        labelKey: "modules.hrPayroll.links.finalSettlements",
        href: "/apps/human-resources/final-settlements",
      },
      {
        labelKey: "modules.hrPayroll.links.serviceRecords",
        href: "/apps/human-resources/service-records",
      },
      {
        labelKey: "modules.hrPayroll.links.recruitment",
        href: "/apps/human-resources/recruitment",
      },
      {
        labelKey: "modules.hrPayroll.links.appraisals",
        href: "/apps/human-resources/appraisals",
      },
      {
        labelKey: "modules.hrPayroll.links.wppfWelfare",
        href: "/apps/human-resources/wppf-welfare",
      },
      {
        labelKey: "modules.hrPayroll.links.salaryBudgets",
        href: "/apps/human-resources/salary-budgets",
      },
      {
        labelKey: "modules.hrPayroll.links.hrReports",
        href: "/apps/human-resources/hr-reports",
      },
    ],
  },
  {
    titleKey: "modules.employeePortal.title",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "modules.employeePortal.links.myProfile",
        href: "/apps/employee-portal/my-profile",
      },
      {
        labelKey: "modules.employeePortal.links.myPayslips",
        href: "/apps/employee-portal/my-payslips",
      },
      {
        labelKey: "modules.employeePortal.links.myLeaves",
        href: "/apps/employee-portal/my-leaves",
      },
      {
        labelKey: "modules.employeePortal.links.myAttendance",
        href: "/apps/employee-portal/my-attendance",
      },
      {
        labelKey: "modules.employeePortal.links.myPfGratuity",
        href: "/apps/employee-portal/my-pf-gratuity",
      },
    ],
  },
  {
    titleKey: "modules.engineeringMaintenance.title",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      {
        labelKey: "modules.engineeringMaintenance.links.engineeringMaintenance",
        href: "/apps/engineering-maintenance",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.equipment",
        href: "/apps/engineering-maintenance/equipment",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.pmSchedules",
        href: "/apps/engineering-maintenance/pm-schedules",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.workOrders",
        href: "/apps/engineering-maintenance/work-orders",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.spareParts",
        href: "/apps/engineering-maintenance/spare-parts",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.downtime",
        href: "/apps/engineering-maintenance/downtime",
      },
      {
        labelKey: "modules.engineeringMaintenance.links.calibration",
        href: "/apps/engineering-maintenance/calibration",
      },
    ],
  },
  {
    titleKey: "modules.medicalCentre.title",
    accentClass: "text-amber-500",
    underlineClass: "bg-amber-200",
    links: [
      {
        labelKey: "modules.medicalCentre.links.medicalCentre",
        href: "/apps/medical-centre/medical-centre",
      },
      {
        labelKey: "modules.medicalCentre.links.clinicVisits",
        href: "/apps/medical-centre/clinic-visits",
      },
      {
        labelKey: "modules.medicalCentre.links.pharmacy",
        href: "/apps/medical-centre/pharmacy",
      },
      {
        labelKey: "modules.medicalCentre.links.healthCheckups",
        href: "/apps/medical-centre/health-checkups",
      },
    ],
  },
  {
    titleKey: "modules.tradeFinance.title",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      {
        labelKey: "modules.tradeFinance.links.salesContracts",
        href: "/apps/trade-finance/sales-contracts",
      },
      {
        labelKey: "modules.tradeFinance.links.lettersOfCredit",
        href: "/apps/trade-finance/letters-of-credit",
      },
      {
        labelKey: "modules.tradeFinance.links.ttRemittances",
        href: "/apps/trade-finance/tt-remittances",
      },
      {
        labelKey: "modules.tradeFinance.links.exportShipments",
        href: "/apps/trade-finance/export-shipments",
      },
      {
        labelKey: "modules.tradeFinance.links.bdExportPapers",
        href: "/apps/trade-finance/bd-export-papers",
      },
    ],
  },
  {
    titleKey: "modules.salesCrm.title",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      { labelKey: "modules.salesCrm.links.crm", href: "/apps/sales/crm" },
      {
        groupKey: "modules.salesCrm.groups.pipeline",
        labelKey: "modules.salesCrm.links.pipeline",
        href: "/apps/sales/crm/pipeline/pipeline",
      },
      {
        labelKey: "modules.salesCrm.links.leads",
        href: "/apps/sales/crm/pipeline/leads",
      },
      {
        labelKey: "modules.salesCrm.links.contacts",
        href: "/apps/sales/crm/pipeline/contacts",
      },
      {
        labelKey: "modules.salesCrm.links.deals",
        href: "/apps/sales/crm/pipeline/deals",
      },
      {
        groupKey: "modules.salesCrm.groups.activities",
        labelKey: "modules.salesCrm.links.tasks",
        href: "/apps/sales/crm/activities/tasks",
      },
      {
        labelKey: "modules.salesCrm.links.visitLog",
        href: "/apps/sales/crm/activities/visit-log",
      },
      {
        groupKey: "modules.salesCrm.groups.orders",
        labelKey: "modules.salesCrm.links.quotes",
        href: "/apps/sales/crm/orders/quotes",
      },
      {
        labelKey: "modules.salesCrm.links.salesOrders",
        href: "/apps/sales/crm/orders/sales-orders",
      },
      {
        labelKey: "modules.salesCrm.links.returns",
        href: "/apps/sales/crm/orders/returns",
      },
      {
        labelKey: "modules.salesCrm.links.customer360",
        href: "/apps/sales/crm/orders/customer-360",
      },
      {
        groupKey: "modules.salesCrm.groups.accounts",
        labelKey: "modules.salesCrm.links.accountPlans",
        href: "/apps/sales/crm/accounts/account-plans",
      },
      {
        labelKey: "modules.salesCrm.links.objections",
        href: "/apps/sales/crm/accounts/objections",
      },
      {
        labelKey: "modules.salesCrm.links.playbook",
        href: "/apps/sales/crm/accounts/playbook",
      },
      {
        groupKey: "modules.salesCrm.groups.distribution",
        labelKey: "modules.salesCrm.links.pricing",
        href: "/apps/sales/crm/distribution/pricing",
      },
      {
        labelKey: "modules.salesCrm.links.schemes",
        href: "/apps/sales/crm/distribution/schemes",
      },
      {
        labelKey: "modules.salesCrm.links.dealers",
        href: "/apps/sales/crm/distribution/dealers",
      },
      {
        labelKey: "modules.salesCrm.links.field",
        href: "/apps/sales/crm/distribution/field",
      },
      {
        labelKey: "modules.salesCrm.links.orgAccess",
        href: "/apps/sales/crm/distribution/org-access",
      },
      {
        labelKey: "modules.salesCrm.links.dispatch",
        href: "/apps/sales/crm/distribution/dispatch",
      },
      {
        groupKey: "modules.salesCrm.groups.finance",
        labelKey: "modules.salesCrm.links.commissions",
        href: "/apps/sales/crm/finance/commissions",
      },
      {
        labelKey: "modules.salesCrm.links.credit",
        href: "/apps/sales/crm/finance/credit",
      },
      {
        labelKey: "modules.salesCrm.links.collections",
        href: "/apps/sales/crm/finance/collections",
      },
      {
        groupKey: "modules.salesCrm.groups.engageAi",
        labelKey: "modules.salesCrm.links.capture",
        href: "/apps/sales/crm/engage-ai/capture",
      },
      {
        labelKey: "modules.salesCrm.links.sequences",
        href: "/apps/sales/crm/engage-ai/sequences",
      },
      {
        labelKey: "modules.salesCrm.links.askAi",
        href: "/apps/sales/crm/engage-ai/ask-ai",
      },
      {
        groupKey: "modules.salesCrm.groups.dms",
        labelKey: "modules.salesCrm.links.secondarySales",
        href: "/apps/sales/crm/dms/secondary-sales",
      },
      {
        labelKey: "modules.salesCrm.links.distributorStock",
        href: "/apps/sales/crm/dms/distributor-stock",
      },
      {
        labelKey: "modules.salesCrm.links.marketReturns",
        href: "/apps/sales/crm/dms/market-returns",
      },
      {
        labelKey: "modules.salesCrm.links.sellThrough",
        href: "/apps/sales/crm/dms/sell-through",
      },
      {
        labelKey: "modules.salesCrm.links.secondaryTargets",
        href: "/apps/sales/crm/dms/secondary-targets",
      },
      {
        groupKey: "modules.salesCrm.groups.tradePromo",
        labelKey: "modules.salesCrm.links.promotions",
        href: "/apps/sales/crm/trade-promo/promotions",
      },
      {
        labelKey: "modules.salesCrm.links.claims",
        href: "/apps/sales/crm/trade-promo/claims",
      },
      {
        labelKey: "modules.salesCrm.links.rebates",
        href: "/apps/sales/crm/trade-promo/rebates",
      },
      {
        groupKey: "modules.salesCrm.groups.vanSales",
        labelKey: "modules.salesCrm.links.vans",
        href: "/apps/sales/crm/van-sales/vans",
      },
      {
        labelKey: "modules.salesCrm.links.trips",
        href: "/apps/sales/crm/van-sales/trips",
      },
      {
        labelKey: "modules.salesCrm.links.vanSales",
        href: "/apps/sales/crm/van-sales/van-sales",
      },
      {
        labelKey: "modules.salesCrm.links.vanStock",
        href: "/apps/sales/crm/van-sales/van-stock",
      },
      {
        groupKey: "modules.salesCrm.groups.insights",
        labelKey: "modules.salesCrm.links.dashboard",
        href: "/apps/sales/crm/insights/dashboard",
      },
      {
        labelKey: "modules.salesCrm.links.targets",
        href: "/apps/sales/crm/insights/targets",
      },
      {
        labelKey: "modules.salesCrm.links.forecast",
        href: "/apps/sales/crm/insights/forecast",
      },
      {
        labelKey: "modules.salesCrm.links.relationships",
        href: "/apps/sales/crm/insights/relationships",
      },
      {
        labelKey: "modules.salesCrm.links.amScorecard",
        href: "/apps/sales/crm/insights/am-scorecard",
      },
    ],
  },
  {
    titleKey: "modules.transportPool.title",
    accentClass: "text-teal-600",
    underlineClass: "bg-teal-200",
    links: [
      {
        labelKey: "modules.transportPool.links.transportPool",
        href: "/apps/transport-pool/transport-pool",
      },
      {
        labelKey: "modules.transportPool.links.vehicles",
        href: "/apps/transport-pool/vehicles",
      },
      {
        labelKey: "modules.transportPool.links.trips",
        href: "/apps/transport-pool/trips",
      },
      {
        labelKey: "modules.transportPool.links.fuelLog",
        href: "/apps/transport-pool/fuel-log",
      },
      {
        labelKey: "modules.transportPool.links.maintenance",
        href: "/apps/transport-pool/maintenance",
      },
    ],
  },
  {
    titleKey: "modules.analytics.title",
    accentClass: "text-primary",
    underlineClass: "bg-primary/20",
    links: [
      {
        labelKey: "modules.analytics.links.biAnalyticsReporting",
        href: "/apps/analytics/bi-analytics-reporting",
      },
      {
        labelKey: "modules.analytics.links.executiveDashboard",
        href: "/apps/analytics/executive-dashboard",
      },
      {
        labelKey: "modules.analytics.links.financialReports",
        href: "/apps/analytics/financial-reports",
      },
      {
        labelKey: "modules.analytics.links.hrPayroll",
        href: "/apps/analytics/hr-payroll",
      },
      {
        labelKey: "modules.analytics.links.demandForecast",
        href: "/apps/analytics/demand-forecast",
      },
      {
        labelKey: "modules.analytics.links.exportTakeout",
        href: "/apps/analytics/export-takeout",
      },
    ],
  },
  {
    titleKey: "modules.realEstate.title",
    accentClass: "text-emerald-600",
    underlineClass: "bg-emerald-200",
    links: [
      {
        labelKey: "modules.realEstate.links.salesDashboard",
        href: "/apps/real-estate/sales-dashboard",
      },
      {
        labelKey: "modules.realEstate.links.properties",
        href: "/apps/real-estate/properties",
      },
      {
        labelKey: "modules.realEstate.links.units",
        href: "/apps/real-estate/units",
      },
      {
        labelKey: "modules.realEstate.links.bookings",
        href: "/apps/real-estate/bookings",
      },
      {
        labelKey: "modules.realEstate.links.collections",
        href: "/apps/real-estate/collections",
      },
      {
        labelKey: "modules.realEstate.links.handover",
        href: "/apps/real-estate/handover",
      },
      {
        labelKey: "modules.realEstate.links.revenueRecognition",
        href: "/apps/real-estate/revenue-recognition",
      },
      {
        labelKey: "modules.realEstate.links.leases",
        href: "/apps/real-estate/leases",
      },
      {
        labelKey: "modules.realEstate.links.brokers",
        href: "/apps/real-estate/brokers",
      },
      {
        labelKey: "modules.realEstate.links.buyerPortal",
        href: "/apps/real-estate/buyer-portal",
      },
    ],
  },
  {
    titleKey: "modules.education.title",
    accentClass: "text-sky-600",
    underlineClass: "bg-sky-200",
    links: [
      {
        labelKey: "modules.education.links.educationDashboard",
        href: "/apps/education/education-dashboard",
      },
      {
        labelKey: "modules.education.links.admissions",
        href: "/apps/education/admissions",
      },
      {
        labelKey: "modules.education.links.students",
        href: "/apps/education/students",
      },
      {
        labelKey: "modules.education.links.academics",
        href: "/apps/education/academics",
      },
      {
        labelKey: "modules.education.links.studentAttendance",
        href: "/apps/education/student-attendance",
      },
      {
        labelKey: "modules.education.links.timetable",
        href: "/apps/education/timetable",
      },
      {
        labelKey: "modules.education.links.examsResults",
        href: "/apps/education/exams-results",
      },
      {
        labelKey: "modules.education.links.promotionCertificates",
        href: "/apps/education/promotion-certificates",
      },
      {
        labelKey: "modules.education.links.hifz",
        href: "/apps/education/hifz",
      },
      {
        labelKey: "modules.education.links.boardingMess",
        href: "/apps/education/boarding-mess",
      },
      {
        labelKey: "modules.education.links.welfareFunds",
        href: "/apps/education/welfare-funds",
      },
      {
        labelKey: "modules.education.links.notices",
        href: "/apps/education/notices",
      },
      {
        labelKey: "modules.education.links.onlinePayments",
        href: "/apps/education/online-payments",
      },
      {
        labelKey: "modules.education.links.library",
        href: "/apps/education/library",
      },
      {
        labelKey: "modules.education.links.schoolBus",
        href: "/apps/education/school-bus",
      },
      {
        labelKey: "modules.education.links.storeIssues",
        href: "/apps/education/store-issues",
      },
      {
        labelKey: "modules.education.links.rooms",
        href: "/apps/education/rooms",
      },
      {
        labelKey: "modules.education.links.fees",
        href: "/apps/education/fees",
      },
      {
        labelKey: "modules.education.links.feeReports",
        href: "/apps/education/fee-reports",
      },
      {
        labelKey: "modules.education.links.institutionSettings",
        href: "/apps/education/institution-settings",
      },
    ],
  },
  {
    titleKey: "modules.pos.title",
    accentClass: "text-indigo-500",
    underlineClass: "bg-indigo-200",
    links: [
      {
        labelKey: "modules.pos.links.registerTill",
        href: "/apps/pos/register-till",
      },
      { labelKey: "modules.pos.links.shifts", href: "/apps/pos/shifts" },
      { labelKey: "modules.pos.links.receipts", href: "/apps/pos/receipts" },
      {
        labelKey: "modules.pos.links.daySummaryZ",
        href: "/apps/pos/day-summary-z",
      },
      {
        labelKey: "modules.pos.links.outletDashboard",
        href: "/apps/pos/outlet-dashboard",
      },
      {
        labelKey: "modules.pos.links.loyaltyVouchers",
        href: "/apps/pos/loyalty-vouchers",
      },
      { labelKey: "modules.pos.links.transfers", href: "/apps/pos/transfers" },
      { labelKey: "modules.pos.links.stockLots", href: "/apps/pos/stock-lots" },
      {
        labelKey: "modules.pos.links.outletStock",
        href: "/apps/pos/outlet-stock",
      },
      {
        labelKey: "modules.pos.links.outletsRegisters",
        href: "/apps/pos/outlets-registers",
      },
    ],
  },
  {
    titleKey: "modules.merchandising.title",
    accentClass: "text-amber-500",
    underlineClass: "bg-amber-200",
    links: [
      {
        labelKey: "modules.merchandising.links.merchandisingDashboard",
        href: "/apps/merchandising/merchandising-dashboard",
      },
      {
        labelKey: "modules.merchandising.links.stylesCosting",
        href: "/apps/merchandising/styles-costing",
      },
      {
        labelKey: "modules.merchandising.links.tnaCalendar",
        href: "/apps/merchandising/tna-calendar",
      },
      {
        labelKey: "modules.merchandising.links.materialBooking",
        href: "/apps/merchandising/material-booking",
      },
      {
        labelKey: "modules.merchandising.links.productionFollowUp",
        href: "/apps/merchandising/production-follow-up",
      },
      {
        labelKey: "modules.merchandising.links.factories",
        href: "/apps/merchandising/factories",
      },
      {
        labelKey: "modules.merchandising.links.inHouseReceipts",
        href: "/apps/merchandising/in-house-receipts",
      },
      {
        labelKey: "modules.merchandising.links.profitability",
        href: "/apps/merchandising/profitability",
      },
      {
        labelKey: "modules.merchandising.links.buyerPortal",
        href: "/apps/merchandising/buyer-portal",
      },
    ],
  },
  {
    titleKey: "modules.fundAccounting.title",
    accentClass: "text-rose-500",
    underlineClass: "bg-rose-200",
    links: [
      {
        labelKey: "modules.fundAccounting.links.fundDashboard",
        href: "/apps/fund-accounting/dashboard",
      },
      {
        labelKey: "modules.fundAccounting.links.grants",
        href: "/apps/fund-accounting/grants",
      },
      {
        labelKey: "modules.fundAccounting.links.donorsFunds",
        href: "/apps/fund-accounting/donors-funds",
      },
      {
        labelKey: "modules.fundAccounting.links.fundReports",
        href: "/apps/fund-accounting/reports",
      },
      {
        labelKey: "modules.fundAccounting.links.beneficiariesME",
        href: "/apps/fund-accounting/beneficiaries-me",
      },
      {
        labelKey: "modules.fundAccounting.links.costAllocation",
        href: "/apps/fund-accounting/cost-allocation",
      },
    ],
  },
  {
    titleKey: "modules.university.title",
    accentClass: "text-violet-600",
    underlineClass: "bg-violet-200",
    links: [
      {
        labelKey: "modules.university.links.universityDashboard",
        href: "/apps/university/university-dashboard",
      },
      {
        labelKey: "modules.university.links.universityAdmissions",
        href: "/apps/university/university-admissions",
      },
      {
        labelKey: "modules.university.links.universityStudents",
        href: "/apps/university/university-students",
      },
      {
        labelKey: "modules.university.links.facultiesProgrammes",
        href: "/apps/university/faculties-programmes",
      },
      {
        labelKey: "modules.university.links.coursesCurriculum",
        href: "/apps/university/courses-curriculum",
      },
      {
        labelKey: "modules.university.links.classSchedule",
        href: "/apps/university/class-schedule",
      },
      {
        labelKey: "modules.university.links.registration",
        href: "/apps/university/registration",
      },
      {
        labelKey: "modules.university.links.studentAccounts",
        href: "/apps/university/student-accounts",
      },
      {
        labelKey: "modules.university.links.terms",
        href: "/apps/university/terms",
      },
      {
        labelKey: "modules.university.links.gradesResults",
        href: "/apps/university/grades-results",
      },
      {
        labelKey: "modules.university.links.examsAttendance",
        href: "/apps/university/exams-attendance",
      },
      {
        labelKey: "modules.university.links.outcomesObe",
        href: "/apps/university/outcomes-obe",
      },
      {
        labelKey: "modules.university.links.facultyWorkload",
        href: "/apps/university/faculty-workload",
      },
      {
        labelKey: "modules.university.links.campusServices",
        href: "/apps/university/campus-services",
      },
      {
        labelKey: "modules.university.links.graduation",
        href: "/apps/university/graduation",
      },
      {
        labelKey: "modules.university.links.universitySettings",
        href: "/apps/university/university-settings",
      },
    ],
  },
];
