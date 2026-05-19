import Header from '@/components/header';
import Footer from '@/components/footer';
import { Check, ArrowRight } from 'lucide-react';

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
      description: 'Perfect for small teams and startups',
      color: 'from-primary to-secondary',
      features: [
        'Up to 10 users',
        '10GB storage',
        'Email support',
        'Basic analytics',
        'Standard integrations',
        'Community access',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing businesses and teams',
      color: 'from-secondary to-accent',
      features: [
        'Up to 100 users',
        '1TB storage',
        'Priority support',
        'Advanced analytics',
        'Custom integrations',
        'API access',
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
      description: 'For large organizations with custom needs',
      color: 'from-accent to-primary',
      features: [
        'Unlimited users',
        'Unlimited storage',
        '24/7 support',
        'Custom analytics',
        'Dedicated account manager',
        'Custom development',
        'On-premises option',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-linear-to-b from-secondary/10 to-transparent py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
              Simple, Transparent <span className="bg-linear-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-lg hover:bg-muted transition-colors">
                Annually <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 shadow-2xl'
                  : ''
              }`}
            >
              {/* Card Background */}
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${plan.color} opacity-5`}></div>

              <div className={`relative p-8 rounded-2xl border-2 ${
                plan.highlighted
                  ? `border-primary bg-card`
                  : 'border-border bg-card hover:border-primary/50'
              }`}>
                {/* Highlighted Badge */}
                {plan.highlighted && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r ${plan.color} text-white text-sm font-semibold`}>
                    Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="text-5xl font-bold text-foreground">
                    {plan.price}
                    <span className="text-lg text-muted-foreground font-normal">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg mb-8 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? `bg-linear-to-r ${plan.color} text-primary-foreground hover:scale-105`
                    : `border-2 border-muted hover:border-primary text-foreground hover:bg-muted`
                }`}>
                  {plan.cta} <ArrowRight size={18} />
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-foreground">Features included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 shrink-0 ${
                          plan.highlighted
                            ? 'text-primary'
                            : 'text-accent'
                        }`} />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-linear-to-b from-accent/5 to-transparent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes, all plans come with a 14-day free trial. No credit card required to get started.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
              },
              {
                q: 'Is there a contract?',
                a: 'No long-term contracts required. You can cancel anytime, though we offer discounts for annual commitments.',
              },
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
