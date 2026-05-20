"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const scriptFont = {
  fontFamily: '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
};

export default function RentalPage() {
  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#fffcf7_18%,_#ffffff_100%)] text-slate-800">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-100">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Sales app
        </div>

        <h1
          className="mt-6 text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl"
          style={scriptFont}
        >
          Rental
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          This page is a placeholder for the Rental app landing. If you want,
          I can style it like the other Sales pages (CRM, POS, Subscriptions)
          and add sections.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/apps"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
          >
            Explore apps
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/apps/sales"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-amber-300 hover:text-amber-700"
          >
            Back to Sales
          </Link>
        </div>
      </section>
    </main>
  );
}

