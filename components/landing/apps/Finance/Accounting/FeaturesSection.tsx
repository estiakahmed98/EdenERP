"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Mail, BarChart3, Calculator, FileText, TrendingUp, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Worldwide compatibility",
    description: "Pre-configured for your country's requirements: taxes, reports, and fiscal positions",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Real-time reporting",
    description: "Make informed decisions with real-time financial performance reports",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Electronic invoicing",
    description: "Send and receive electronic invoices in multiple formats including Peppol",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Mail,
    title: "Automated follow-ups",
    description: "Schedule and send payment reminders via email, post, or SMS",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Calculator,
    title: "Smart deferrals",
    description: "Defer revenues and expenses automatically on validation",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Dynamic taxes",
    description: "Auto-compute right taxes based on customer location and tax ID",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Audit-ready",
    description: "Complete audit trail with detailed logs and reports",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Clock,
    title: "Real-time sync",
    description: "Live synchronization across all your devices and platforms",
    gradient: "from-cyan-500 to-emerald-500",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-handwritten text-emerald-600 text-3xl">Wait! There is more!</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              All the features done right
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition flex items-center gap-2 mx-auto">
            See all features
            <TrendingUp className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}