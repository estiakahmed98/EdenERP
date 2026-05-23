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
    <main className="min-h-screen overflow-hidden bg-white dark:bg-slate-900 dark:bg-slate-950 text-slate-900 dark:text-slate-100 dark:text-white dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 dark:bg-slate-950 pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
          <p className="mx-auto mb-4 max-w-xl text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400">
            Rental management software for modern businesses
          </p>

          <h1
            className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Rent it.{" "}
            <span className="relative inline-block text-[#02a6a6] dark:text-[#02cfc3]">
              Track it.
              <span className="absolute -bottom-2 left-2 h-2 w-[90%] rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Adon Rental is now inventory, ecommerce, sales, accounting, and
            signatures in one app. Get organized, reduce manual work, and make
            every rental process faster.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#start"
              className="rounded-md bg-[#714b67] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Watch a demo
            </Link>
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -left-10 -top-8 hidden rotate-[-18deg] text-[#ff5c78] dark:text-[#ff7a8e] sm:block">
              <Sparkles className="h-12 w-12" />
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <div className="rounded-lg border border-slate-100 dark:border-slate-700 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-300 dark:bg-red-700" />
                    <span className="h-3 w-3 rounded-full bg-amber-300 dark:bg-amber-700" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300 dark:bg-emerald-700" />
                  </div>
                  <div className="h-3 w-40 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-7 w-7 rounded-full bg-[#714b67] dark:bg-[#8a5a7e]" />
                </div>

                <div className="grid gap-3 p-5 lg:grid-cols-[190px_1fr]">
                  <div className="space-y-3 rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm">
                    {[
                      "Rental Orders",
                      "Quotations",
                      "Products",
                      "Calendar",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-left text-xs font-semibold ${
                          index === 0
                            ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                            : "bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm">
                    <div className="grid grid-cols-7 gap-2 border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 pb-3 text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-500 dark:text-slate-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day}>{day}</div>
                        ),
                      )}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="ml-[14%] h-8 w-[45%] rounded-md bg-[#f6c453] dark:bg-[#d4a83a] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100 dark:text-slate-900 dark:text-slate-100">
                        Camera Kit
                      </div>
                      <div className="ml-[25%] h-8 w-[38%] rounded-md bg-[#93c5fd] dark:bg-[#6b9fd3] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100 dark:text-slate-900 dark:text-slate-100">
                        Meeting Room
                      </div>
                      <div className="ml-[40%] h-8 w-[35%] rounded-md bg-[#a7f3d0] dark:bg-[#7ecfa5] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100 dark:text-slate-900 dark:text-slate-100">
                        Delivery Van
                      </div>
                      <div className="ml-[8%] h-8 w-[28%] rounded-md bg-[#c4b5fd] dark:bg-[#9a87d4] px-3 py-2 text-left text-xs font-bold text-slate-800 dark:text-slate-100 dark:text-slate-900 dark:text-slate-100">
                        Projector
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-40 w-full bg-[#f3f4f7] dark:bg-[#0f0f1a] [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section className="relative bg-white dark:bg-slate-900 dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-[#02a6a6] dark:text-[#02cfc3]">
            <Wifi className="h-8 w-8" />
          </div>

          <h2
            className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Save time,{" "}
            <span className="relative inline-block">
              rent online
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Publish products, let customers select dates, validate availability,
            and confirm rental requests directly through your website.
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.12)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div className="bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-5">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop"
                  alt="Rental workspace"
                  className="h-64 w-full rounded-lg object-cover"
                />
              </div>

              <div className="p-6 text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 dark:text-white">
                  Working Space
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">
                  Select available dates
                </p>

                <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
                  {Array.from({ length: 35 }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex h-8 items-center justify-center rounded-md ${
                        [10, 11, 12, 18, 19].includes(index)
                          ? "bg-[#714b67] text-white dark:bg-[#8a5a7e]"
                          : "bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-400"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <button className="mt-6 rounded-md bg-[#714b67] px-5 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
                  Book now
                </button>
              </div>
            </div>

            <div className="bg-[#171824] dark:bg-[#0a0a14] px-6 py-5 text-left text-white">
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

      <section className="relative bg-white dark:bg-slate-900 dark:bg-slate-950 py-20">
        <div className="absolute left-0 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-r-full bg-[#f3f4f7] dark:bg-[#0f0f1a] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="mt-2 h-3 w-20 rounded bg-slate-100 dark:bg-slate-700/50" />
                </div>
                <div className="rounded-md bg-[#714b67] px-4 py-2 text-xs font-bold text-white hover:bg-[#5f3d56] transition dark:bg-[#8a5a7e] dark:hover:bg-[#7a4a6e]">
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
                    className="flex items-center justify-between rounded-md bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      {label}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Time is money...
              <br />
              literally
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Automate quotations, invoices, confirmations, and follow-ups so
              your team spends less time on repetitive tasks and more time
              serving customers.
            </p>

            <div className="mt-10 flex items-center gap-4 text-slate-300 dark:text-slate-600 dark:text-slate-300">
              <div className="h-px w-20 border-t border-dashed border-slate-300 dark:border-slate-700" />
              <ArrowDown className="h-8 w-8 rotate-[-25deg]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 dark:bg-slate-950 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Signature requests
              <br />
              on request
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              Upload rental agreements, insurance forms, contracts, and waiver
              documents. Request customer signatures digitally before every
              rental starts.
            </p>
          </div>

          <div className="relative">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-400 shadow-sm">
                Quotation → Agreement → Signature → Confirmed
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
              <div className="border-b border-slate-100 dark:border-slate-700 dark:border-slate-800 pb-3">
                <div className="h-4 w-24 rounded bg-[#714b67] dark:bg-[#8a5a7e]" />
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="h-5 w-48 rounded bg-slate-800 dark:bg-slate-600" />
                  <div className="mt-3 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-11/12 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-2 h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="mt-6 flex justify-end">
                    <div
                      className="text-2xl text-[#714b67] dark:text-[#9b6a8f]"
                      style={{ fontFamily: handwrittenFont }}
                    >
                      Signed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-950/50 text-[#02a6a6] dark:text-[#02cfc3]">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            Automate your{" "}
            <span className="relative inline-block text-[#f59e0b] dark:text-[#fbbf24]">
              to-do-list
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#f59e0b]/20 dark:bg-[#fbbf24]/30" />
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            From pickup to return, Adon can automatically create tasks for your
            team so nothing gets missed.
          </p>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[0_25px_70px_rgba(15,23,42,0.10)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="grid gap-3 text-left">
              {[
                ["Prepare product", "High", "Today", "Ready"],
                ["Send agreement", "Medium", "Today", "In progress"],
                ["Confirm payment", "High", "Tomorrow", "Waiting"],
                ["Schedule pickup", "Low", "Friday", "Planned"],
              ].map(([task, priority, date, status]) => (
                <div
                  key={task}
                  className="grid grid-cols-4 items-center rounded-lg bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 px-4 py-3 text-xs"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-100 dark:text-white">
                    {task}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {priority}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {date}
                  </span>
                  <span className="rounded-full bg-white dark:bg-slate-900 dark:bg-slate-700 px-3 py-1 text-center font-bold text-[#714b67] dark:text-[#9b6a8f]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="rounded-t-[4rem] bg-[#f3f4f7] dark:bg-[#0f0f1a] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            All the{" "}
            <span className="relative inline-block text-[#02a6a6] dark:text-[#02cfc3]">
              features
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#02a6a6]/20 dark:bg-[#02cfc3]/30" />
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
                  className="rounded-xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eff6] dark:bg-[#2a1a24] text-[#714b67] dark:text-[#9b6a8f]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 dark:bg-slate-950 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
            style={{ fontFamily: handwrittenFont }}
          >
            One{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-900">
              need
            </HandUnderline>
            , one{" "}
            <HandUnderline color="bg-sky-400 dark:bg-sky-900">
              app
            </HandUnderline>
            .
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Expand as you grow with integrated apps that work together.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => {
              const Icon = app.icon;

              return (
                <div
                  key={app.title}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 dark:bg-slate-800/50 p-5 transition hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-[#02a6a6] dark:text-[#02cfc3] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">
                      {app.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="#"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67] dark:text-[#9b6a8f] hover:underline"
          >
            See all apps <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white dark:bg-slate-900 dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative mx-auto min-h-90">
            {avatars.map((avatar, index) => (
              <img
                key={avatar}
                src={avatar}
                alt="User avatar"
                className="absolute h-14 w-14 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
                style={{
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${20 + ((index * 29) % 62)}%`,
                }}
              />
            ))}

            {Array.from({ length: 14 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800"
                style={{
                  left: `${5 + ((index * 13) % 88)}%`,
                  top: `${10 + ((index * 23) % 74)}%`,
                }}
              />
            ))}

            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={index}
                className="absolute h-12 w-12 rounded-md bg-[#714b67] dark:bg-[#9b6a8f]"
                style={{
                  left: `${6 + ((index * 19) % 86)}%`,
                  top: `${12 + ((index * 31) % 78)}%`,
                }}
              />
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white/90 dark:bg-slate-900/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur">
              <p
                className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 dark:text-white"
                style={{ fontFamily: handwrittenFont }}
              >
                Join 15 million users
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                who grow their business with Adon
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-[#f7f7fa] dark:bg-slate-800/50 p-8 text-left shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="text-5xl text-amber-400 dark:text-amber-500">
                “
              </div>
              <div>
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200 dark:text-slate-300">
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
                    <p className="font-bold text-slate-900 dark:text-slate-100 dark:text-white">
                      Marc Robinson
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-400">
                      Rental manager
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="start" className="mt-20 text-center">
            <div className="mx-auto mb-4 flex justify-center text-amber-400 dark:text-amber-500">
              <Sparkles className="h-12 w-12" />
            </div>

            <h2
              className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 dark:text-white sm:text-5xl"
              style={{ fontFamily: handwrittenFont }}
            >
              Unleash
              <br />
              your growth potential
            </h2>

            <Link
              href="/pricing"
              className="mt-8 inline-flex rounded-md bg-[#714b67] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-0.5 hover:bg-[#5f3d56] dark:shadow-[#714b67]/40"
            >
              Start now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

