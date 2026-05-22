"use client";

import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Calendar,
  Check,
  Clock,
  Video,
  Building,
  Briefcase,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Send,
} from "lucide-react";

const offices = [
  {
    country: "Bangladesh",
    city: "Dhaka",
    tags: ["Sales", "Services", "Support"],
    address: [
      "Tower 71, Flat # 9 A-B, 516/3 South Manikdi",
      "Matikata Road, ECB Chattar",
      "Dhaka Cantonment, Dhaka - 1206",
    ],
    phone: "+880 1700 000000",
    email: "bd@adon-erp.com",
  },
];

const contacts = [
  { title: "Meet an advisor", icon: "👋", color: "from-purple-500 to-indigo-500" },
  { title: "Request developments", icon: "⚙️", color: "from-blue-500 to-cyan-500" },
  { title: "Become a partner", icon: "🤝", color: "from-green-500 to-emerald-500" },
  { title: "Report a bug", icon: "🐛", color: "from-orange-500 to-red-500" },
];

const emergencyLines = [
  { label: "Bangladesh", number: "+880 1700 000000" },
  { label: "Support", number: "+880 1800 000000" },
  { label: "Office", number: "+880 1900 000000" },
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
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
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
    <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm ring-1 ring-purple-100">
      <span className="text-purple-500">{icon}</span>
      {label}
    </div>
  );
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf5ff_18%,_#f4f4f4_100%)] font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(147,51,234,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%)]" />
        
        {/* Decorative blob */}
        <div className="absolute left-0 top-32 -z-5 h-[420px] w-[120%] rounded-full bg-purple-50/50" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<HelpCircle className="h-4 w-4" />}
              label="We're here to help"
            />
            <ScriptHeading className="mt-4">Need help?</ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Get support from our team of experts. We're available 24/7 to assist you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ask Adon ERP AI..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-lg outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                />
              </div>
              <span className="text-center text-slate-400">or</span>
              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-purple-700 px-8 font-semibold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800">
                <MessageCircle className="h-5 w-5" />
                Ask a Human
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <ScriptHeading>Contact us</ScriptHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Choose the best way to reach out to our team
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Contact Buttons - Left */}
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            {contacts.map((item) => (
              <button
                key={item.title}
                className="group flex h-28 items-center justify-center gap-3 rounded-2xl bg-white text-xl font-bold text-purple-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                <span className="text-2xl">{item.icon}</span>
                {item.title}
                <ArrowRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Emergency Lines - Right */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <Phone className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Emergency Lines</h3>
            </div>

            <div className="mt-6 space-y-4">
              {emergencyLines.map((line) => (
                <div key={line.label} className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-slate-600" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {line.label}
                  </span>
                  <a
                    href={`tel:${line.number}`}
                    className="font-bold text-purple-700 hover:underline"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {line.number}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-purple-50 p-4 text-center">
              <p className="text-sm text-slate-600">24/7 support available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="bg-[#f4f4f4] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScriptHeading>
              Adon ERP <span className="text-purple-700">Offices</span>
            </ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Visit us at our headquarters or contact our regional offices
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.country}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{office.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Adon ERP Office</h3>
                    <p className="text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                      {office.city}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {office.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Address */}
                <div className="mt-6 space-y-2">
                  {office.address.map((line) => (
                    <p key={line} className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                      <span>{line}</span>
                    </p>
                  ))}
                </div>

                {/* Phone & Email */}
                <div className="mt-6 space-y-2">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {office.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>4.9/5 from 500+ reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Users className="h-4 w-4 text-purple-500" />
            <span>15M+ happy users</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Clock className="h-4 w-4 text-purple-500" />
            <span>24/7 support</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <MessageCircle className="h-4 w-4 text-purple-500" />
            <span>Average response: 2min</span>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-10 text-center text-white">
          <h2 className="text-3xl font-bold">Still have questions?</h2>
          <p className="mx-auto mt-2 max-w-xl text-purple-100">
            Our team is ready to help you with any questions about adon ERP.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:shadow-lg">
            Start a Live Chat
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </section>
    </main>
  );
}