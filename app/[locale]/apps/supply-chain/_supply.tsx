import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useCommon, type ToolKey } from "../accounting/_shared";
import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Tone,
} from "../accounting/_template";
import { AppShell, designFor } from "../accounting/_designs";

/*
 * Shared pieces for the Supply Chain showcase pages. Every preview has a
 * purchasing document-flow strip across the top (requisition, comparison,
 * tender, receipt, landed cost) with the current step highlighted, then the
 * content of one step. Copy lives under pages.accountingShowcase.<section>.
 * ALL DATA ON THESE PAGES IS DUMMY.
 */

export const SC_COMPANY = "Nodi Polymer Industries";

const flowSteps: ToolKey[] = ["scRequisitions", "scComparative", "scTender", "scGoodsReceipts", "scLandedCost"];

export function supplyMetadata(section: string, path: string): Promise<Metadata> {
  return accountingPageMetadata(section, path);
}

export function Field({ label, value, select = false, area = false }: { label: string; value?: string; select?: boolean; area?: boolean }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div className={`mt-0.5 flex items-center justify-between rounded-md border border-border bg-[var(--gray-bg)] px-2.5 text-[11px] text-muted-foreground ${area ? "h-9 py-1.5" : "py-1.5"}`}>
        <span>{value ?? ""}</span>
        {select && <span className="text-[9px]">▾</span>}
      </div>
    </div>
  );
}

function SupplyShell({ path, active, title, children }: { path: string; active: ToolKey; title: string; children: ReactNode }) {
  const { t: common, tools } = useCommon();
  const design = designFor(path);
  if (design.shell !== 0) {
    return (
      <AppShell
        variant={design.shell}
        accent={design.accent}
        moduleName={common("scModule")}
        title={title}
        nav={[
          { key: "scOverview", label: common("tabOverview") },
          ...flowSteps.map((key, i) => ({ key, label: `${i + 1}. ${tools[key]}` })),
        ]}
        active={active}
      >
        {children}
      </AppShell>
    );
  }
  return (
    <div>
      <p className="text-[10.5px] text-muted-foreground">
        {common("scModule")} / <span className="text-foreground">{active === "scOverview" ? common("tabOverview") : tools[active]}</span>
      </p>
      <p className="mt-1 text-[16px] font-semibold text-foreground sm:text-[18px]">{title}</p>

      <ol className="mt-3 grid grid-cols-5 gap-1 text-[10px]" aria-hidden="true">
        {flowSteps.map((key, i) => {
          const on = key === active;
          return (
            <li
              key={key}
              className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${
                on ? "border-primary bg-primary text-white" : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-semibold ${on ? "bg-white/25" : "bg-muted"}`}>{i + 1}</span>
              <span className="hidden truncate sm:block">{tools[key]}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-3.5 space-y-3">{children}</div>
    </div>
  );
}

export function SupplyPage({
  section,
  path,
  prefix,
  appName,
  features,
  tool,
  connectStructure,
  icons,
  stepTones,
  render,
}: {
  section: string;
  path: string;
  prefix: string;
  appName: string;
  features: string[];
  tool: ToolKey;
  connectStructure: { key: string; tools: ToolKey[] }[];
  icons: LucideIcon[];
  stepTones?: Tone[];
  render: (ui: Record<string, string>) => ReactNode;
}) {
  const content = useTemplateContent(section);
  const { t: common } = useCommon();

  return (
    <TemplatePage
      slug={path}
      prefix={prefix}
      appName={`Supply Chain ${appName}`}
      features={features}
      content={content}
      stepTones={stepTones}
      connectStructure={connectStructure}
      localIcons={icons}
      exploreHref="/apps/supply-chain/overview"
      exploreLabel={common("exploreSupply")}
      preview={
        <TemplatePreview
          prefix={prefix}
          toolKey={tool}
          content={content}
          cols={[]}
          rows={[]}
          body={
            <SupplyShell path={path} active={tool} title={content.ui.title}>
              {render(content.ui)}
            </SupplyShell>
          }
        />
      }
    />
  );
}
