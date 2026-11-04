"use client";

import React, { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky layer for stacked sections; the next layer slides over it.
 *  - A section that fits below the site header pins just under the header.
 *  - A taller one scrolls through fully first, then pins by its bottom edge,
 *    so none of its content is ever left unreachable.
 */
export default function StackedSection({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const header = document.querySelector("header")?.getBoundingClientRect();
      const headerH = header && header.top <= 0 ? Math.round(header.height) : 0;
      el.style.top = `${Math.min(headerH, window.innerHeight - el.offsetHeight)}px`;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky top-0",
        // Layers after the first cast a soft shadow onto the one they cover.
        index > 0 &&
          "rounded-t-[48px] shadow-[0_-28px_60px_-36px_rgba(15,23,42,0.35)]",
      )}
      style={{ zIndex: index + 1 }}
    >
      {children}
    </div>
  );
}
