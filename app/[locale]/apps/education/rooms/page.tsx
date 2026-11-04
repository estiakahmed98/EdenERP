/**
 * Adon ERP public site: /apps/education/rooms
 * Copy lives in messages/*.json under pages.accountingShowcase.edRoomsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { Plus } from "lucide-react";

import { SchoolPage } from "@/components/education/school-page";
import { Btn, Field, Panel, Pill, Register, useUi } from "@/components/education/school-ui";

import { accountingMetadata } from "../../accounting/_shared";

/** DUMMY data: [code, name, type key, seats, home section, periods]. */
const rooms: [string, string, string, number, string, number][] = [
  ["BIO-LAB", "Biology lab", "lab", 40, "", 0],
  ["CHEM-LAB", "Chemistry lab", "lab", 40, "", 0],
  ["HALL", "Auditorium", "hall", 600, "", 0],
  ["LIB", "Library", "library", 80, "", 0],
  ["C10-SCI", "Class 10 Science", "classroom", 40, "Class 10 Science (36)", 27],
  ["C10-BUS", "Class 10 Business", "classroom", 40, "Class 10 Business (27)", 27],
];
const free = ["BIO-LAB", "ICT-LAB", "LIB", "C9-A"];

export async function generateMetadata(): Promise<Metadata> {
  return accountingMetadata("edRoomsPage", "/apps/education/rooms");
}

export default function EducationRoomsPage() {
  const ui = useUi("edRoomsPage");
  return (
    <SchoolPage
      section="edRoomsPage"
      path="/apps/education/rooms"
      tool="rooms"
      preview={
        <div className="grid gap-3 lg:grid-cols-12">
          <Panel className="lg:col-span-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Btn solid icon={<Plus className="h-3 w-3" />}>{ui.newRoom}</Btn>
              <Btn>{ui.buildFrom}</Btn>
            </div>
            <Register
              dense
              cols={[
                { head: ui.cCode },
                { head: ui.cType },
                { head: ui.cSeats, end: true },
                { head: ui.cHome, className: "ps-4" },
                { head: "-" },
              ]}
              rows={rooms.map(([code, name, type, seats, home, periods]) => [
                <span key={code}>
                  <b className="font-semibold text-foreground">{code}</b>
                  <span className="block text-[9.5px] text-muted-foreground">
                    {name} · {ui.mainBuilding}
                  </span>
                </span>,
                ui[type],
                seats,
                home ? (
                  <span key={`h${code}`}>
                    {home}
                    <span className="block text-[9.5px] text-muted-foreground">
                      {periods} {ui.periodsWeek}
                    </span>
                  </span>
                ) : (
                  "–"
                ),
                <Btn key={`e${code}`}>{ui.edit}</Btn>,
              ])}
            />
          </Panel>
          <Panel className="lg:col-span-4" title={ui.freeTitle} taped>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label={ui.fDay} value={ui.dayValue} select />
              <Field label={ui.fPeriod} value={ui.periodValue} select />
            </div>
            <div className="mt-3">
              <Btn>{ui.find}</Btn>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {free.map((code) => (
                <Pill key={code} tone="green">
                  {code} · {ui.freeNow}
                </Pill>
              ))}
            </div>
          </Panel>
        </div>
      }
    />
  );
}
