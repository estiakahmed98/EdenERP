"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, RefreshCw, CheckCircle, TrendingUp } from "lucide-react";

export default function BankingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Banking UI */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b px-6 py-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  Bank Synchronization
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Balance</p>
                    <p className="text-3xl font-bold text-gray-900">$9,944.87</p>
                  </div>
                  <RefreshCw className="h-5 w-5 text-emerald-600 animate-spin" style={{ animationDuration: "3s" }} />
                </div>
                <div className="space-y-2">
                  {[
                    { desc: "Deco Addict", date: "09/27/2024", amount: "$102.78", matched: true },
                    { desc: "Office Supply Co", date: "09/25/2024", amount: "$650.00", matched: true },
                    { desc: "Azure Interior", date: "09/23/2024", amount: "$2,000.00", matched: false },
                  ].map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{transaction.desc}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{transaction.amount}</span>
                        {transaction.matched && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-emerald-800">
                    95% of transactions matched automatically
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-handwritten text-emerald-600 text-3xl">Smart bank</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              reconciliation
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Never import bank statements manually again. Eden ERP integrates with 28,000+ banks
              from all around the world with smart AI matching.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">28,000+ banks supported</h4>
                  <p className="text-sm text-gray-600">Global coverage across 50+ countries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">95% auto-matching rate</h4>
                  <p className="text-sm text-gray-600">AI-powered transaction matching</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">$6,378.00</p>
                <p className="text-sm text-gray-600">Last Statement</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">+$8,578.50</p>
                <p className="text-sm text-gray-600">Payments</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}