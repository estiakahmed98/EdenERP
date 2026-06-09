import Link from "next/link";
import { ArrowRight, BookOpen, Building2, Shirt } from "lucide-react";

const industryCards = [
  {
    title: "Book Store",
    description:
      "A bookstore landing page inspired by your provided reference, adapted to AdonERP's shell.",
    href: "/industries/book-store",
    icon: BookOpen,
  },
  {
    title: "Furniture Store",
    description:
      "Placeholder route for a retail-focused furniture experience and catalog operations.",
    href: "/industries",
    icon: Building2,
  },
  {
    title: "Clothing Store",
    description:
      "Placeholder route for fashion inventory, seasonal launches, and omnichannel sales.",
    href: "/industries",
    icon: Shirt,
  },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,var(--primary)_14%,transparent),_transparent_36%),linear-gradient(180deg,_var(--background)_0%,_color-mix(in_oklab,var(--primary)_6%,var(--background))_100%)]" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex rounded-full border border-primary/20 bg-card/80 px-4 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur">
              Retail industry pages
            </span>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Industry-specific experiences for every kind of retail business.
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                The new bookstore page is ready under the industries route. It
                follows your reference layout while keeping the AdonERP header
                and footer already used across the project.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {industryCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-[0_20px_60px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklab,var(--primary)_18%,transparent),_transparent_42%),linear-gradient(135deg,_color-mix(in_oklab,var(--primary)_8%,var(--card)),_var(--card),_color-mix(in_oklab,var(--accent)_10%,var(--card)))]" />

                  <div className="relative space-y-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/80 shadow-sm backdrop-blur">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-semibold text-card-foreground">
                        {card.title}
                      </h2>

                      <p className="text-sm leading-7 text-muted-foreground">
                        {card.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Open page
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}