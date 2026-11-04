/**
 * Adon ERP public site: /apps/real-estate/bookings
 * Copy lives in messages/*.json under pages.accountingShowcase.reBookingsPage.
 * ALL DATA ON THIS PAGE IS DUMMY.
 */
import type { Metadata } from "next";
import { CalendarClock, FileSignature, Handshake, Landmark } from "lucide-react";

import { Card, Chip, Field, HrPage, Table, bdt, hrMetadata, type HrTone } from "../../human-resources/_hr";

/** DUMMY data: [item key, instalment number, due date, amount, status key, tone]. */
const schedule: [string, string, string, number, string, HrTone][] = [
  ["iBooking", "", "02 Jan 2026", 500000, "stPaid", "teal"],
  ["iDown", "", "02 Feb 2026", 2476000, "stPaid", "teal"],
  ["iInst", "1", "02 Mar 2026", 435000, "stPaid", "teal"],
  ["iInst", "2", "02 Apr 2026", 435000, "stDue", "brown"],
  ["iInst", "3", "02 May 2026", 435000, "stUpcoming", "muted"],
  ["iInst", "4", "02 Jun 2026", 435000, "stUpcoming", "muted"],
];

export async function generateMetadata(): Promise<Metadata> {
  return hrMetadata("reBookingsPage", "/apps/real-estate/bookings");
}

export default function RealEstateBookingsPage() {
  return (
    <HrPage
      section="reBookingsPage"
      path="/apps/real-estate/bookings"
      prefix="rbk"
      appName="Bookings"
      tool="reBookings"
      group="re"
      features={[
        "Buyer, unit and price on one booking form",
        "Booking money, down payment and monthly instalments with dates",
        "Allotment letter printed from the booking",
        "Nominee and broker recorded from day one",
        "Every discount shows who approved it",
      ]}
      stepTones={["purple", "teal", "muted"]}
      connectStructure={[
        { key: "before", tools: ["reUnits", "reBrokers"] },
        { key: "after", tools: ["reCollections", "reBuyerPortal"] },
        { key: "shows", tools: ["receipts", "reDashboard"] },
      ]}
      icons={[FileSignature, CalendarClock, Handshake, Landmark]}
      render={(ui) => (
        <div className="grid gap-3 lg:grid-cols-12">
          <Card className="lg:col-span-5" title={ui.formTitle}>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <Field label={ui.fBuyer} value="Tahmina Rahman" />
              <Field label={ui.fUnit} value="Tower A, 7C" select />
              <Field label={ui.fPrice} value={bdt(13616000)} />
              <Field label={ui.fBooking} value={bdt(500000)} />
              <Field label={ui.fPlan} value={ui.planValue} select />
              <Field label={ui.fBroker} value="Rafiq Associates" select />
            </div>
          </Card>
          <Card className="lg:col-span-7" title={ui.scheduleTitle}>
            <Table
              dense
              cols={[
                { head: ui.cItem },
                { head: ui.cDue },
                { head: ui.cAmount, end: true },
                { head: ui.cStatus, className: "ps-4" },
              ]}
              rows={schedule.map(([item, n, due, amt, st, tone], i) => [
                `${ui[item]}${n ? ` ${n}` : ""}`,
                due,
                bdt(amt),
                <Chip key={i} tone={tone}>
                  {ui[st]}
                </Chip>,
              ])}
            />
          </Card>
        </div>
      )}
    />
  );
}
