import type { ReactNode, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ManufacturingAction, ManufacturingDemoButton } from "../design-system";
import type {
  ManufacturingModuleContent,
  ManufacturingSlug,
} from "../module-content";
import css from "./heroes.module.css";

export type HeroSlug = ManufacturingSlug | "production-orders";
export type HeroCopy = Pick<
  ManufacturingModuleContent,
  "title" | "category" | "hero" | "description" | "callout"
>;
export type HeroProps = { copy: HeroCopy; target?: string };

export function Frame({
  copy,
  concept,
  className,
  children,
}: HeroProps & { concept: HeroSlug; className?: string; children: ReactNode }) {
  return (
    <section
      aria-label={`${copy.title} overview`}
      data-hero-concept={concept}
      className={cn(css.frame, className)}
    >
      <div className={css.shell}>
        <nav aria-label="Breadcrumb" className={css.breadcrumb}>
          <Link href="/apps/manufacturing">Manufacturing</Link>
          <ArrowRight size={12} aria-hidden="true" />
          <span aria-current="page">{copy.title}</span>
        </nav>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={css.eyebrow}>{children}</p>;
}
export function Title({
  copy,
  inline = false,
  className,
}: HeroProps & { inline?: boolean; className?: string }) {
  return (
    <h1 className={cn("showcase-heading", css.title, className)}>
      {copy.hero[0]}
      {inline ? " " : <br />}
      <span>{copy.hero[1]}</span>
    </h1>
  );
}
export function Description({ copy }: HeroProps) {
  return <p className={css.description}>{copy.description}</p>;
}
export function Actions({ target = "sample-workspace" }: { target?: string }) {
  return (
    <div className={css.actions}>
      <ManufacturingDemoButton />
      <ManufacturingAction href={`#${target}`} secondary>
        Explore the workspace
      </ManufacturingAction>
    </div>
  );
}
export function Diagram({
  label,
  children,
  ...props
}: SVGProps<SVGSVGElement> & { label: string }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 420 300"
      fill="none"
      className={css.diagram}
      {...props}
    >
      {children}
    </svg>
  );
}
export function Caption({ children }: { children: ReactNode }) {
  return <figcaption className={css.caption}>{children}</figcaption>;
}
export function MiniLabel({ children }: { children: ReactNode }) {
  return <span className={css.miniLabel}>{children}</span>;
}
export { css };
