import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Link } from "@/i18n/navigation";

type HubLink = {
  label: string;
  href: string;
  description?: string;
};

type HubSection = {
  title: string;
  links: HubLink[];
};

type HubAction = {
  label: string;
  href: string;
};

type CommunityHubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  sections: HubSection[];
  primaryAction?: HubAction;
  secondaryAction?: HubAction;
};

export default function CommunityHubPage({
  eyebrow,
  title,
  description,
  highlights,
  sections,
  primaryAction,
  secondaryAction,
}: CommunityHubPageProps) {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_14%_16%,rgba(99,102,241,0.10),transparent_25%),radial-gradient(circle_at_85%_12%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.03),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                {description}
              </p>

              {(primaryAction || secondaryAction) && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {primaryAction ? (
                    <Link
                      href={primaryAction.href}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                    >
                      {primaryAction.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                  {secondaryAction ? (
                    <Link
                      href={secondaryAction.href}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors duration-300 hover:border-primary/30 hover:text-primary"
                    >
                      {secondaryAction.label}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-[0_35px_90px_rgba(2,8,23,0.10)] backdrop-blur-sm">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                What you can do here
              </p>
              <div className="mt-5 space-y-4">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded-2xl bg-muted/30 px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-muted-foreground">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold uppercase tracking-[0.16em] text-primary">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={`${section.title}:${link.href}`}
                    href={link.href}
                    className="block rounded-2xl border border-border/70 bg-background px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-foreground">
                        {link.label}
                      </p>
                      <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                    </div>
                    {link.description ? (
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {link.description}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
