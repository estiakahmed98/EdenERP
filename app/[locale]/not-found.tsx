import { ArrowLeft, Home, Search, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { HandUnderline } from "@/components/ui/headunderline";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-20 text-slate-900">
      <div className="absolute left-0 top-0 z-0 h-72 w-72 rounded-full bg-[#02cfc3]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-[#714b67]/10 blur-3xl" />

      <div className="absolute left-1/2 top-0 z-0 h-72 w-full -translate-x-1/2 bg-[#f3f4f7] [clip-path:polygon(0_0,100%_0,100%_45%,0_100%)]" />

      <section className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="absolute -left-10 -top-10 hidden text-rose-400 sm:block">
          <Sparkles className="h-12 w-12 rotate-[-20deg]" />
        </div>

        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-4xl bg-white shadow-[0_25px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
          <span
            className="text-5xl font-black text-[#714b67]"
            style={{
              fontFamily:
                '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
            }}
          >
            404
          </span>
        </div>

        <h1
          className="text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          style={{
            fontFamily:
              '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
          }}
        >
          Oops! This page got{" "}
          <HandUnderline color="bg-[#02cfc3]">
            <span className="text-[#02a6a6]">lost</span>
          </HandUnderline>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          The page you are looking for does not exist, was moved, or the link is
          broken. Let&apos;s get you back to the right place.
        </p>

        <div className="relative mx-auto mt-12 max-w-2xl rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <div className="absolute -left-8 top-8 hidden h-20 w-32 rotate-[-14deg] rounded-[35%] bg-[#02cfc3] sm:block" />

          <div className="relative z-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/"
              className="group flex items-center justify-center gap-3 rounded-xl bg-[#714b67] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#714b67]/20 transition hover:-translate-y-1 hover:bg-[#5f3d56]"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>

            <Link
              href="/help"
              className="group flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 transition hover:-translate-y-1 hover:border-[#714b67]/30 hover:text-[#714b67]"
            >
              <Search className="h-5 w-5" />
              Need Help?
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#714b67]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to homepage
        </Link>
      </section>
    </main>
  );
}
