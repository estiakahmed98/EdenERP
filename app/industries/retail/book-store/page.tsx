//app/industries/book-store/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  BookOpen,
  Check,
  CirclePlay,
  Library,
  Mail,
  ReceiptText,
  ShoppingBag,
  SmilePlus,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

export const metadata: Metadata = {
  title: "Book Store | AdonERP Industries",
  description:
    "A bookstore industry landing page for AdonERP with point of sale, inventory, and retail workflow sections.",
};

const features = [
  {
    title: "Reporting",
    description:
      "Track your sales trends, bestsellers, and stock performance in one place.",
  },
  {
    title: "Multiple cashiers",
    description:
      "Assign secure cashier profiles with badges or PINs for every shift.",
  },
  {
    title: "Loyalty programs",
    description:
      "Reward returning readers with points, tiered perks, and member pricing.",
  },
  {
    title: "Sell consignment products",
    description:
      "Receive, store, and settle consignment books with clear partner visibility.",
  },
  {
    title: "Gift cards",
    description:
      "Create, top up, and redeem physical or digital gift cards in seconds.",
  },
  {
    title: "Pricelists",
    description:
      "Set flexible pricing by customer type, channel, event, or campaign.",
  },
];

const apps = [
  {
    title: "Point of Sale",
    subtitle: "Ring up orders at checkout",
    icon: ShoppingBag,
  },
  {
    title: "Invoicing",
    subtitle: "Create and follow invoices",
    icon: ReceiptText,
  },
  {
    title: "Purchase",
    subtitle: "Restock from suppliers faster",
    icon: Library,
  },
  { title: "Inventory", subtitle: "Keep every shelf in sync", icon: BookOpen },
  { title: "eCommerce", subtitle: "Sell books online too", icon: Sparkles },
  { title: "Email Marketing", subtitle: "Launch reader campaigns", icon: Mail },
];

const people = [
  { name: "Laila", top: "4%", left: "17%" },
  { name: "Harrison", top: "12%", left: "68%" },
  { name: "Nadia", top: "32%", left: "7%" },
  { name: "Andre", top: "36%", left: "84%" },
  { name: "Mina", top: "62%", left: "18%" },
  { name: "Omar", top: "70%", left: "76%" },
  { name: "Jules", top: "80%", left: "39%" },
  { name: "Iris", top: "18%", left: "42%" },
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
      <span className="text-amber-500">{icon}</span>
      {label}
    </div>
  );
}

