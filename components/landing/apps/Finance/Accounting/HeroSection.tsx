"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-emerald-50/30">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
            <Sparkles className="h-4 w-4" />
            AI-Native Accounting Platform
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-gray-900 leading-tight"
        >
          Accounting made
          <br />
          <span className="text-handwritten text-emerald-600 inline-block mt-2">
            effortless
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 text-center max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          Imagine one AI-native Accounting platform for all your financial operations,
          from reconciliation and expenses to tax returns and real-time reporting.
          Fast, complete, and simple.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <button className="group bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            Start Free Trial
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
          </button>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
            <Play className="h-5 w-5" />
            Watch Demo
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          No credit card required • Instant access
        </motion.p>

        {/* Floating Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-20" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm text-gray-600">Accounting Dashboard</span>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Customer Invoices</h3>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm">5 Unpaid</span>
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-lg text-sm">3 Late</span>
                      </div>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-600">Invoice Chart Placeholder</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="text-3xl font-bold text-gray-900">$9,944.87</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Last Statement</span>
                          <span className="font-semibold">$6,378.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Payments</span>
                          <span className="font-semibold text-emerald-600">+$8,578.50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200"
        >
          {[
            { value: "98%", label: "Recognition Rate", icon: Shield },
            { value: "<90ms", label: "Processing Speed", icon: Zap },
            { value: "28,000+", label: "Banks Supported", icon: TrendingUp },
            { value: "15M+", label: "Users Worldwide", icon: Sparkles },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <stat.icon className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}