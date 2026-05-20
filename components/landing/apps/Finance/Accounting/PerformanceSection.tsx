"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Clock, Rocket, Gauge } from "lucide-react";

export default function PerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-20" />
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 px-6 py-4">
                <div className="flex items-center justify-between text-white">
                  <span className="font-semibold">Vendor Bill</span>
                  <span className="text-sm opacity-90">BILL/2024/11/0001</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendor</span>
                  <span className="font-medium">Azure Interior</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Office Design Software</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Office Chair (x5)</span>
                    <span>$20.00</span>
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$30.00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block mb-4">
              <span className="text-handwritten text-emerald-600 text-2xl">Unlock true</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              performance
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Speed matters. All operations are processed in less than 90 milliseconds,
              faster than the blink of an eye. It helps accountants do much more in less time.
            </p>

            <div className="space-y-6">
              {[
                { icon: Clock, value: "5 seconds", label: "From login to vendor bill", color: "emerald" },
                { icon: Rocket, value: "90ms", label: "Processing speed", color: "cyan" },
                { icon: Gauge, value: "3x", label: "Faster month-end close", color: "purple" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}