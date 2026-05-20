"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Scan, FileCheck, ArrowRight } from "lucide-react";

export default function AutomationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-handwritten text-emerald-600 text-3xl">No data entry!</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Just automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Experience zero data entry. Our advanced AI-powered invoice data capture has a 98% recognition rate.
              All you have to do is to validate the invoice.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Scan,
              title: "Smart OCR",
              description: "Automatically extract data from any invoice format",
              gradient: "from-emerald-500 to-cyan-500",
            },
            {
              icon: Bot,
              title: "AI Matching",
              description: "Match transactions with 95% accuracy automatically",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: FileCheck,
              title: "Auto-Validation",
              description: "Validate invoices with one click, zero manual entry",
              gradient: "from-cyan-500 to-blue-500",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 p-8 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 rounded-2xl border border-emerald-100"
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Scan className="h-10 w-10 text-emerald-600" />
            </div>
            <p className="mt-2 text-sm font-medium">Scan</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Bot className="h-10 w-10 text-cyan-600" />
            </div>
            <p className="mt-2 text-sm font-medium">AI Process</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <FileCheck className="h-10 w-10 text-emerald-600" />
            </div>
            <p className="mt-2 text-sm font-medium">Validate</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <p className="mt-2 text-sm font-medium text-emerald-600">Done!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}