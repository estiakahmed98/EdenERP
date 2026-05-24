import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

// Note: Metadata generation for dynamic locales would typically be handled in layout.tsx or using generateMetadata.
// For a static page like this, we'll keep it simple. In a real app, you'd use generateMetadata with params.
export const metadata: Metadata = {
  title: "Book Store | AdonERP Industries",
  description:
    "A bookstore industry landing page for AdonERP with point of sale, inventory, and retail workflow sections.",
};

// Helper component to get icon by name (since icons can't be stored directly in JSON)
const getIconComponent = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    ShoppingBag,
    ReceiptText,
    Library,
    BookOpen,
    Sparkles,
    Mail,
    SmilePlus,
    BadgeCheck,
    Barcode,
    Users,
  };
  return icons[iconName] || BookOpen;
};

const featuresList = [
  { key: "reporting", titleKey: "Reporting", descKey: "Track your sales trends, bestsellers, and stock performance in one place." },
  { key: "cashiers", titleKey: "Multiple cashiers", descKey: "Assign secure cashier profiles with badges or PINs for every shift." },
  { key: "loyalty", titleKey: "Loyalty programs", descKey: "Reward returning readers with points, tiered perks, and member pricing." },
  { key: "consignment", titleKey: "Sell consignment products", descKey: "Receive, store, and settle consignment books with clear partner visibility." },
  { key: "giftcards", titleKey: "Gift cards", descKey: "Create, top up, and redeem physical or digital gift cards in seconds." },
  { key: "pricelists", titleKey: "Pricelists", descKey: "Set flexible pricing by customer type, channel, event, or campaign." },
];

const appsList = [
  { key: "pos", titleKey: "Point of Sale", subtitleKey: "Ring up orders at checkout", icon: "ShoppingBag" },
  { key: "invoicing", titleKey: "Invoicing", subtitleKey: "Create and follow invoices", icon: "ReceiptText" },
  { key: "purchase", titleKey: "Purchase", subtitleKey: "Restock from suppliers faster", icon: "Library" },
  { key: "inventory", titleKey: "Inventory", subtitleKey: "Keep every shelf in sync", icon: "BookOpen" },
  { key: "ecommerce", titleKey: "eCommerce", subtitleKey: "Sell books online too", icon: "Sparkles" },
  { key: "email", titleKey: "Email Marketing", subtitleKey: "Launch reader campaigns", icon: "Mail" },
];

// Helper component for the script heading
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
  iconName,
  labelKey,
  t,
}: {
  iconName: string;
  labelKey: string;
  t: any;
}) {
  const IconComponent = getIconComponent(iconName);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20">
      <span className="text-primary">
        <IconComponent className="h-4 w-4" />
      </span>
      {t(labelKey)}
    </div>
  );
}

