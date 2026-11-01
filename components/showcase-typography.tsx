import type { ReactNode } from "react";

type ShowcaseHeadingProps = {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
};

export function ShowcaseHeading({
  as: Heading = "h2",
  children,
  className = "",
}: ShowcaseHeadingProps) {
  return (
    <Heading className={`showcase-heading ${className}`}>{children}</Heading>
  );
}

export function ShowcaseHighlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`showcase-heading-highlight ${className}`}>
      {children}
    </span>
  );
}
