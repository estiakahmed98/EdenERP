/**
 * Adon ERP public site: /apps/sales/crm/insights/am-scorecard
 * Copy lives in messages/*.json under pages.accountingShowcase.crScorecardPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Award, ClipboardCheck, LineChart, Medal } from "lucide-react";

import { Avatar, Card, HrPage, hrMetadata } from "../../../../human-resources/_hr";

const cols = ["mTarget", "mVisits", "mWin", "mCollect", "mGrowth"];
/** DUMMY data: [manager, scores out of 100 for each measure, last 6 months' overall]. */
const managers: [string, number[], number[]][] = [
  ["Ashraful", [91, 84, 62, 88, 74], [70, 72, 75, 78, 79, 80]],
  ["Rasel mia", [64, 92, 48, 71, 58], [66, 64, 63, 65, 66, 67]],
  ["Pranto", [82, 70, 55, 93, 81], [61, 66, 70, 73, 75, 76]],
  ["Hasnat", [42, 51, 38, 60, 35], [58, 55, 52, 50, 49, 45]],
];

function cell(v: number) {
  if (v >= 80) return "bg-[var(--teal)] text-white";
  if (v >= 60) return "bg-[var(--teal)]/20 text-foreground";
  if (v >= 45) return "bg-[var(--chart-4)]/25 text-foreground";
  return "bg-destructive/15 text-destructive";
}

function Spark({ values }: { values: number[] }) {
  const min = Math.min(...values) - 5;
  const max = Math.max(...values) + 5;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 60},${20 - ((v - min) / (max - min)) * 20}`).join(" ");
  const up = values[values.length - 1] >= values[0];
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-16" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? "var(--teal)" : "var(--destructive)"} strokeWidth="1.6" />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("crScorecardPage", "/apps/sales/crm/insights/am-scorecard");
}

export default function AmScorecardPage() {
  return (
    <HrPage
      section="crScorecardPage"
      path="/apps/sales/crm/insights/am-scorecard"
      prefix="amsc"
      appName="AM Scorecard"
      tool="crScorecard"
      group="crInsightsG"
      features={[
        "One score for each account manager, from five measures",
        "Target, visit plan, win rate, collections and account growth",
        "Weights you set for what matters most",
        "The trend over six months, not just this month",
        "Each score opens the records behind it",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["crTargets", "crVisits", "crCollections"] },
        { key: "after", tools: ["hrAppraisals", "crCommissions"] },
        { key: "shows", tools: ["crDashboard"] },
      ]}
      icons={[ClipboardCheck, Medal, LineChart, Award]}
      render={(ui) => (
        <Card title={ui.title2} right={<span className="text-[10px] text-muted-foreground">{ui.weights}</span>}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-separate border-spacing-1 text-[11px]">
              <thead className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-start">{ui.thManager}</th>
                  {cols.map((c) => (
                    <th key={c} className="text-center">
                      {ui[c]}
                    </th>
                  ))}
                  <th className="text-center">{ui.thScore}</th>
                  <th className="text-center">{ui.thTrend}</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(([m, scores, trend], i) => {
                  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                  return (
                    <tr key={m}>
                      <td className="pe-2">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <Avatar name={m} size={20} tone={i} /> {m}
                        </span>
                      </td>
                      {scores.map((s, j) => (
                        <td key={j} className={`rounded-md py-1.5 text-center font-semibold tabular-nums ${cell(s)}`}>
                          {s}
                        </td>
                      ))}
                      <td className="rounded-md bg-[var(--gray-bg)] py-1.5 text-center text-[13px] font-bold tabular-nums text-foreground">{overall}</td>
                      <td className="text-center">
                        <Spark values={trend} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    />
  );
}
