"use client";

import LiveDemoButton from "@/components/live-demo-button";

import { useEffect, useRef, type ReactNode } from "react";
import { Presentation } from "lucide-react";

import css from "./demo-preview.module.css";

/** A visual product teaser; booking uses the shared advisor destination. */
export default function DemoPreview({
  title,
  children,
  description = "Book a guided demo to explore the full workspace, records and production process.",
  invitation,
}: {
  title: string;
  children: ReactNode;
  description?: string;
  invitation?: { regionLabel: string; eyebrow: string; heading: string };
}) {
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = surface.current;
    if (!node) return;
    let frame = 0;
    function updateFocus() {
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      const cutoff = bounds.top + bounds.height / 2;
      node
        .querySelectorAll<HTMLElement>(
          "a, button, input, select, textarea, [tabindex], tr, [data-demo-row]",
        )
        .forEach((element) => {
          const hidden = element.getBoundingClientRect().top >= cutoff;
          if (hidden && !element.inert) {
            element.inert = true;
            element.dataset.demoInert = "true";
          } else if (!hidden && element.dataset.demoInert) {
            element.inert = false;
            delete element.dataset.demoInert;
          }
        });
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFocus);
    }
    const resize = new ResizeObserver(schedule);
    const mutation = new MutationObserver(schedule);
    resize.observe(node);
    mutation.observe(node, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    schedule();
    return () => {
      resize.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(frame);
      node
        .querySelectorAll<HTMLElement>("[data-demo-inert]")
        .forEach((element) => {
          element.inert = false;
          delete element.dataset.demoInert;
        });
    };
  }, []);

  return (
    <div
      className={css.preview}
      data-demo-preview="half-blurred"
      role="region"
      aria-label={
        invitation?.regionLabel ??
        `${title} preview with a lower-half demo invitation`
      }
    >
      <div ref={surface} className={css.surface}>
        {children}
      </div>
      <div className={css.blurredHalf} aria-hidden="true" />
      <div className={css.invitation}>
        <div className={css.bookingCard}>
          <span className={css.bookingIcon}>
            <Presentation size={21} aria-hidden="true" />
          </span>
          <p className={css.bookingEyebrow}>
            {invitation?.eyebrow ?? `${title} · Full walkthrough`}
          </p>
          <h3>{invitation?.heading ?? "See the complete workflow."}</h3>
          <p>{description}</p>
          <div className={css.bookingAction}>
            <LiveDemoButton />
          </div>
        </div>
      </div>
    </div>
  );
}
