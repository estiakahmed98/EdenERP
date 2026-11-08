"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Check,
  CircleDot,
  Layers3,
  Lightbulb,
  LockKeyhole,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  HandText,
  ICON_TONES,
  SURFACE,
  SectionTag,
  plainTag,
} from "./landing-ui";

// Line icons replace the emoji in the translations; order matches `levelUp.stats`.
const STAT_ICONS: LucideIcon[] = [Zap, Lightbulb, LockKeyhole];

type LevelUpStat = {
  icon: string;
  value: string;
  label: string;
};

type WorkflowColumn = {
  title: string;
  color: string;
  items: string[];
};

type WorkflowBoard = {
  projectName: string;
  sprint: string;
  columns: WorkflowColumn[];
};

// Stage tones follow the theme tokens (the translation `color` values are pastel hex).
const STAGE_DOTS = ["bg-(--muted)", "bg-(--purple)", "bg-(--teal)"] as const;

function CompletionRing({ value }: { value: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative grid h-16 w-16 shrink-0 place-items-center"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label="Workflow completion"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--teal)"
          strokeLinecap="round"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <span className="relative font-body text-sm font-bold tabular-nums text-(--ink)">
        {value}%
      </span>
    </div>
  );
}

function WorkflowStage({
  column,
  index,
  isLast,
}: {
  column: WorkflowColumn;
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-(--cream) p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${STAGE_DOTS[index % STAGE_DOTS.length]}`}
            aria-hidden="true"
          />
          <h4 className="truncate font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-(--ink)">
            {column.title}
          </h4>
        </div>
        <span className="rounded-full bg-card px-2 py-0.5 font-body text-[10px] font-semibold tabular-nums text-(--muted)">
          {column.items.length.toString().padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {column.items.map((item, itemIndex) => (
          <span
            key={`${item}-${itemIndex}`}
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-border bg-card px-2 py-1 font-body text-[11px] text-(--ink)"
          >
            {isLast ? (
              <Check className="h-3 w-3 shrink-0 text-(--teal)" aria-hidden="true" />
            ) : (
              <CircleDot className="h-3 w-3 shrink-0 text-(--muted)" aria-hidden="true" />
            )}
            <span className="min-w-0 break-words">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LevelUpSection() {
  const t = useTranslations("pages.home");
  const stats = t.raw("levelUp.stats") as LevelUpStat[];
  const board = t.raw("levelUp.board") as WorkflowBoard;

  const totalTasks = board.columns.reduce(
    (total, column) => total + column.items.length,
    0,
  );
  const finalColumn = board.columns[board.columns.length - 1];
  const completedTasks = finalColumn?.items.length ?? 0;
  const completion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <section className="bg-(--cream) px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-240">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-14">
          {/* Copy and stats */}
          <div className="reveal">
            <SectionTag>{plainTag(t("levelUp.tag"))}</SectionTag>

            <h2 className="mt-5 landing-heading text-[clamp(36px,4.4vw,58px)] font-bold leading-[1.08] text-(--ink)">
              {t("levelUp.titlePrefix")}{" "}
              <HandText>{t("levelUp.titleHand")}</HandText>
            </h2>

            <p className="mt-4 max-w-120 font-body text-[15px] leading-[1.75] text-(--muted)">
              {t("levelUp.description")}
            </p>

            <ul className="mt-6 space-y-2.5">
              {stats.map((stat, index) => {
                const Icon = STAT_ICONS[index] ?? Zap;
                return (
                  <li
                    key={`${stat.label}-${index}`}
                    className={`flex items-center gap-3 px-3.5 py-3 ${SURFACE}`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${ICON_TONES[index % ICON_TONES.length]}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="font-body text-[15px] font-semibold text-(--ink)">
                      {stat.value}
                    </span>
                    <span className="font-body text-[13px] text-(--muted)">
                      {stat.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Workflow board */}
          <div className="reveal shadow-float min-w-0 rounded-3xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${ICON_TONES[0]}`}
                >
                  <Layers3 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="truncate font-body text-sm font-semibold text-(--ink)">
                  {board.projectName}
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-(--purple-light) px-2.5 py-1 font-body text-[11px] font-semibold text-(--purple)">
                {board.sprint}
              </span>
            </div>

            <div className="my-3.5 flex items-center gap-4 rounded-2xl border border-border bg-(--cream) p-3">
              <CompletionRing value={completion} />
              <div className="min-w-0 flex-1">
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.1em] text-(--muted)">
                  {finalColumn?.title}
                </p>
                <p className="font-body text-xl font-semibold tabular-nums text-(--ink)">
                  {completedTasks}
                  <span className="ml-1 text-sm font-medium text-(--muted)">
                    / {totalTasks}
                  </span>
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-(--teal)"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {board.columns.map((column, index) => (
                <WorkflowStage
                  key={`${column.title}-${index}`}
                  column={column}
                  index={index}
                  isLast={index === board.columns.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
