// app/pricing/page.tsx

import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'Pricing | Venture',
  description: 'Simple, transparent pricing for every business size.',
};

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Best for small teams starting their business operations.',
      color: 'from-primary to-secondary',
      badge: 'For startups',
      icon: Users,
      features: [
        'Up to 10 users',
        '10GB secure storage',
        'CRM & basic sales pipeline',
        'Task and project management',
        'Email support',
        'Basic analytics dashboard',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing teams that need automation and integrations.',
      color: 'from-secondary to-accent',
      badge: 'Most Popular',
      icon: Zap,
      features: [
        'Up to 100 users',
        '1TB secure storage',
        'Advanced CRM and automation',
        'Inventory and sales reports',
        'Custom integrations and API access',
        'Priority support',
        'SSO & SAML',
        'Custom branding',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '/year',
      description: 'For large organizations with custom workflows and support.',
      color: 'from-accent to-primary',
      badge: 'Custom solution',
      icon: Building2,
      features: [
        'Unlimited users',
        'Unlimited storage',
        'Multi-company management',
        'Dedicated account manager',
        'Custom development support',
        'On-premises option',
        '24/7 premium support',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const modules = [
    'CRM',
    'Sales',
    'Inventory',
    'Accounting',
    'HR Management',
    'Project Management',
    'Website Builder',
    'Ecommerce',
    'Marketing Automation',
    'Helpdesk',
    'Reporting',
    'API Integration',
  ];

  const comparison = [
    { feature: 'Users', starter: '10', professional: '100', enterprise: 'Unlimited' },
    { feature: 'Storage', starter: '10GB', professional: '1TB', enterprise: 'Unlimited' },
    { feature: 'CRM Pipeline', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
    { feature: 'Inventory Management', starter: 'Basic', professional: 'Included', enterprise: 'Advanced' },
    { feature: 'Automation', starter: 'Limited', professional: 'Included', enterprise: 'Advanced' },
    { feature: 'API Access', starter: 'No', professional: 'Yes', enterprise: 'Yes' },
    { feature: 'Custom Branding', starter: 'No', professional: 'Yes', enterprise: 'Yes' },
    { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7 Dedicated' },
  ];

  const addOns = [
    {
      title: 'Extra Storage',
      price: '$10 / 100GB',
      description: 'Add more secure storage whenever your team needs it.',
      icon: ShieldCheck,
    },
    {
      title: 'Advanced Analytics',
      price: '$25 / month',
      description: 'Unlock deeper dashboards, exports, and performance insights.',
      icon: BarChart3,
    },
    {
      title: 'Implementation Support',
      price: 'Custom',
      description: 'Get expert help for migration, setup, training, and workflow design.',
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      q: 'Can I change my plan anytime?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
    },
    {
      q: 'Do you offer a free trial?',
      a: 'Yes, the Professional plan includes a 14-day free trial. No credit card required to get started.',
    },
    {
      q: 'Can I add only the apps/modules I need?',
      a: 'Yes. You can start with the core modules and add CRM, sales, inventory, HR, ecommerce, or analytics as your business grows.',
    },
    {
      q: 'Do you support custom workflows?',
      a: 'Yes. Enterprise customers can request custom workflows, integrations, reports, and deployment options.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept major credit cards, PayPal, and bank transfers for enterprise plans.',
    },
    {
      q: 'Is there a long-term contract?',
      a: 'No long-term contract is required for monthly plans. Annual plans are available with discounted pricing.',
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-background">
     

      {/* Hero Section */}
      <section className="relative overflow-hidden w-full bg-linear-to-b from-secondary/10 via-background to-background py-16 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              All-in-one business management pricing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
              Simple, Transparent{' '}
              <span className="bg-linear-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose a plan that fits your team. Manage CRM, sales, inventory, accounting,
              HR, projects, ecommerce, and analytics from one modern platform.
            </p>

            {/* Billing Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all">
                Monthly
              </button>
              <button className="px-6 py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-colors font-semibold">
                Annually{' '}
                <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground pt-2">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> No hidden fees</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Cancel anytime</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 14-day trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="w-full py-8 border-y border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {modules.map((module) => (
              <span
                key={module}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl transition-all duration-300 ${
                  plan.highlighted ? 'md:scale-105 shadow-2xl' : 'hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${plan.color} opacity-10`} />

                <div
                  className={`relative h-full p-8 rounded-3xl border-2 bg-card ${
                    plan.highlighted ? 'border-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  {plan.highlighted && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-linear-to-r ${plan.color} text-white text-sm font-semibold shadow-lg`}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-2">{plan.badge}</p>
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    </div>
                    <div className={`rounded-2xl bg-linear-to-br ${plan.color} p-3 text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm min-h-12 mb-7 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="text-5xl font-bold text-foreground">
                      {plan.price}
                      <span className="text-lg text-muted-foreground font-normal">{plan.period}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg mb-8 flex items-center justify-center gap-2 ${
                      plan.highlighted
                        ? `bg-linear-to-r ${plan.color} text-primary-foreground hover:scale-105`
                        : 'border-2 border-muted hover:border-primary text-foreground hover:bg-muted'
                    }`}
                  >
                    {plan.cta} <ArrowRight size={18} />
                  </button>

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-foreground">Features included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 mt-0.5 shrink-0 ${
                              plan.highlighted ? 'text-primary' : 'text-accent'
                            }`}
                          />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="w-full bg-muted/30 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Compare all plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quickly compare limits, automation, integrations, and support options before choosing your plan.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-background">
                  <tr className="border-b border-border">
                    <th className="px-6 py-5 text-left font-bold text-foreground">Feature</th>
                    <th className="px-6 py-5 text-left font-bold text-foreground">Starter</th>
                    <th className="px-6 py-5 text-left font-bold text-primary">Professional</th>
                    <th className="px-6 py-5 text-left font-bold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{row.feature}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.starter}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.professional}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Optional add-ons</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Extend your workspace with extra capacity, analytics, and implementation support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-7 hover:border-primary/50 hover:shadow-xl transition-all">
                  <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-3">{item.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-linear-to-b from-accent/5 to-transparent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground mb-5">
              <HelpCircle className="h-4 w-4 text-primary" />
              Questions & answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary via-secondary to-accent p-8 sm:p-12 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">Ready to run your business smarter?</h2>
              <p className="text-white/85 text-lg mb-8">
                Start with the plan that fits today, then add more modules as your company grows.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="rounded-xl bg-white px-7 py-3.5 font-semibold text-primary hover:shadow-xl transition-all flex items-center gap-2">
                  Start Free Trial <ArrowRight className="h-5 w-5" />
                </button>
                <button className="rounded-xl border border-white/40 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition-all">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}
