import {
  manufacturingModules,
  type ManufacturingModuleContent,
  type ManufacturingSlug,
} from "./module-content";

type LocalizedModule = {
  title: string;
  category: string;
  hero: [string, string];
  description: string;
  flow: [string, string, string];
  callout: string;
  note: string;
  workspaceTitle: string;
  workspaceDescription: string;
  contextLabel: string;
  valueLabel: string;
  totalLabel: string;
  progressLabel: string;
  rows: { name: string; context: string; note: string }[];
  workflow: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
};

/**
 * module-content.ts holds the structure and sample figures (ids, numbers,
 * status keys). Every visible sentence comes from messages/manufacturing.
 */
export function localizeModule(
  slug: ManufacturingSlug,
  text: LocalizedModule,
): ManufacturingModuleContent {
  const base = manufacturingModules[slug];
  return {
    ...base,
    title: text.title,
    category: text.category,
    hero: text.hero,
    description: text.description,
    flow: text.flow,
    callout: text.callout,
    note: text.note,
    workspaceTitle: text.workspaceTitle,
    workspaceDescription: text.workspaceDescription,
    contextLabel: text.contextLabel,
    valueLabel: text.valueLabel,
    totalLabel: text.totalLabel,
    progressLabel: text.progressLabel,
    rows: base.rows.map((row, i) => [
      row[0],
      text.rows[i].name,
      text.rows[i].context,
      row[3],
      row[4],
      row[5],
      text.rows[i].note,
    ]),
    workflow: base.workflow.map((_, i) => [
      text.workflow[i].title,
      text.workflow[i].description,
    ]) as unknown as ManufacturingModuleContent["workflow"],
    capabilities: base.capabilities.map((cap, i) => [
      text.capabilities[i].title,
      text.capabilities[i].description,
      cap[2],
    ]) as unknown as ManufacturingModuleContent["capabilities"],
  };
}