export default function BookStorePage() {
  return (
    <main className="overflow-hidden bg-[linear-linear(180deg,_#fff_0%,_#fffcf7_18%,_#ffffff_100%)] text-slate-800">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-linear(circle_at_15%_12%,rgba(251,191,36,0.18),transparent_25%),radial-linear(circle_at_85%_15%,rgba(167,139,250,0.14),transparent_24%),linear-linear(180deg,rgba(255,255,255,1)_0%,rgba(255,252,247,1)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<BookOpen className="h-4 w-4" />}
              label="Retail industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Book Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-slate-700"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The ideal software for managing your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-slate-900 sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Book Store
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-slate-600">
                Organize ISBN codes, simplify bookstore checkout, keep stock
                accurate, and deliver better customer service from one unified
                AdonERP workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="mb-4 text-4xl leading-none text-amber-500">"</div>
              <p className="text-base leading-7 text-slate-700">
                AdonERP gives bookstore teams the kind of visibility that makes
                daily decisions faster. From bestseller trends to shelf-level
                stock control, every move feels simpler and more precise.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="font-semibold text-slate-900">Lana Habib</p>
                  <p className="text-sm text-slate-500">
                    Co-founder, independent bookstore
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-amber-100 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-white bg-[linear-linear(180deg,_#f3ebff_0%,_#ffffff_35%,_#fdf6ea_100%)] shadow-[0_40px_100px_rgba(76,29,149,0.18)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-[#5f3b84] p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-rose-300",
                            "bg-amber-300",
                            "bg-sky-300",
                            "bg-emerald-300",
                            "bg-fuchsia-300",
                            "bg-orange-300",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-teal-700 shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-teal-500 shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-slate-100 shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-slate-200 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-slate-200 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl">
                  <CirclePlay className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            icon={<SmilePlus className="h-4 w-4" />}
            label="Reader-friendly point of sale"
          />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <ScriptHeading>
            An efficient Point of Sale?
            <br />
            No longer a fiction.
          </ScriptHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          {/* <div className="absolute -left-3 top-10 hidden text-sm font-medium text-slate-400 lg:block">
            Discounts
          </div>
          <div className="absolute -right-4 top-16 hidden text-sm font-medium text-slate-400 lg:block">
            Filter by product categories
          </div> */}
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[0.85fr_0.65fr_1.25fr]">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="space-y-3">
                  {[
                    ["Harry Potter", "$24.00"],
                    ["Atomic Habits", "$18.50"],
                    ["Gift Card", "$30.00"],
                    ["Bookmark", "$4.50"],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="font-medium text-slate-700">
                        {title}
                      </span>
                      <span className="text-sm text-slate-500">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-primary px-4 py-4 text-white">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Subtotal</span>
                    <span>$77.00</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold">$82.39</div>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#f5eefc] p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "%",
                    "0",
                    "Pay",
                  ].map((key) => (
                    <div
                      key={key}
                      className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold ${
                        key === "Pay"
                          ? "bg-primary text-white"
                          : "bg-white text-slate-600 shadow-sm"
                      }`}
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Books
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                    24 items
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    "Atomic Habits",
                    "Dune",
                    "Gift Cards",
                    "Sapiens",
                    "Literary Fiction",
                    "Children",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="overflow-hidden rounded-[1.3rem] bg-white shadow-sm"
                    >
                      <div
                        className={`h-24 ${
                          [
                            "bg-linear-to-br from-orange-200 to-rose-300",
                            "bg-linear-to-br from-sky-200 to-indigo-300",
                            "bg-linear-to-br from-amber-200 to-yellow-300",
                            "bg-linear-to-br from-violet-200 to-fuchsia-300",
                            "bg-linear-to-br from-emerald-200 to-teal-300",
                            "bg-linear-to-br from-pink-200 to-rose-200",
                          ][index]
                        }`}
                      />
                      <div className="space-y-1 p-3">
                        <p className="text-sm font-semibold text-slate-700">
                          {item}
                        </p>
                        <p className="text-xs text-slate-400">Tap to add</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Reader avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">
              Keep track of your books.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="space-y-5 self-center">
          <div className="flex items-center gap-3 text-slate-900">
            <Barcode className="h-10 w-10 text-rose-500" />
            <div className="h-1 w-24 rounded-full bg-rose-300" />
          </div>
          <ScriptHeading className="text-3xl sm:text-4xl">
            Scan it, that&apos;s it
          </ScriptHeading>
          <p className="max-w-md text-base leading-7 text-slate-600">
            Speed matters. Scan your book&apos;s ISBN code to create new
            products instantly, fetch references from distributors, and manage
            editions faster in a catalog that stays accurate.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-10 rounded-full bg-slate-100" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_35px_80px_rgba(15,23,42,0.1)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-500">
                  Inventory card
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  Harry Potter and the Philosopher&apos;s Stone
                </h3>
              </div>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                In stock
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Author", "J.K. Rowling"],
                ["ISBN", "9780747532699"],
                ["Category", "Fantasy / Children"],
                ["On hand", "18 units"],
                ["Publisher", "Bloomsbury"],
                ["Location", "Shelf A3"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 font-medium text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Staff avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">
              Avoid manual stock management.
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            icon={<BadgeCheck className="h-4 w-4" />}
            label="Inventory discipline"
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>Shelf control is the key to success</ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Maintain optimal stock levels by generating smart replenishment
              orders when a title drops below threshold, so fast-moving books
              never leave your shelves empty.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute inset-x-14 top-8 h-72 rounded-full bg-slate-100" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_35px_90px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              <span>Product</span>
              <span>Location</span>
              <span>On hand</span>
              <span>Forecast</span>
              <span>Min</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                [
                  "The Silent Patient",
                  "Warehouse 01",
                  "3",
                  "1",
                  "5",
                  "Restock now",
                ],
                ["Why Fish Don't Exist", "Shelf B4", "14", "9", "6", "Healthy"],
                ["The Kite Runner", "Warehouse 01", "5", "2", "4", "Low stock"],
                ["The Book Thief", "Shelf C2", "8", "5", "5", "Healthy"],
              ].map((row, rowIndex) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 px-6 py-4 text-sm text-slate-600"
                >
                  {row.map((cell, cellIndex) => (
                    <div
                      key={`${row[0]}-${cellIndex}`}
                      className={
                        cellIndex === 5
                          ? `inline-flex max-w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                              rowIndex === 0
                                ? "bg-rose-100 text-rose-700"
                                : rowIndex === 2
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`
                          : cellIndex === 0
                            ? "font-semibold text-slate-900"
                            : ""
                      }
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-7 flex max-w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2 shadow-lg shadow-slate-200/50">
            <Image
              src="/placeholder-user.jpg"
              alt="Manager avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm text-slate-500">
              But wait! There&apos;s more.
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-t-[4rem] bg-[#f5f5f7] py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-linear(circle_at_center,_rgba(168,85,247,0.08),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Retail workflows stay practical when every part of the bookstore
              stack works together from checkout to replenishment.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.6rem] border border-white bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <ScriptHeading>
            One <HandUnderline color="bg-sky-400">need</HandUnderline>, one{" "}
            <HandUnderline color="bg-sky-400">app</HandUnderline>.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow with connected apps for your retail operation,
            finance, supplier flows, and customer communication.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="group rounded-[1.6rem] border border-slate-200 bg-white px-5 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          See all apps
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-[linear-linear(135deg,_#fff_0%,_#faf5ff_45%,_#fff8ed_100%)] px-6 py-16 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-90">
            {people.map((person, index) => (
              <div
                key={person.name}
                className={`absolute h-14 w-14 overflow-hidden rounded-full border-4 border-white shadow-lg ${
                  index % 3 === 0
                    ? "bg-violet-200"
                    : index % 3 === 1
                      ? "bg-amber-200"
                      : "bg-teal-200"
                }`}
                style={{ top: person.top, left: person.left }}
              >
                <Image
                  src="/placeholder-user.jpg"
                  alt={person.name}
                  fill
                  className="object-cover mix-blend-multiply"
                />
              </div>
            ))}
            {[
              ["6%", "5%"],
              ["16%", "82%"],
              ["58%", "2%"],
              ["78%", "88%"],
              ["8%", "48%"],
              ["72%", "58%"],
            ].map(([top, left], index) => (
              <div
                key={`${top}-${left}`}
                className={`absolute rounded-3xl ${
                  index % 2 === 0
                    ? "h-10 w-10 bg-slate-200/70"
                    : "h-12 w-12 bg-primary/15"
                }`}
                style={{ top, left }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-white/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 75 million users
            </ScriptHeading>
            <p className="mt-3 text-base text-slate-600">
              who grow their business with software that feels simple from day
              one.
            </p>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Growth-ready retail stack"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600">
            Launch a bookstore workflow that helps your team sell faster, stock
            smarter, and scale from one branch to many without adding chaos.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start now
            </Link>
            <div
              id="advisor"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
            >
              <Check className="h-4 w-4" />
              15-day trial
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
