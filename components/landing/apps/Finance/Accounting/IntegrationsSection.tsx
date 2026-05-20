"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Package, Users, TrendingUp, FolderKanban, Calculator, Globe, Store } from "lucide-react";

const integrations = [
  { icon: ShoppingCart, name: "Sales", color: "emerald" },
  { icon: Package, name: "Inventory", color: "cyan" },
  { icon: Users, name: "HR", color: "purple" },
  { icon: TrendingUp, name: "CRM", color: "blue" },
  { icon: FolderKanban, name: "Projects", color: "orange" },
  { icon: Calculator, name: "Accounting", color: "emerald" },
  { icon: Globe, name: "Ecommerce", color: "pink" },
  { icon: Store, name: "POS", color: "indigo" },
];

export default function IntegrationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-handwritten text-emerald-600 text-3xl">One app, one</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Expand as you grow. All modules work seamlessly together.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {integrations.map((integration, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group text-center p-4 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 mx-auto rounded-lg bg-${integration.color}-100 flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <integration.icon className={`h-6 w-6 text-${integration.color}-600`} />
              </div>
              <p className="text-sm font-medium text-gray-900">{integration.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition">
            Explore all apps →
          </button>
        </motion.div>
      </div>
    </section>
  );
}