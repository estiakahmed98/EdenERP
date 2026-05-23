import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Calendar,
  CreditCard,
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
  Wrench,
} from "lucide-react";
import { HandUnderline } from "@/components/ui/headunderline";

export const metadata: Metadata = {
  title: "Furniture Store | AdonERP Industries",
  description:
    "A furniture store industry landing page for AdonERP with point of sale, inventory, eCommerce, and custom order management.",
};

const features = [
  {
    title: "Easy invoicing",
    description: "Create professional invoices in seconds and track payments effortlessly.",
  },
  {
    title: "Loyalty programs",
    description: "Reward returning customers with points, tiered perks, and exclusive discounts.",
  },
  {
    title: "Quotation builder",
    description: "Generate custom quotes for B2B clients and convert them to orders instantly.",
  },
  {
    title: "Free domain name",
    description: "Launch your online store with a professional domain included.",
  },
  {
    title: "Shipping connectors",
    description: "Integrate with major carriers for seamless delivery management.",
  },
  {
    title: "Integrated reporting",
    description: "Track sales trends, inventory turnover, and profitability in real-time.",
  },
];

const apps = [
  { title: "Point of Sale", subtitle: "Fast in-store checkout", icon: ShoppingBag },
  { title: "eCommerce", subtitle: "Sell furniture online", icon: ShoppingCart },
  { title: "CRM", subtitle: "Manage customer relationships", icon: Users },
  { title: "Invoicing", subtitle: "Professional billing", icon: ReceiptText },
  { title: "Purchase", subtitle: "Smart supplier orders", icon: Package },
  { title: "Inventory", subtitle: "Real-time stock tracking", icon: Box },
];

const testimonials = [
  {
    name: "Ville Kurvato",
    role: "COO, Nordic Home",
    content:
      "AdonERP has been nothing but a good thing for us. From custom furniture orders to B2B quotations, it has worked really well for our growing business.",
    rating: 5,
  },
  {
    name: "Elena Marchetti",
    role: "Owner, Modern Living",
    content:
      "The ability to handle both B2B and B2C sales through a single platform is game-changing. Our team manages everything from one place.",
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
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

export default function FurnitureStorePage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<Home className="h-4 w-4" />}
              label="Furniture industry template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Furniture Store
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  The #1 software for
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  Furniture Stores
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                With its ability to handle everything from eCommerce and Point
                of Sale transactions to custom furniture orders, AdonERP is a
                complete solution for managing your B2B and B2C sales.
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
                AdonERP has been nothing but a good thing for us. From custom
                furniture orders to B2B quotations, it has worked really well
                for our growing business.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Ville Kurvato</p>
                  <p className="text-sm text-muted-foreground">COO, Nordic Home</p>
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
                            "bg-amber-300/70",
                            "bg-orange-300/70",
                            "bg-sky-300/70",
                            "bg-emerald-300/70",
                            "bg-fuchsia-300/70",
                            "bg-rose-300/70",
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

      {/* All-in-one eCommerce Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Complete eCommerce solution"
            />
          </div>
          <div className="mx-auto mt-8 max-w-4xl text-center">
            <ScriptHeading>
              All-in-one eCommerce
              <br />
              for furniture retailers
            </ScriptHeading>
          </div>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-card p-5 shadow-xl">
              <div className="mb-4 h-10 rounded-xl bg-muted" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 to-muted"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4 rounded-2xl bg-card border border-border p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  🛋️
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Flexible products</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Offer your customers different sizes, colors, and materials
                    in your online store.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-card border border-border p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  💰
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Pricelists</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage your B2B and B2C sales through a single website with
                    flexible pricing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-card border border-border p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  📝
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Custom forms</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create custom forms for your website. Customers can request
                    quotes directly online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-store Checkout Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionEyebrow
            icon={<ShoppingBag className="h-4 w-4" />}
            label="Point of sale"
          />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <ScriptHeading>
            In-store check out
            <br />
            made simple
          </ScriptHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-border bg-card p-4 shadow-[0_35px_90px_rgba(0,0,0,0.12)] sm:p-6">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 to-muted"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-8 text-left md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-3 text-3xl">📦</div>
            <h3 className="text-lg font-bold text-foreground">Product kits</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Bundle sets of furniture together and sell entire rooms at once.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-3 text-3xl">🚚</div>
            <h3 className="text-lg font-bold text-foreground">Pay now, ship later!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Automatically generate delivery orders from the point of sale.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
            <h3 className="font-bold text-foreground">Kitchen Josh</h3>
            <div className="mt-4 space-y-2">
              <div className="h-3 rounded-full bg-muted" />
              <div className="h-3 rounded-full bg-muted w-5/6" />
              <div className="h-3 rounded-full bg-muted w-2/3" />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
            <h3 className="font-bold text-foreground">Invoice #F-2024</h3>
            <div className="mt-4 space-y-2">
              <div className="h-3 rounded-full bg-muted" />
              <div className="h-3 rounded-full bg-muted w-3/4" />
              <div className="h-3 rounded-full bg-muted w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 text-5xl">🧾</div>
            <ScriptHeading>
              Custom order?
              <br />
              No problem!
            </ScriptHeading>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              Smart sourcing automatically places purchase orders based on your
              sales of custom products. Made-to-order custom items are tracked
              from quotation to manufacturing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Wrench className="h-4 w-4" />
                Made-to-order
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Truck className="h-4 w-4" />
                Smart sourcing
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20" />
              <div className="h-4 w-32 rounded-full bg-muted" />
            </div>
            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-primary/10" />
              <div className="h-12 rounded-xl bg-muted" />
              <div className="h-12 rounded-xl bg-muted" />
              <div className="h-12 rounded-xl bg-accent/20" />
            </div>
            <div className="mt-4 flex justify-end">
              <div className="h-8 w-24 rounded-lg bg-primary" />
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
              Powerful tools designed to simplify furniture retail operations,
              from custom orders to multi-channel sales.
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
            One <HandUnderline color="bg-primary">need</HandUnderline>, one{" "}
            <HandUnderline color="bg-primary">app</HandUnderline>.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
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
              furniture retailers.
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
            label="Ready to scale your store"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a furniture store workflow that helps your team sell faster,
            manage custom orders, and scale from one showroom to many.
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