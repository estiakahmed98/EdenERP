"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileSignature,
  Globe2,
  ListTodo,
  Menu,
  MessageCircle,
  PackageCheck,
  PenLine,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { HandUnderline } from "@/components/ui/headunderline";

const features = [
  {
    title: "Unavailable days",
    description:
      "Select days when specific products, rooms, vehicles, or equipment are not available.",
    icon: CalendarDays,
  },
  {
    title: "Minimal rental time",
    description:
      "Set a minimum rental duration so your products are booked only within valid time slots.",
    icon: Clock3,
  },
  {
    title: "Padding in & out",
    description:
      "Add preparation time before and after each rental to keep your workflow smooth.",
    icon: Zap,
  },
  {
    title: "Delay costs",
    description:
      "Apply automatic extra charges when rented products are returned late.",
    icon: ReceiptText,
  },
  {
    title: "Default padding time",
    description:
      "Schedule buffer time between bookings to prepare, clean, or inspect products.",
    icon: ShieldCheck,
  },
  {
    title: "Easy quotations",
    description:
      "Create and send professional quotations directly from the rental request.",
    icon: FileSignature,
  },
];

const apps = [
  {
    title: "Sign",
    description: "Request online signatures",
    icon: PenLine,
  },
  {
    title: "Inventory",
    description: "Track products and stock",
    icon: PackageCheck,
  },
  {
    title: "Invoicing",
    description: "Bill customers easily",
    icon: ReceiptText,
  },
  {
    title: "eCommerce",
    description: "Sell and rent online",
    icon: Globe2,
  },
  {
    title: "Maintenance",
    description: "Manage equipment services",
    icon: CheckCircle2,
  },
];

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=96&h=96&fit=crop&crop=face",
];

const handwrittenFont =
  '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

