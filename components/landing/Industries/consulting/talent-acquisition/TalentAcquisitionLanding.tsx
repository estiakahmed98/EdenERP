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
  FileText,
  Gift,
  Heart,
  Home,
  Hotel,
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
  Key,
  PenTool,
  FileSignature,
  Ruler,
  HardDrive,
  Hammer,
  ClipboardList,
  Warehouse,
  Shirt,
  Scissors,
  Factory,
  Wrench,
  Cog,
  Layers,
  Sofa,
  Armchair,
  Calculator,
  Briefcase,
  FileCheck,
  Megaphone,
  TrendingUp,
  BarChart,
  ClipboardCheck,
  MapPin,
  Smartphone,
  UserPlus,
  Target,
  Globe,
  Mail,
  Calendar as CalendarIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Talent Acquisition | AdonERP Industries",
  description:
    "A talent acquisition landing page for AdonERP with job posting, candidate tracking, interview scheduling, and document management.",
};

const features = [
  {
    title: "Stay on target",
    description: "Track recruitment metrics and hiring goals in real-time.",
  },
  {
    title: "Personalized website",
    description: "Create custom career pages that reflect your employer brand.",
  },
  {
    title: "Mobile friendly",
    description: "Candidates can apply from any device, anywhere.",
  },
  {
    title: "Make the most of your time",
    description: "Automate repetitive tasks and focus on interviewing.",
  },
  {
    title: "Professional communication",
    description: "Send automated updates and personalized messages to candidates.",
  },
  {
    title: "Automated data importing",
    description: "Import candidate data from job boards and career sites automatically.",
  },
];

