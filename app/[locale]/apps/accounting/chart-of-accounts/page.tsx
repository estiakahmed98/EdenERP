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

export const metadata: Metadata = {
  title: 'Chart of Accounts: The Backbone of Your Business | Adon ERP',
  description: 'Understand how the Chart of Accounts organizes your financial data in Adon ERP. See how assets, liabilities, income, and expenses fit together.',
}

export default function PublicChartOfAccountsPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] text-foreground pb-24">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24 border-b border-border">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(to_bottom,var(--gray-bg)_0%,transparent_100%)] opacity-50" />
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <FolderTree className="h-4 w-4" />
            <span>Accounting Core</span>
          </div>
          <h1 className="showcase-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] mb-6">
            The map of your money.<br />
            <span className="text-primary">Perfectly organized.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            Every taka that enters or leaves your business needs a home. The Chart of Accounts is the structured tree that tells your ERP exactly where every transaction belongs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <LiveDemoButton />
            <Link 
              href="#how-it-works" 
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              See How It Works
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
                Think of it as a filing cabinet for your finances.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                When you buy a chair, the software doesn't just record "Bought a chair." It automatically files that expense under <strong className="text-foreground">Furniture & Equipment</strong>. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Chart of Accounts (CoA) is that structure. It groups your money into five main categories, making it instantly clear where your business is making money and where it is spending it.
              </p>
            </div>
            
            {/* Visual Representation of the 5 pillars */}
            <div className="grid gap-4 sm:grid-cols-2 bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-sm">
              <div className="space-y-4">
                {[
                  { label: 'Assets', desc: 'What you own', color: 'bg-blue-500' },
                  { label: 'Liabilities', desc: 'What you owe', color: 'bg-red-500' },
                  { label: 'Capital', desc: 'Owner\'s stake', color: 'bg-purple-500' },
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
                  { label: 'Income', desc: 'What you earn', color: 'bg-green-500' },
                  { label: 'Expenses', desc: 'What you spend', color: 'bg-orange-500' },
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
              A hierarchy, not a flat list.
            </h2>
            <p className="text-lg text-muted-foreground">
              We use a Parent-Child structure. You can drill down from a broad category all the way to a specific ledger account.
            </p>
          </div>

          {/* Illustrative Tree Graphic (Static) */}
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">Example Hierarchy</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-4 text-foreground/80">
              
              {/* Root */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">▼</span>
                <span className="font-semibold text-primary">01000000</span>
                <span>Asset Accounts</span>
              </div>
              
              {/* Level 1 */}
              <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">▼</span>
                  <span className="font-medium text-primary">01100000</span>
                  <span>Current Assets</span>
                </div>
                
                {/* Level 2 */}
                <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">▶</span>
                    <span className="text-primary">01110000</span>
                    <span>Cash & Cash Equivalents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">▶</span>
                    <span className="text-primary">01120000</span>
                    <span>Accounts Receivable</span>
                  </div>
                </div>
              </div>
              
              {/* Another Level 1 */}
              <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">▶</span>
                  <span className="font-medium text-primary">01200000</span>
                  <span>Fixed Assets</span>
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
                Built for clarity from day one.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you are a startup or a multi-company group, the Chart of Accounts adapts to your operational reality.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Pre-configured for BD</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comes out of the box with standard account heads tailored for Bangladeshi businesses, including VAT accounts.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Multi-Company Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Run a factory and a trading arm? Create separate CoAs for each entity or share a standardized group structure.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Granular Control</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Don't lump everything together. Break down "Transport" into "Fuel", "Vehicle Maintenance", and "Tolls" for precise reporting.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--purple-light)] text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Better Reports</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A well-organized Chart of Accounts is the secret to meaningful financial reports. Your Balance Sheet will actually make sense.
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
                Ready to organize your books?
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                See how Adon ERP's Chart of Accounts can bring clarity to your business finances. Book a walkthrough with our team today.
              </p>
              <LiveDemoButton />
            </div>
            
            <div className="space-y-6 lg:border-l lg:border-white/20 lg:pl-12">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--teal)]" /> 
                  Can I rename default accounts?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">Yes, you have complete control to rename, edit, or reorganize any account node to match your exact terminology.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[var(--teal)]" /> 
                  What if I make a mistake later?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">You can add, merge, or deactivate accounts at any time. However, accounts with existing transactions cannot be deleted to maintain audit trails.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}