export default function CertificationsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <p className="mx-auto mb-4 max-w-xl text-sm font-medium text-slate-500">
            Rental management software for modern businesses
          </p>

          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Rent it.{" "}
            <span className="relative inline-block text-[#02a6a6]">
              Track it.
              <span className="absolute -bottom-2 left-2 h-2 w-[90%] rounded-full bg-[#02a6a6]/20" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Adon Rental is now inventory, ecommerce, sales, accounting, and
            signatures in one app. Get organized, reduce manual work, and make
            every rental process faster.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <Link
              href="#features"
              className="rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              Watch a demo
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Free, forever, with unlimited users
          </p>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-8 hidden rotate-[-18deg] text-[#ff5c78] sm:block">
              <Sparkles className="h-12 w-12" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
              <div className="rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300" />
                  </div>
                  <div className="h-3 w-40 rounded-full bg-slate-100" />
                  <div className="h-7 w-7 rounded-full bg-[#714b67]" />
                </div>

                <div className="grid gap-3 p-5 lg:grid-cols-[190px_1fr]">
                  <div className="space-y-3 rounded-lg bg-white p-4 shadow-sm">
                    {["Rental Orders", "Quotations", "Products", "Calendar"].map(
                      (item, index) => (
                        <div
                          key={item}
                          className={`rounded-md px-3 py-2 text-left text-xs font-semibold ${
                            index === 0
                              ? "bg-[#714b67] text-white"
                              : "bg-slate-50 text-slate-500"
                          }`}
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="rounded-lg bg-white p-4 shadow-sm">
                    <div className="grid grid-cols-7 gap-2 border-b border-slate-100 pb-3 text-[10px] font-semibold uppercase text-slate-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day}>{day}</div>
                        ),
                      )}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="ml-[14%] h-8 w-[45%] rounded-md bg-[#f6c453] px-3 py-2 text-left text-xs font-bold text-slate-800">
                        Camera Kit
                      </div>
                      <div className="ml-[25%] h-8 w-[38%] rounded-md bg-[#93c5fd] px-3 py-2 text-left text-xs font-bold text-slate-800">
                        Meeting Room
                      </div>
                      <div className="ml-[40%] h-8 w-[35%] rounded-md bg-[#a7f3d0] px-3 py-2 text-left text-xs font-bold text-slate-800">
                        Delivery Van
                      </div>
                      <div className="ml-[8%] h-8 w-[28%] rounded-md bg-[#c4b5fd] px-3 py-2 text-left text-xs font-bold text-slate-800">
                        Projector
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-[#02a6a6]">
            <Wifi className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Save time,{" "}
            <span className="relative inline-block">
              rent online
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Publish products, let customers select dates, validate availability,
            and confirm rental requests directly through your website.
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div className="bg-slate-50 p-5">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop"
                  alt="Rental workspace"
                  className="h-64 w-full rounded-lg object-cover"
                />
              </div>

              <div className="p-6 text-left">
                <p className="text-sm font-bold text-slate-900">
                  Working Space
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Select available dates
                </p>

                <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
                  {Array.from({ length: 35 }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex h-8 items-center justify-center rounded-md ${
                        [10, 11, 12, 18, 19].includes(index)
                          ? "bg-[#714b67] text-white"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-xs font-bold text-white">
                  Book now
                </button>
              </div>
            </div>

            <div className="bg-[#171824] px-6 py-5 text-left text-white">
              <div className="grid gap-4 sm:grid-cols-3">
                {["Pick dates", "Confirm product", "Pay online"].map((item) => (
                  <div key={item}>
                    <p className="text-xs font-bold">{item}</p>
                    <p className="mt-1 text-[11px] text-white/55">
                      Fast rental checkout
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-20">
        <div className="absolute left-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-20 rounded bg-slate-100" />
                </div>
                <div className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white">
                  Send
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ["Customer", "Premium Office"],
                  ["Rental Period", "12 days"],
                  ["Subtotal", "$2,400.00"],
                  ["Taxes", "$120.00"],
                  ["Total", "$2,520.00"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-md bg-white px-4 py-3 text-sm"
                  >
                    <span className="text-slate-500">{label}</span>
                    <span className="font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Time is money...
              <br />
              literally
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Automate quotations, invoices, confirmations, and follow-ups so
              your team spends less time on repetitive tasks and more time
              serving customers.
            </p>

            <div className="mt-10 flex items-center gap-4 text-slate-300">
              <div className="h-px w-20 border-t border-dashed border-slate-300" />
              <ArrowDown className="h-8 w-8 rotate-[-25deg]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Signature requests
              <br />
              on request
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              Upload rental agreements, insurance forms, contracts, and waiver
              documents. Request customer signatures digitally before every
              rental starts.
            </p>
          </div>

          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                Quotation → Agreement → Signature → Confirmed
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
              <div className="border-b border-slate-100 pb-3">
                <div className="h-4 w-24 rounded bg-[#714b67]" />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="h-5 w-48 rounded bg-slate-800" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <div className="h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-11/12 rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                  <div className="mt-6 flex justify-end">
                    <div
                      className="text-2xl text-[#714b67]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      Signed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-[#02a6a6]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Automate your{" "}
            <span className="relative inline-block text-[#f59e0b]">
              to-do-list
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#f59e0b]/20" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            From pickup to return, Adon can automatically create tasks for your
            team so nothing gets missed.
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)]">
            <div className="grid gap-3 text-left">
              {[
                ["Prepare product", "High", "Today", "Ready"],
                ["Send agreement", "Medium", "Today", "In progress"],
                ["Confirm payment", "High", "Tomorrow", "Waiting"],
                ["Schedule pickup", "Low", "Friday", "Planned"],
              ].map(([task, priority, date, status]) => (
                <div
                  key={task}
                  className="grid grid-cols-4 items-center rounded-lg bg-slate-50 px-4 py-3 text-xs"
                >
                  <span className="font-bold text-slate-800">{task}</span>
                  <span className="text-slate-500">{priority}</span>
                  <span className="text-slate-500">{date}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-center font-bold text-[#714b67]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="rounded-t-[4rem] bg-[#f3f4f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block text-[#02a6a6]">
              features
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20" />
            </span>
            <br />
            done right.
          </h2>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] text-[#714b67]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One <HandUnderline color="bg-sky-400">need</HandUnderline>,{" "}
            one <HandUnderline color="bg-sky-400">app</HandUnderline>.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Expand as you grow with integrated apps that work together.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#02a6a6] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{app.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
          >
            See all apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-[360px]">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute h-14 w-14 rounded-full border-4 border-white object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-full bg-slate-100"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-md bg-[#714b67]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400">“</div>
              <div>
                <p className="text-base leading-8 text-slate-700">
                  After renting hundreds of products, Adon helped us manage
                  every contract, invoice, signature, and delivery from one
                  simple platform. The best part is that our team finally knows
                  what to do next.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="Customer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Marc Robinson</p>
                    <p className="text-sm text-slate-500">Rental manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your growth potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56]"
            >
              Start now - it&apos;s free
            </Link>

            <p className="mt-3 text-xs text-slate-400">
              No credit card required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}