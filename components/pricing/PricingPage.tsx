"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  CircleHelp,
  Layers3,
  LifeBuoy,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import LiveDemoButton from "@/components/live-demo-button";
import type { BillingCycle, CurrencyCode, PricingContent } from "./types";
import { PlanCard } from "./PlanCard";
import { FaqItem } from "./FaqItem";
import { getPlanPrice, hasConfiguredFeature } from "./plan-presentation";
import css from "./pricing.module.css";

interface PricingPageProps {
  data: PricingContent;
  onBuyNow: (
    planId: string,
    billing: BillingCycle,
    currency: CurrencyCode,
  ) => void;
  onSuccessPacks: () => void;
  initialBilling?: BillingCycle;
  initialCurrency?: CurrencyCode;
}

export function PricingPage({
  data,
  onBuyNow,
  onSuccessPacks,
  initialBilling = "yearly",
  initialCurrency = "BDT",
}: PricingPageProps) {
  const t = useTranslations("pages.pricing.ui");
  const common = useTranslations("common.states");
  const packages = data.erpPackages.filter((plan) => plan.enabled);
  const featuredId = packages.find(
    (plan) => plan.badge && plan.id !== "enterprise",
  )?.id;
  const [billing, setBilling] = useState<BillingCycle>(initialBilling);
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency);
  const [previewId, setPreviewId] = useState(
    featuredId ?? packages[0]?.id ?? "",
  );
  const [comparisonId, setComparisonId] = useState(packages[0]?.id ?? "");
  const preview = packages.find((plan) => plan.id === previewId) ?? packages[0];
  const comparisonPlan =
    packages.find((plan) => plan.id === comparisonId) ?? packages[0];
  const enterprise = packages.find((plan) => plan.id === "enterprise");
  const features = Array.from(
    new Set(packages.flatMap((plan) => plan.features)),
  );
  const maxFeatures = Math.max(
    1,
    ...packages.map((plan) => plan.features.length),
  );
  const hasPrices = packages.some(
    (plan) => getPlanPrice(plan, billing) !== null,
  );
  const hasQuarterlyPrices = packages.some(
    (plan) =>
      plan.quarterlyFee && typeof plan.users === "number" && plan.users > 0,
  );
  const cycles = (
    ["yearly", "semiannual", "quarterly", "monthly"] as const
  ).filter((cycle) => data.hero.billingToggle?.[cycle]);
  const discount = (cycle: BillingCycle) =>
    cycle === "monthly"
      ? undefined
      : data.hero.billingToggle?.[`${cycle}Discount`];

  return (
    <main className={css.page} data-pricing-page>
      <section
        className={`${css.wrap} ${css.hero}`}
        aria-labelledby="pricing-title"
      >
        <div className={css.heroCopy}>
          <p className={css.eyebrow}>
            <span className={css.statusDot} />
            {data.hero.eyebrow}
          </p>
          <h1 id="pricing-title">
            {data.hero.title}
            <br />
            <span className={css.marker}>
              {data.hero.titleHighlight}
              <svg
                aria-hidden="true"
                viewBox="0 0 420 14"
                preserveAspectRatio="none"
              >
                <path d="M3 9C87 1 235 0 416 7M15 12C143 6 286 5 402 10" />
              </svg>
            </span>
          </h1>
          <p className={css.heroDescription}>{data.hero.description}</p>
          <div className={css.heroActions}>
            <LiveDemoButton />
            <a href="#plan-comparison">
              {t("compare")}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={css.heroFootnote}>
            <span />
            <p>{t("heroNote")}</p>
          </div>
        </div>
        <div className={css.studio}>
          <div className={css.studioHeading}>
            <span>
              <Layers3 size={15} aria-hidden="true" />
              {t("planPreview")}
            </span>
            <span className={css.studioDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          {preview && (
            <div
              className={css.previewCard}
              aria-live="polite"
              aria-atomic="true"
            >
              <div className={css.previewIdentity}>
                <span aria-hidden="true">{preview.icon}</span>
                <div>
                  <small>{t("yourPlan")}</small>
                  <strong>{preview.name}</strong>
                </div>
                <ArrowUpRight size={23} aria-hidden="true" />
              </div>
              <div className={css.previewStats}>
                <div>
                  <span>{t("includedTeam")}</span>
                  <strong>
                    {preview.users ?? "—"}
                    <small>{data.packagePricing.usersLabel}</small>
                    <svg aria-hidden="true" viewBox="0 0 120 56">
                      <path d="M7 25C11 4 105 0 113 25C122 52 26 62 8 39C-5 21 24 9 49 9" />
                    </svg>
                  </strong>
                </div>
                <div>
                  <span>{t("coverage")}</span>
                  <strong>
                    {String(preview.features.length).padStart(2, "0")}
                    <small>{t("featuresLabel")}</small>
                  </strong>
                </div>
              </div>
              <div className={css.previewFeatures}>
                {preview.features.slice(0, 3).map((feature) => (
                  <span key={feature}>
                    <Check size={12} aria-hidden="true" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div
            className={css.spectrum}
            role="group"
            aria-label={t("choosePreview")}
          >
            {packages.map((plan) => (
              <button
                type="button"
                key={plan.id}
                aria-pressed={preview?.id === plan.id}
                onClick={() => setPreviewId(plan.id)}
                onMouseEnter={() => setPreviewId(plan.id)}
                onFocus={() => setPreviewId(plan.id)}
              >
                <span
                  className={css.spectrumBar}
                  style={{
                    height: `${18 + (plan.features.length / maxFeatures) * 48}px`,
                  }}
                >
                  <span />
                </span>
                <span className={css.spectrumLabel}>{plan.name}</span>
              </button>
            ))}
          </div>
          <span className={css.handNote}>
            {t("touchNote")}
            <svg viewBox="0 0 100 44" fill="none" aria-hidden="true">
              <path d="M4 7c29-13 73-1 74 20 0 12-21 6-19-5 3-13 24-9 34 11m-14-3 15 6-2-14" />
            </svg>
          </span>
        </div>
      </section>

      <section
        className={`${css.wrap} ${css.plansSection}`}
        id="plans"
        aria-labelledby="plans-title"
      >
        <div className={css.sectionTop}>
          <div>
            <p className={css.eyebrow}>{t("plansEyebrow")}</p>
            <h2 id="plans-title">{t("plansTitle")}</h2>
          </div>
          <p>{t("plansDescription")}</p>
        </div>
        <div className={css.controlBar}>
          {hasPrices ? (
            <>
              <div
                className={css.billingControl}
                role="group"
                aria-label={t("billingCycle")}
              >
                {cycles.map((cycle) => (
                  <button
                    type="button"
                    key={cycle}
                    aria-pressed={billing === cycle}
                    onClick={() => setBilling(cycle)}
                  >
                    <span>{data.hero.billingToggle?.[cycle]}</span>
                    {hasQuarterlyPrices && discount(cycle) && (
                      <small>{discount(cycle)}</small>
                    )}
                  </button>
                ))}
              </div>
              <div className={css.currencyArea}>
                <div
                  className={css.currencyControl}
                  role="group"
                  aria-label={t("displayCurrency")}
                >
                  {(["BDT", "USD"] as const).map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={currency === value}
                      onClick={() => setCurrency(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <span>{data.packagePricing.currencyRate}</span>
              </div>
            </>
          ) : (
            <p className={css.quoteNote}>
              <CircleHelp size={18} aria-hidden="true" />
              <span>{t("quoteNote")}</span>
            </p>
          )}
          {!hasPrices && (
            <a className={css.controlCompare} href="#plan-comparison">
              {t("compare")}
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          )}
        </div>
        {hasPrices && <p className={css.currencyNote}>{t("currencyNote")}</p>}
        {packages.length > 0 ? (
          <div className={css.planGrid}>
            {packages.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                currency={currency}
                labels={data.packagePricing}
                includedFeaturesHeading={data.includedFeaturesHeading}
                highlighted={plan.id === featuredId}
                onBuyNow={() => onBuyNow(plan.id, billing, currency)}
              />
            ))}
          </div>
        ) : (
          <div className={css.emptyState}>
            <p>{t("noPlans")}</p>
            <LiveDemoButton />
          </div>
        )}
      </section>

      <section
        className={`${css.wrap} ${css.decisionSection}`}
        aria-labelledby="decision-title"
      >
        <div className={css.decisionIntro}>
          <p className={css.eyebrow}>{t("decisionEyebrow")}</p>
          <h2 id="decision-title">{t("decisionTitle")}</h2>
          <svg aria-hidden="true" viewBox="0 0 140 50">
            <path d="M4 13C32-8 84 6 76 28C68 50 42 23 66 20C91 17 112 21 132 39m-17-1 19 3-5-17" />
          </svg>
        </div>
        <div className={css.decisionSteps}>
          {[
            { icon: Users, key: "team" },
            { icon: Blocks, key: "modules" },
            { icon: SlidersHorizontal, key: "implementation" },
          ].map(({ icon: Icon, key }, index) => (
            <div key={key}>
              <span className={css.decisionNumber}>0{index + 1}</span>
              <Icon size={21} aria-hidden="true" />
              <h3>{t(`${key}Title`)}</h3>
              <p>{t(`${key}Description`)}</p>
              {key === "implementation" && (
                <button type="button" onClick={onSuccessPacks}>
                  {t("implementationLink")}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section
        className={`${css.wrap} ${css.comparisonSection}`}
        id="plan-comparison"
        aria-labelledby="comparison-title"
      >
        <div className={css.sectionTop}>
          <div>
            <p className={css.eyebrow}>{t("comparisonEyebrow")}</p>
            <h2 id="comparison-title">{t("comparisonTitle")}</h2>
          </div>
          <p>{t("comparisonDescription")}</p>
        </div>
        {comparisonPlan && (
          <div className={css.mobileCompareControl}>
            <label htmlFor="comparison-plan">{t("comparePlan")}</label>
            <select
              id="comparison-plan"
              value={comparisonPlan.id}
              onChange={(event) => setComparisonId(event.target.value)}
            >
              {packages.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={css.tableShell}>
          <table className={css.comparisonTable}>
            <caption className="sr-only">{t("comparisonTitle")}</caption>
            <thead>
              <tr>
                <th scope="col">
                  {data.successPacksPage.comparisonTable?.featureHeader ??
                    t("featuresLabel")}
                </th>
                {packages.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    data-mobile-selected={comparisonPlan?.id === plan.id}
                    data-featured={plan.id === featuredId}
                  >
                    <span>{plan.name}</span>
                    {plan.users != null && (
                      <small>
                        {plan.users} {data.packagePricing.usersLabel}
                      </small>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  {packages.map((plan) => (
                    <td
                      key={plan.id}
                      data-mobile-selected={comparisonPlan?.id === plan.id}
                      data-featured={plan.id === featuredId}
                    >
                      {hasConfiguredFeature(plan, feature) ? (
                        <>
                          <Check size={17} aria-hidden="true" />
                          <span className="sr-only">{common("included")}</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true" className={css.notListed}>
                            —
                          </span>
                          <span className="sr-only">{t("notListed")}</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={css.comparisonNote}>
          <Check size={14} aria-hidden="true" />
          {t("comparisonNote")}
        </p>
      </section>

      {data.modules.list.length > 0 && (
        <section className={css.moduleSection} aria-labelledby="modules-title">
          <div className={css.wrap}>
            <div className={css.moduleHeading}>
              <div className={css.moduleMark} aria-hidden="true">
                <Layers3 size={28} />
                <i />
                <i />
              </div>
              <div>
                <p className={css.eyebrow}>{t("moduleEyebrow")}</p>
                <h2 id="modules-title">{t("moduleTitle")}</h2>
                <p>{t("moduleNote")}</p>
              </div>
            </div>
            <div className={css.moduleCloud}>
              {data.modules.list.map((module, index) => (
                <span key={`${module}-${index}`}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {module}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {enterprise && (
        <section
          className={`${css.wrap} ${css.enterpriseSection}`}
          aria-labelledby="enterprise-title"
        >
          <div className={css.enterprisePanel}>
            <div>
              <p className={css.eyebrow}>
                <Sparkles size={14} aria-hidden="true" />
                {t("enterpriseEyebrow")}
              </p>
              <h2 id="enterprise-title">
                {enterprise.name}
                <span className={css.enterprisePeriod}>.</span>
              </h2>
              <p>{enterprise.tagline}</p>
              <LiveDemoButton />
            </div>
            <div className={css.enterpriseFeatures}>
              <span>{data.includedFeaturesHeading}</span>
              <ul>
                {enterprise.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {data.faq.items.length > 0 && (
        <section
          className={`${css.wrap} ${css.faqSection}`}
          aria-labelledby="pricing-faq-title"
        >
          <div className={css.faqIntro}>
            <span className={css.faqIcon}>
              <LifeBuoy size={28} aria-hidden="true" />
            </span>
            <p className={css.eyebrow}>{t("faqEyebrow")}</p>
            <h2 id="pricing-faq-title">{data.faq.title}</h2>
            <p>{data.faq.description}</p>
            <LiveDemoButton />
          </div>
          <div className={css.faqList}>
            {data.faq.items.map((faq, index) => (
              <FaqItem key={faq.id ?? index} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </section>
      )}

      <section
        className={`${css.wrap} ${css.finalSection}`}
        aria-labelledby="pricing-final-title"
      >
        <div className={css.finalOrbit} aria-hidden="true">
          <i />
          <i />
          <Layers3 size={29} />
        </div>
        <h2 id="pricing-final-title">{data.finalCta.title}</h2>
        <p>{data.finalCta.description}</p>
        <LiveDemoButton />
        <a href="#plans">
          {t("backToPlans")}
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
