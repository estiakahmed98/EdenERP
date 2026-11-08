import LiveDemoButton from "@/components/live-demo-button";
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Layers, 
  Search, 
  ShieldCheck, 
  TrendingUp,
  FolderTree
} from 'lucide-react'
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.appPages.chartOfAccounts");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function PublicChartOfAccountsPage() {
  const t = useTranslations("pages.appPages.chartOfAccounts");
  return (
    <main className="min-h-screen bg-[var(--cream)] text-foreground pb-24">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24 border-b border-border">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(to_bottom,var(--gray-bg)_0%,transparent_100%)] opacity-50" />
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <FolderTree className="h-4 w-4" />
            <span>{t("page.accountingCore")}</span>
          </div>
          <h1 className="showcase-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] mb-6">
            {t("page.theMapOfYourMoney")}<br />
            <span className="text-primary">{t("page.perfectlyOrganized")}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            {t("page.everyTakaThatEntersOrLeaves")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LiveDemoButton />
            <Link 
              href="#how-it-works" 
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              {t("page.seeHowItWorks")}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS IT? (The Concept) */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="showcase-heading text-3xl sm:text-4xl text-[var(--ink)] mb-6">
                {t("page.thinkOfItAsAFiling")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t("page.whenYouBuyAChairThe")}{" "}<strong className="text-foreground">{t("page.furnitureEquipment")}</strong>. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("page.theChartOfAccountsCoaIs")}
              </p>
            </div>
            
            {/* Visual Representation of the 5 pillars */}
            <div className="grid gap-4 sm:grid-cols-2 bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
              <div className="space-y-4">
                {[
                  { label: t("page.assets"), desc: t("page.whatYouOwn"), color: 'bg-blue-500' },
                  { label: t("page.liabilities"), desc: t("page.whatYouOwe"), color: 'bg-red-500' },
                  { label: t("page.capital"), desc: t("page.ownerSStake"), color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background">
                    <div className={`mt-1 h-3 w-3 rounded-full ${item.color}`} />
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4 sm:pt-12">
                {[
                  { label: t("page.income"), desc: t("page.whatYouEarn"), color: 'bg-green-500' },
                  { label: t("page.expenses"), desc: t("page.whatYouSpend"), color: 'bg-orange-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 bg-background">
                    <div className={`mt-1 h-3 w-3 rounded-full ${item.color}`} />
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (The Tree Structure) */}
      <section id="how-it-works" className="bg-[var(--gray-bg)] py-20 sm:py-24 border-y border-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="showcase-heading text-3xl sm:text-4xl text-[var(--ink)] mb-4">
              {t("page.aHierarchyNotAFlatList")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("page.weUseAParentChildStructure")}
            </p>
          </div>

          {/* Illustrative Tree Graphic (Static) */}
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">{t("page.exampleHierarchy")}</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-4 text-foreground/80">
              
              {/* Root */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">▼</span>
                <span className="font-semibold text-primary">01000000</span>
                <span>{t("page.assetAccounts")}</span>
              </div>
              
              {/* Level 1 */}
              <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">▼</span>
                  <span className="font-medium text-primary">01100000</span>
                  <span>{t("page.currentAssets")}</span>
                </div>
                
                {/* Level 2 */}
                <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">▶</span>
                    <span className="text-primary">01110000</span>
                    <span>{t("page.cashCashEquivalents")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">▶</span>
                    <span className="text-primary">01120000</span>
                    <span>{t("page.accountsReceivable")}</span>
                  </div>
                </div>
              </div>
              
              {/* Another Level 1 */}
              <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">▶</span>
                  <span className="font-medium text-primary">01200000</span>
                  <span>{t("page.fixedAssets")}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY IT MATTERS (Features & Benefits) */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="showcase-heading text-3xl sm:text-4xl text-[var(--ink)] mb-6">
                {t("page.builtForClarityFromDayOne")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("page.whetherYouAreAStartupOr")}
              </p>
            </div>
            
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("page.preConfiguredForBd")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("page.comesOutOfTheBoxWith")}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("page.multiCompanySupport")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("page.runAFactoryAndATrading")}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("page.granularControl")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("page.donTLumpEverythingTogetherBreak")}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t("page.betterReports")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("page.aWellOrganizedChartOfAccounts")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ & CALL TO ACTION */}
      <section className="bg-[var(--purple-dark)] py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="showcase-heading text-3xl sm:text-4xl mb-6">
                {t("page.readyToOrganizeYourBooks")}
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                {t("page.seeHowAdonErpSChart")}
              </p>
              <LiveDemoButton />
            </div>
            
            <div className="space-y-6 lg:border-l lg:border-white/20 lg:pl-12">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--teal)]" /> 
                  {t("page.canIRenameDefaultAccounts")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{t("page.yesYouHaveCompleteControlTo")}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--teal)]" /> 
                  {t("page.whatIfIMakeAMistake")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{t("page.youCanAddMergeOrDeactivate")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}