const apps = [
  { title: "Online Jobs", subtitle: "Job posting management", icon: Briefcase },
  { title: "Invoicing", subtitle: "Recruitment billing", icon: ReceiptText },
  { title: "Employees Referral", subtitle: "Referral program tracking", icon: UserPlus },
  { title: "Employees", subtitle: "HR and staff management", icon: Users },
  { title: "Documents", subtitle: "Candidate file storage", icon: FileText },
  { title: "Social Marketing", subtitle: "Job promotion", icon: Megaphone },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director, TalentFinders",
    content:
      "AdonERP saved us plenty of web development time, allowing us to focus on individual strengths which is immensely helpful for start-ups.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Recruitment Manager, Global Hire",
    content:
      "The automated pipeline and interview scheduling transformed our hiring process. We reduced time-to-hire by 60%.",
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

export default function TalentAcquisitionPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_15%_12%,rgba(139,92,246,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.06),transparent_24%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-xl space-y-8">
            <SectionEyebrow
              icon={<UserPlus className="h-4 w-4" />}
              label="HR & recruitment template"
            />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                Industries / Talent Acquisition
              </p>
              <div className="space-y-3">
                <p
                  className="text-2xl font-medium text-muted-foreground"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  All-in-one solution for successful
                </p>
                <h1
                  className="text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl"
                  style={{
                    fontFamily:
                      '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
                  }}
                >
                  ⭐ Talent Acquisition
                </h1>
              </div>
              <p className="max-w-lg text-lg leading-8 text-muted-foreground">
                AdonERP is a dedicated solution for talent acquisition, supporting every
                step from building job pages to managing candidates and hiring.
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
                AdonERP saved us plenty of web development time, allowing us to focus on
                individual strengths which is immensely helpful for start-ups.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="font-semibold text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">HR Director, TalentFinders</p>
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
                            "bg-blue-300/70",
                            "bg-sky-300/70",
                            "bg-cyan-300/70",
                            "bg-blue-300/70",
                            "bg-sky-300/70",
                            "bg-cyan-300/70",
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
                  <UserPlus className="h-10 w-10 fill-primary text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From your website to your pipeline Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          From your website to your{" "}
          <span className="underline decoration-primary underline-offset-8">
            pipeline
          </span>
        </ScriptHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
          Smart contact forms turn website visitors into applicants and push their
          information directly into your recruitment pipeline.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 text-left shadow-xl">
            <h3 className="mb-5 font-bold text-foreground">Apply Now</h3>
            <div className="space-y-3">
              <div className="h-10 rounded-xl bg-muted" />
              <div className="h-10 rounded-xl bg-muted" />
              <div className="h-24 rounded-xl bg-muted" />
              <div className="h-10 rounded-xl bg-primary" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 text-left shadow-xl">
            <h3 className="font-bold text-foreground">New Applicant</h3>
            <div className="mt-5 space-y-3">
              <div className="h-8 rounded-xl bg-muted" />
              <div className="h-8 rounded-xl bg-primary/20" />
              <div className="h-8 rounded-xl bg-accent/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Efficiently manage your talent pool Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScriptHeading>
            Efficiently manage your{" "}
            <span className="bg-accent/20 px-2 rounded">talent pool</span>
          </ScriptHeading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Track applications, candidates and documents in one place so your team
            can evaluate the right people faster.
          </p>

          <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="grid grid-cols-4 gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span>Name</span>
                <span>Position</span>
                <span>Stage</span>
                <span>Applied</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                ["Emma Watson", "Frontend Developer", "Screening", "May 15"],
                ["James Chen", "Product Manager", "Interview", "May 14"],
                ["Sophia Lee", "UX Designer", "New", "May 13"],
                ["Michael Brown", "Backend Engineer", "Technical Test", "May 12"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-4 gap-3 px-6 py-4 text-sm">
                  <span className="font-medium text-foreground">{row[0]}</span>
                  <span className="text-foreground">{row[1]}</span>
                  <span className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                    row[2] === "Screening" ? "bg-primary/20 text-primary" :
                    row[2] === "Interview" ? "bg-secondary/20 text-secondary-foreground" :
                    row[2] === "New" ? "bg-accent/20 text-accent-foreground" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>{row[2]}</span>
                  <span className="text-foreground">{row[3]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailor-made pipeline to fit your workflow Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-8 shadow-xl">
            <div className="h-4 rounded-full bg-muted w-3/4 mb-4" />
            <div className="h-4 rounded-full bg-muted w-1/2" />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="h-16 rounded-xl bg-muted/30" />
              <div className="h-16 rounded-xl bg-primary/20" />
              <div className="h-16 rounded-xl bg-accent/20" />
            </div>
          </div>

          <div>
            <div className="mb-4 text-5xl">🏆</div>
            <ScriptHeading>
              Tailor-made pipeline to
              <br />
              fit your workflow
            </ScriptHeading>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Candidates progress automatically through recruitment stages, while
              your team keeps full control of every step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Target className="h-4 w-4" />
                Automated stages
              </div>
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
                <Users className="h-4 w-4" />
                Team collaboration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Less scheduling, more interviewing Section */}
      <section className="bg-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <ScriptHeading>
                Less scheduling, more{" "}
                <span className="bg-secondary/20 px-2 rounded">interviewing!</span>
              </ScriptHeading>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Send interview links, sync calendars, and let candidates pick suitable
                interview slots without manual scheduling.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Calendar sync
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  Auto-reminders
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg ${
                      index === 17 || index === 18 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Never lose track of another document Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ScriptHeading>
          Never lose track of another document
        </ScriptHeading>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 rounded-2xl bg-muted/30 p-8 md:grid-cols-4">
          {["Resumes", "Cover Letters", "Portfolios", "Certificates"].map((doc, idx) => (
            <div key={doc} className="rounded-xl bg-card p-6 text-center shadow-sm">
              <div className="text-4xl mb-3">📄</div>
              <p className="font-semibold text-foreground">{doc}</p>
            </div>
          ))}
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
              Tools to streamline hiring, job pages, candidate tracking,
              interviews, documents and communication.
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
            Expand as you grow with connected apps for your recruitment process,
            candidate management, and HR operations.
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
              talent acquisition and recruitment.
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
            label="Ready to transform your hiring"
          />
          <div className="mt-8">
            <ScriptHeading>
              Unleash
              <br />
              your growth potential
            </ScriptHeading>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Launch a talent acquisition workflow that helps you attract top talent,
            streamline interviews, and build your dream team.
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