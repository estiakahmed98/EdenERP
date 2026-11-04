/**
 * Adon ERP public site: /apps/education/school-bus
 * Copy lives in messages/*.json under pages.accountingShowcase.edBusPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus, Printer } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Panel, PencilBar, Register, Sticker, Tabs, num, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [code, route, vehicle, attendant, driver, riders, seats, fee]. */
const routes: [string, string, string, string, string, number, number, number][] = [
  ["N1", "Shapla Chowk, Mirpur 10, Pallabi", "School bus 1 · DM-BA-11-2207", "Shefali Begum", "Abdul Mazid", 31, 40, 1500],
  ["N2", "Uttara, Airport, Khilkhet", "School bus 2 · DM-BA-11-2208", "Rina Akter", "Kalam Mia", 30, 40, 1800],
  ["S1", "Dhanmondi, Science Lab, Azimpur", "School bus 3 · DM-BA-11-2209", "Mahmuda Khatun", "Rafiqul Islam", 24, 36, 1700],
];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edBusPage", "/apps/education/school-bus");
}

export default function EducationBusPage() {
  const ui = useUi("edBusPage");
  const riders = routes.reduce((n, r) => n + r[5], 0);
  return (
    <SchoolPage
      section="edBusPage"
      path="/apps/education/school-bus"
      tool="schoolBus"
      preview={
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            <Sticker label={ui.kRoutes} value={String(routes.length)} />
            <Sticker label={ui.kRiders} value={String(riders)} />
            <Sticker label={ui.kBoarded} value="79" tone="green" />
            <Sticker label={ui.kAbsent} value="6" tone="red" />
            <Sticker label={ui.kFee} value={ui.kFeeValue} />
          </div>
          <Tabs items={[ui.tabRoutes, ui.tabRiders, ui.tabBoarding, ui.tabSettings]} />
          <Panel>
            <div className="mb-3">
              <Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newRoute}</Btn>
            </div>
            <Register
              dense
              cols={[
                { head: ui.cCode },
                { head: ui.cRoute },
                { head: ui.cVehicle },
                { head: ui.cAttendant },
                { head: ui.cRiders, className: "w-28" },
                { head: ui.cFee, end: true },
                { head: "-" },
              ]}
              rows={routes.map(([code, route, vehicle, attendant, driver, r, seats, fee]) => [
                <b key={code} className="font-semibold text-foreground">
                  {code}
                </b>,
                <span key={route}>
                  {route}
                  <span className="block text-[9.5px] text-muted-foreground">
                    {ui.morning} · 5 {ui.stops}
                  </span>
                </span>,
                <span key={`v${code}`} className="text-muted-foreground">
                  {vehicle}
                </span>,
                <span key={`a${code}`}>
                  {attendant}
                  <span className="block text-[9.5px] text-muted-foreground">
                    {ui.driver}: {driver}
                  </span>
                </span>,
                <span key={`r${code}`} className="flex items-center gap-2">
                  <PencilBar pct={(r / seats) * 100} tone="blue" />
                  <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                    {r}/{seats}
                  </span>
                </span>,
                num(fee),
                <span key={`b${code}`} className="flex gap-1.5">
                  <Btn>{ui.stopsBtn}</Btn>
                  <Btn>{ui.edit}</Btn>
                  <Btn icon={<Printer className="h-3 w-3" />}>{ui.routeSheet}</Btn>
                </span>,
              ])}
            />
          </Panel>
        </>
      }
    />
  );
}
