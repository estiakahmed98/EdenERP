import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Barcode,
  Box,
  Building,
  Calendar,
  Clock,
  CreditCard,
  Gift,
  Heart,
  Home,
  Package,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Guest House | AdonERP Industries",
  description:
    "A guest house industry landing page for AdonERP with online booking management, room planning, invoicing, and guest operations.",
};

const features = [
  {
    title: "Online booking management",
    description: "Accept reservations directly from your website with real-time availability.",
  },
  {
    title: "Integrated sales and rental",
    description: "Sell additional services and manage room rentals from one platform.",
  },
  {
    title: "City tax",
    description: "Automatically calculate and apply local city taxes to guest invoices.",
  },
  {
    title: "Flexible invoicing",
    description: "Generate professional invoices for individuals and corporate clients.",
  },
  {
    title: "Streamlined planning",
    description: "Manage room availability, check-ins, and check-outs from a single calendar.",
  },
  {
    title: "Payment providers",
    description: "Accept multiple payment methods including cards and digital wallets.",
  },
];

const apps = [
  { title: "Sales", subtitle: "Manage bookings and reservations", icon: ShoppingCart },
  { title: "Invoicing", subtitle: "Professional guest billing", icon: ReceiptText },
  { title: "Rental", subtitle: "Room and equipment rental management", icon: Building },
  { title: "Website", subtitle: "Online booking website", icon: Home },
  { title: "Guest House", subtitle: "Complete guest management", icon: Users },
  { title: "Planning", subtitle: "Room and staff scheduling", icon: Calendar },
];