export default function BookStorePage() {
  const t = useTranslations("pages.bookstore");

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              iconName={t("hero.eyebrowIcon")}
              labelKey="hero.eyebrowLabel"
              t={t}
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                {t("hero.industriesLabel")}
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.preHeading")}
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  {t("hero.title")}
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                {t("hero.startButton")}
              </Link>
              <Link
                href="#advisor"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
              >
                {t("hero.advisorButton")}
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div className="mb-4 text-4xl leading-none text-primary">"</div>
              <p className="text-base leading-7 text-card-foreground">
                {t("hero.testimonialQuote")}
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">{t("hero.testimonialName")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("hero.testimonialRole")}
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
                            "bg-rose-300/70",
                            "bg-amber-300/70",
                            "bg-sky-300/70",
                            "bg-emerald-300/70",
                            "bg-fuchsia-300/70",
                            "bg-orange-300/70",
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
                  <CirclePlay className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POS Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            iconName={t("posSection.eyebrowIcon")}
            labelKey="posSection.eyebrowLabel"
            t={t}
          />
        </div>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <ScriptHeading>
            {t("posSection.title")}
            <br />
            {t("posSection.subtitle")}
          </ScriptHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-[2.2rem] border border-border bg-card p-4 shadow-[0_35px_90px_rgba(0,0,0,0.12)] sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[0.85fr_0.65fr_1.25fr]">
              <div className="rounded-[1.5rem] bg-muted/30 p-4">
                <div className="space-y-3">
                  {[
                    [t("posSection.demo.cartItems.harryPotter"), "$24.00"],
                    [t("posSection.demo.cartItems.atomicHabits"), "$18.50"],
                    [t("posSection.demo.cartItems.giftCard"), "$30.00"],
                    [t("posSection.demo.cartItems.bookmark"), "$4.50"],
                  ].map(([title, value]) => (
                    <div
                      key={title as string}
                      className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm"
                    >
                      <span className="font-medium text-foreground">{title}</span>
                      <span className="text-sm text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-primary px-4 py-4 text-primary-foreground">
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>{t("posSection.demo.subtotal")}</span>
                    <span>$77.00</span>
                  </div>
                  <div className="mt-3 text-2xl font-semibold">$82.39</div>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-primary/5 p-4">
                <div className="grid grid-cols-3 gap-2">
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "%", "0", t("posSection.demo.keypad.pay")].map(
                    (key) => (
                      <div
                        key={key}
                        className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold ${
                          key === t("posSection.demo.keypad.pay")
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-foreground shadow-sm"
                        }`}
                      >
                        {key}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-muted/30 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t("posSection.demo.booksTab")}
                  </span>
                  <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                    24 {t("posSection.demo.itemsCount")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    t("posSection.demo.categories.atomicHabits"),
                    t("posSection.demo.categories.dune"),
                    t("posSection.demo.categories.giftCards"),
                    t("posSection.demo.categories.sapiens"),
                    t("posSection.demo.categories.literaryFiction"),
                    t("posSection.demo.categories.children"),
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="overflow-hidden rounded-[1.3rem] bg-card shadow-sm"
                    >
                      <div
                        className={`h-24 ${
                          [
                            "bg-gradient-to-br from-orange-200/70 to-rose-300/70",
                            "bg-gradient-to-br from-sky-200/70 to-indigo-300/70",
                            "bg-gradient-to-br from-amber-200/70 to-yellow-300/70",
                            "bg-gradient-to-br from-violet-200/70 to-fuchsia-300/70",
                            "bg-gradient-to-br from-emerald-200/70 to-teal-300/70",
                            "bg-gradient-to-br from-pink-200/70 to-rose-200/70",
                          ][index]
                        }`}
                      />
                      <div className="space-y-1 p-3">
                        <p className="text-sm font-semibold text-foreground">{item}</p>
                        <p className="text-xs text-muted-foreground">{t("posSection.demo.tapToAdd")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 flex max-w-fit items-center gap-3 rounded-full border border-border bg-card px-5 py-2 shadow-lg shadow-black/5">
            <div className="h-7 w-7 rounded-full bg-muted" />
            <span className="text-sm text-muted-foreground">
              {t("posSection.demo.footerMessage")}
            </span>
          </div>
        </div>
      </section>

      {/* Scan Section */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="space-y-5 self-center">
          <div className="flex items-center gap-3 text-foreground">
            <Barcode className="h-10 w-10 text-primary" />
            <div className="h-1 w-24 rounded-full bg-primary/50" />
          </div>
          <ScriptHeading className="text-3xl sm:text-4xl">
            {t("scanSection.title")}
          </ScriptHeading>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            {t("scanSection.description")}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-x-12 bottom-0 top-10 rounded-full bg-muted" />
          <div className="relative rounded-[2rem] border border-border bg-card p-6 shadow-[0_35px_80px_rgba(0,0,0,0.1)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  {t("scanSection.demo.inventoryBadge")}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-foreground">
                  Harry Potter and the Philosopher&apos;s Stone
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t("scanSection.demo.inStock")}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                [t("scanSection.demo.fields.author"), "J.K. Rowling"],
                [t("scanSection.demo.fields.isbn"), "9780747532699"],
                [t("scanSection.demo.fields.category"), "Fantasy / Children"],
                [t("scanSection.demo.fields.onHand"), "18 units"],
                [t("scanSection.demo.fields.publisher"), "Bloomsbury"],
                [t("scanSection.demo.fields.location"), "Shelf A3"],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl bg-muted/30 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-2 font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <SectionEyebrow
            iconName={t("inventorySection.eyebrowIcon")}
            labelKey="inventorySection.eyebrowLabel"
            t={t}
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <ScriptHeading>{t("inventorySection.title")}</ScriptHeading>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              {t("inventorySection.description")}
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute inset-x-14 top-8 h-72 rounded-full bg-muted" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_35px_90px_rgba(0,0,0,0.12)]">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 border-b border-border bg-muted/30 px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {t.raw("inventorySection.table.headers").map((header: string) => (
                <span key={header}>{header}</span>
              ))}
            </div>
            <div className="divide-y divide-border">
              {t.raw("inventorySection.table.rows").map((row: any, rowIndex: number) => (
                <div
                  key={row.product}
                  className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.6fr_0.6fr_0.7fr] gap-2 px-6 py-4 text-sm text-foreground"
                >
                  <div className="font-semibold text-foreground">{row.product}</div>
                  <div>{row.location}</div>
                  <div>{row.onHand}</div>
                  <div>{row.forecast}</div>
                  <div>{row.min}</div>
                  <div
                    className={`inline-flex max-w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      rowIndex === 0
                        ? "bg-destructive/20 text-destructive"
                        : rowIndex === 2
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-accent/20 text-accent-foreground"
                    }`}
                  >
                    {row.status}
                  </div>
                </div>
              ))}
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
              {t("featuresSection.title")}
              <br />
              {t("featuresSection.subtitle")}
            </ScriptHeading>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              {t("featuresSection.description")}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.raw("featuresSection.list").map((feature: any) => (
              <div
                key={feature.title}
                className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm"
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
            {t("appsSection.title")}{" "}
            <HandUnderline color="bg-primary">{t("appsSection.titleHighlight")}</HandUnderline>
            , {t("appsSection.titleMiddle")}{" "}
            <HandUnderline color="bg-primary">{t("appsSection.titleHighlight2")}</HandUnderline>.
          </ScriptHeading>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            {t("appsSection.description")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.raw("appsSection.apps").map((app: any) => {
            const IconComponent = getIconComponent(app.icon);
            return (
              <div
                key={app.title}
                className="group rounded-[1.6rem] border border-border bg-card px-5 py-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <IconComponent className="h-6 w-6" />
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
          {t("appsSection.seeAllLink")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-background via-primary/5 to-muted px-6 py-16 shadow-[0_35px_90px_rgba(0,0,0,0.08)] sm:px-10">
          <div className="absolute inset-0 opacity-50">
            {[
              { name: "Laila", top: "4%", left: "17%" },
              { name: "Harrison", top: "12%", left: "68%" },
              { name: "Nadia", top: "32%", left: "7%" },
              { name: "Andre", top: "36%", left: "84%" },
              { name: "Mina", top: "62%", left: "18%" },
              { name: "Omar", top: "70%", left: "76%" },
              { name: "Jules", top: "80%", left: "39%" },
              { name: "Iris", top: "18%", left: "42%" },
            ].map((person, index) => (
              <div
                key={person.name}
                className={`absolute h-14 w-14 overflow-hidden rounded-full border-4 border-background shadow-lg ${
                  index % 3 === 0
                    ? "bg-primary/20"
                    : index % 3 === 1
                      ? "bg-secondary/20"
                      : "bg-accent/20"
                }`}
                style={{ top: person.top, left: person.left }}
              >
                <div className="h-full w-full bg-muted" />
              </div>
            ))}
          </div>

          <div className="relative mx-auto max-w-xl rounded-[2.5rem] bg-card/85 px-8 py-10 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Users className="h-7 w-7" />
            </div>
            <ScriptHeading className="mt-6 text-3xl sm:text-4xl">
              {t("ctaSection.title")}
            </ScriptHeading>
            <p className="mt-3 text-base text-muted-foreground">
              {t("ctaSection.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section
        id="get-started"
        className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-2xl">
          <SectionEyebrow
            iconName={t("footerCta.eyebrowIcon")}
            labelKey="footerCta.eyebrowLabel"
            t={t}
          />
          <div className="mt-8">
            <ScriptHeading>
              {t("footerCta.title")}
              <br />
              {t("footerCta.subtitle")}
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            {t("footerCta.description")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              {t("footerCta.button")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}