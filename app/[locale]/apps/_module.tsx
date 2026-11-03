import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useCommon, type ToolKey } from "./accounting/_shared";
import {
  TemplatePage,
  TemplatePreview,
  accountingPageMetadata,
  useTemplateContent,
  type Tone,
} from "./accounting/_template";

/*
 * Wrapper for the Inventory and Open Platform showcase pages. The preview has a
 * breadcrumb, a title, a segmented row with the module's pages (current one
 * highlighted) and then the content. Copy lives under
 * pages.accountingShowcase.<section>. ALL DATA ON THESE PAGES IS DUMMY.
 */

export function moduleMetadata(section: string, path: string): Promise<Metadata> {
  return accountingPageMetadata(section, path);
}

function ModuleShell({
  moduleKey,
  tabs,
  active,
  title,
  children,
}: {
  moduleKey: string;
  tabs: ToolKey[];
  active: ToolKey;
  title: string;
  children: ReactNode;
}) {
  const { t: common, tools } = useCommon();
  return (
    <div>
      <p className="text-[10.5px] text-muted-foreground">
        {common(moduleKey)} / <span className="text-foreground">{tools[active]}</span>
      </p>
      <p className="mt-1 text-[16px] font-semibold text-foreground sm:text-[18px]">{title}</p>
      <nav className="mt-3 inline-flex max-w-full flex-wrap gap-0.5 rounded-xl bg-muted p-0.5" aria-hidden="true">
        {tabs.map((key) => (
          <span
            key={key}
            className={`rounded-lg px-2.5 py-1 text-[11px] ${key === active ? "bg-card font-semibold text-primary shadow-sm" : "text-muted-foreground"}`}
          >
            {tools[key]}
          </span>
        ))}
      </nav>
      <div className="mt-3.5 space-y-3">{children}</div>
    </div>
  );
}

export function ModulePage({
  section,
  path,
  prefix,
  appName,
  moduleKey,
  exploreKey,
  exploreHref,
  features,
  tool,
  tabs,
  connectStructure,
  icons,
  stepTones,
  render,
}: {
  section: string;
  path: string;
  prefix: string;
  appName: string;
  moduleKey: "invModule" | "opModule";
  exploreKey: "exploreInventory" | "explorePlatform";
  exploreHref: string;
  features: string[];
  tool: ToolKey;
  tabs: ToolKey[];
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
      appName={`${common(moduleKey)} ${appName}`}
      features={features}
      content={content}
      stepTones={stepTones}
      connectStructure={connectStructure}
      localIcons={icons}
      exploreHref={exploreHref}
      exploreLabel={common(exploreKey)}
      preview={
        <TemplatePreview
          prefix={prefix}
          toolKey={tool}
          content={content}
          cols={[]}
          rows={[]}
          body={
            <ModuleShell moduleKey={moduleKey} tabs={tabs} active={tool} title={content.ui.title}>
              {render(content.ui)}
            </ModuleShell>
          }
        />
      }
    />
  );
}