const testimonials = [
  {
    name: "Elena Martinez",
    role: "Owner, Seaside Guest House",
    content:
      "AdonERP helped us achieve our goals while expanding, reducing costs and improving productivity, invoicing, and decision-making thanks to data availability.",
    rating: 5,
  },
  {
    name: "Thomas Anderson",
    role: "Operations Manager, Mountain View Lodge",
    content:
      "The online booking system and planning tools transformed our guest house. We now manage everything from one dashboard, and our guests love the seamless experience.",
    rating: 5,
  },
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
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl ${className}`}
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
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

export default function GuestHousePage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Home className="h-4 w-4" />}
              label="Hospitality industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Guest House
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  All-in-one software for your
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Guest House
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                Capture attention with a stunning website, accept online bookings,
                manage availability, and take care of your guests from check-in to
                check-out with AdonERP.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Start now
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                Meet an advisor
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 text-4xl leading-none text-primary">"</div>
              <p className="text-base leading-7 text-card-foreground">
                AdonERP helped us achieve our goals while expanding, reducing costs and
                improving productivity, invoicing, and decision-making thanks to data
                availability.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Elena Martinez</p>
                  <p className="text-sm text-muted-foreground">Owner, Seaside Guest House</p>
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
            <div className="absolute -top-6 right-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-10 left-4 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative h-[25rem] w-[25rem] overflow-hidden rounded-full border-[14px] border-card bg-gradient-to-br from-muted to-background shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
              <div className="absolute inset-0">
                <div className="absolute left-10 right-10 top-10 bottom-14 rounded-[2rem] bg-primary/80 p-6 shadow-inner">
                  <div className="grid h-full grid-cols-5 gap-2">
                    {Array.from({ length: 40 }).map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-sm ${
                          [
                            "bg-teal-300/70",
                            "bg-cyan-300/70",
                            "bg-emerald-300/70",
                            "bg-green-300/70",
                            "bg-sky-300/70",
                            "bg-blue-300/70",
                          ][index % 6]
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-[2rem] rounded-b-lg bg-accent shadow-lg" />
                <div className="absolute bottom-14 left-[8.6rem] h-28 w-24 rounded-t-[2.4rem] rounded-b-[2rem] bg-secondary shadow-xl" />
                <div className="absolute bottom-12 left-[12.8rem] h-16 w-10 rounded-full bg-muted shadow-md" />
                <div className="absolute bottom-12 left-[14.2rem] h-16 w-10 rounded-full bg-muted shadow-md" />
                <div className="absolute bottom-[6.8rem] left-[13.4rem] h-12 w-10 rounded-full bg-muted/80 shadow-sm" />
                <div className="absolute bottom-24 left-[13.1rem] h-10 w-12 rounded-full bg-muted/80 shadow-sm" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/95 shadow-2xl">
                  <Home className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website ready for bookings Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ScriptHeading>
          Website ready for{" "}
          <span className="bg-primary/20 px-2 rounded">bookings</span>
        </ScriptHeading>

        <div className="mt-8 grid gap-6 text-base leading-7 text-muted-foreground md:grid-cols-2">
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            Create a website using AdonERP's AI-based builder. Showcase your rooms,
            add photos, drag and drop elements, and optimize your SEO.
          </div>
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
            List your availabilities, room details, rates, and allow clients to
            make reservations online.
          </div>
        </div>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_280px]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-5 h-8 rounded-xl bg-muted" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 to-muted"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl">
            <div className="mb-4 aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 to-muted" />
            <h3 className="font-bold text-foreground">Deluxe Room</h3>
            <p className="mt-1 text-sm text-muted-foreground">$150.00 / night</p>
            <div className="mt-3 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <button className="mt-4 w-full rounded-xl bg-secondary py-2 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Save time, maximize bookings Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1 rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-3">
                    <div className="h-8 rounded-xl bg-muted" />
                    <div className={`h-8 rounded-xl ${index % 2 === 0 ? "bg-primary/20" : "bg-secondary/20"}`} />
                    <div className={`h-8 rounded-xl ${index % 3 === 0 ? "bg-accent/20" : "bg-muted"}`} />
                    <div className={`h-8 rounded-xl ${index % 2 === 1 ? "bg-primary/20" : "bg-muted"}`} />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Room availability calendar • June 2026
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="mb-4 text-5xl">📅</div>
              <ScriptHeading>
                Save time,{" "}
                <span className="underline decoration-primary underline-offset-8">
                  maximize
                </span>
                <br />
                bookings
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Manage your planning, bookings, modifications, room upgrades, and
                additional services from one connected calendar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  Real-time availability
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Users className="h-4 w-4 text-primary" />
                  Guest management
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest-centric operations Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <ScriptHeading>
              Guest-centric
              <br />
              <span className="underline decoration-primary underline-offset-8">
                operations
              </span>
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Run smooth check-in and check-out, add optional services like
              breakfast or activities, and collect guest information when required.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Clock className="h-4 w-4" />
                Express check-in
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Utensils className="h-4 w-4" />
                Breakfast service
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-5 h-8 rounded-xl bg-muted" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-xl bg-muted/30 p-4">
                  <div className="mb-3 h-4 rounded-full bg-card" />
                  <div className="h-12 rounded-xl bg-gradient-to-br from-primary/10 to-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flexible invoicing Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <ScriptHeading>
                Flexible{" "}
                <span className="underline decoration-primary underline-offset-8">
                  invoicing
                </span>
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Generate professional invoices in one click and accept multiple
                payment methods. Perfect for corporate clients and direct bookings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Multiple payments
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <ReceiptText className="h-4 w-4 text-primary" />
                  Digital receipts
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
              <div className="mb-8 h-8 w-32 rounded-full bg-muted" />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 rounded-full bg-muted" />
                  <div className="h-4 w-16 rounded-full bg-muted" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-24 rounded-full bg-muted" />
                  <div className="h-4 w-12 rounded-full bg-muted" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 rounded-full bg-muted" />
                  <div className="h-4 w-14 rounded-full bg-muted" />
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 rounded-full bg-muted" />
                    <div className="h-5 w-20 rounded-full bg-primary/20" />
                  </div>
                </div>
                <div className="h-10 rounded-xl bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden rounded-t-[4rem] bg-muted/30 py-16 lg:py-24">
        <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.06),transparent_68%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <ScriptHeading>
              All the features
              <br />
              done right.
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Tools to manage bookings, rooms, payments, planning, and guest
              services all in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl space-y-4">
          <ScriptHeading>
            One need, one app.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Expand as you grow with connected apps for your guest house operation,
            booking management, and guest services.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const Icon = app.icon;

            return (
              <div
                key={app.title}
                className="group rounded-[1.6rem] border border-border bg-card px-5 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{app.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
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

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-card-foreground">
                "{testimonial.content}"
              </p>
              <div className="mt-6">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Banner */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-background via-primary/5 to-muted px-6 py-16 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-[10%] left-[5%] h-20 w-20 rounded-full bg-primary/20" />
            <div className="absolute bottom-[15%] right-[8%] h-24 w-24 rounded-full bg-secondary/20" />
            <div className="absolute top-[40%] right-[20%] h-16 w-16 rounded-full bg-accent/20" />
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-card/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              Join 15 million happy users
            </ScriptHeading>
            <p className="mt-3 text-base text-muted-foreground">
              who grow their business with AdonERP — the complete solution for
              guest houses and hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <SectionEyebrow
            icon={<Sparkles className="h-4 w-4" />}
            label="Ready to scale your property"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a guest house management workflow that helps you maximize bookings,
            streamline operations, and create memorable guest experiences.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Start now
            </Link>
          </div>
         
        </div>
      </section>
    </main>
  );
}