"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Camera, Zap, Cloud } from "lucide-react";

export default function MobileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-handwritten text-emerald-600 text-3xl">Your mobile</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
              companion
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Take pictures of your expenses, and let the Artificial Intelligence do the rest!
              Snap, scan, and sync — all from your phone.
            </p>

            <div className="space-y-4">
              {[
                { icon: Camera, text: "Instant receipt capture" },
                { icon: Zap, text: "Real-time expense tracking" },
                { icon: Cloud, text: "Automatic cloud sync" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mobile plan expense</p>
                  <p className="text-2xl font-bold text-gray-900">$750.00</p>
                </div>
                <Smartphone className="h-12 w-12 text-emerald-600 opacity-50" />
              </div>
            </div>
          </motion.div>

          {/* Right - Mobile Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-80">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[3rem] blur-2xl opacity-30" />
              <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 p-4">
                    <div className="flex items-center justify-between text-white">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm font-semibold">Expense Tracker</span>
                      <div className="w-5" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm">Receipt scanned</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Office Supplies</span>
                        <span>$45.99</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Meal Expense</span>
                        <span>$28.50</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t pt-2">
                        <span>Total</span>
                        <span>$74.49</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}