"use client";

import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Calendar,
  Check,
  Clock,
  Video,
  Building,
  Briefcase,
  Award,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    color: "bg-[#d86d3f]",
    lightColor: "bg-orange-50",
    textColor: "text-orange-700",
    hours: "4 hours",
    returning: "US$ 223.53",
    newCustomer: "US$ 190.00",
    description: "Perfect for small businesses getting started",
  },
  {
    name: "Basic",
    color: "bg-[#5b5688]",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    hours: "25 hours",
    returning: "US$ 1,150.00",
    newCustomer: "US$ 977.50",
    description: "Ideal for growing companies",
  },
  {
    name: "Standard",
    color: "bg-[#e66d7b]",
    lightColor: "bg-pink-50",
    textColor: "text-pink-700",
    hours: "50 hours",
    returning: "US$ 2,240.00",
    newCustomer: "US$ 1,904.00",
    description: "For established businesses",
  },
  {
    name: "Custom",
    color: "bg-[#00a7a5]",
    lightColor: "bg-teal-50",
    textColor: "text-teal-700",
    hours: "100 hours",
    returning: "US$ 4,000.00",
    newCustomer: "US$ 3,400.00",
    description: "Tailored to specific needs",
  },
  {
    name: "Pro",
    color: "bg-[#5c8aa0]",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    hours: "200 hours",
    returning: "US$ 8,000.00",
    newCustomer: "US$ 6,800.00",
    description: "For enterprise-level operations",
  },
];

const features = [
  "Project Management",
  "Email + Phone Support",
  "Training & Coaching",
  "Configuration",
  "Data Import Assistance",
  "Onsite Consulting",
  "Customizations",
  "Developments",
  "Performance Issues",
];

const faqs = [
  {
    question: "What do the Success Packs include?",
    answer:
      "Success Packs include dedicated consultant hours, project management, training, configuration assistance, and ongoing support to ensure successful implementation.",
  },
  {
    question: "What will the 'Dedicated Customer Success Consultant' do?",
    answer:
      "Your dedicated consultant will guide you through setup, provide best practices, assist with configuration, and ensure your team is trained properly.",
  },
  {
    question: "What if I have custom needs that require developments and ad hoc integration?",
    answer:
      "Our team can handle custom developments and integrations. Custom and Pro packs include development hours, and additional hours can be purchased.",
  },
  {
    question: "What should I do if I have performance issues?",
    answer:
      "Performance issues are covered under all Success Packs. Our team will diagnose and resolve any performance-related concerns promptly.",
  },
];

function ScriptHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl ${className}`}
      style={{
        fontFamily:
          '"Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {children}
    </h2>
  );
}

function SectionEyebrow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 shadow-sm ring-1 ring-purple-100">
      <span className="text-purple-500">{icon}</span>
      {label}
    </div>
  );
}

export default function PricingPacksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#faf5ff_18%,_#f7f7f7_100%)] font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_15%_12%,rgba(147,51,234,0.08),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.06),transparent_24%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <SectionEyebrow
                icon={<Sparkles className="h-4 w-4" />}
                label="Implementation success"
              />
              <ScriptHeading className="mt-4">
                Eden ERP Success Packs
              </ScriptHeading>
              <p className="mt-4 text-xl text-slate-600" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                98% implementation success rate, vs 65% without success pack{" "}
                <span className="italic">(self-implemented)</span>.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-8 py-4 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Project Estimator
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl bg-white shadow-xl">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr>
                <th className="border-b bg-white px-6 py-5 text-left text-sm font-bold text-slate-700" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  Recommended for:
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className={`px-6 py-5 text-center text-white ${plan.color}`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    <div className="text-4xl font-black">{plan.name}</div>
                    <div className="mt-2 text-sm font-medium text-white/90">
                      {plan.description.split(" ").slice(0, 3).join(" ")}...
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Hours Row */}
              <tr className="border-b">
                <td className="px-6 py-5 font-bold text-slate-700" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  Dedicated Consultant Hours
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className={`px-6 py-5 text-center text-3xl font-black text-white ${plan.color}`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {plan.hours}
                  </td>
                ))}
              </tr>

              {/* Features Rows */}
              {features.map((feature, idx) => (
                <tr key={feature} className="border-b hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-700" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {feature}
                  </td>
                  {plans.map((plan, i) => {
                    let showCheck = false;
                    if (plan.name === "Starter" && idx <= 5) showCheck = true;
                    if (plan.name === "Basic" && idx <= 6) showCheck = true;
                    if (plan.name === "Standard" && idx <= 7) showCheck = true;
                    if (plan.name === "Custom" && idx <= 8) showCheck = true;
                    if (plan.name === "Pro" && idx <= 8) showCheck = true;
                    if (feature === "Performance Issues" && plan.name === "Starter")
                      showCheck = true;
                    if (feature === "Performance Issues" && plan.name === "Basic")
                      showCheck = true;
                    if (feature === "Performance Issues" && plan.name === "Standard")
                      showCheck = true;
                    if (feature === "Performance Issues" && plan.name === "Custom")
                      showCheck = true;
                    if (feature === "Performance Issues" && plan.name === "Pro")
                      showCheck = true;

                    return (
                      <td key={i} className="px-6 py-4 text-center">
                        {showCheck ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Returning Customers */}
              <tr className="border-b bg-slate-50">
                <td className="px-6 py-5 font-bold text-slate-700" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  Returning Customers
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className="px-6 py-5 text-center text-2xl font-black text-purple-700"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {plan.returning}
                  </td>
                ))}
              </tr>

              {/* New Customers */}
              <tr>
                <td className="px-6 py-5 font-bold text-slate-700" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  New Customers <span className="text-sm font-normal">(15% off)</span>
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className={`px-6 py-5 text-center text-2xl font-black text-white ${plan.color}`}
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  >
                    {plan.newCustomer}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-6 space-y-1 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          <p>* Travel time billed; Travel expenses billed separately.</p>
          <p>** Extra monthly charges apply for maintenance.</p>
          <p>*** A 15% discount applies automatically to new customers.</p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-10 py-4 font-bold text-white shadow-lg shadow-purple-700/20 transition hover:-translate-y-0.5 hover:bg-purple-800" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Meet an advisor
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#f7f7f7] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <SectionEyebrow
              icon={<HelpCircle className="h-4 w-4" />}
              label="Got questions?"
            />
            <ScriptHeading className="mt-4">Any Questions?</ScriptHeading>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              If the answer to your question is not on this page,
              please contact our Account Managers.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-slate-800 transition hover:bg-slate-50"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  <span className="text-lg">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="border-t border-slate-100 px-6 py-4 text-slate-600" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Banner */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 p-6 text-center">
            <p className="text-slate-600" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Still have questions?{" "}
              <button className="font-semibold text-purple-700 hover:underline">
                Contact our team
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>4.9/5 from 500+ reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Users className="h-4 w-4 text-purple-500" />
            <span>15M+ happy users</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Award className="h-4 w-4 text-purple-500" />
            <span>98% success rate</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            <Calendar className="h-4 w-4 text-purple-500" />
            <span>30-day satisfaction guarantee</span>
          </div>
        </div>
      </section>
    </main>
  );
}