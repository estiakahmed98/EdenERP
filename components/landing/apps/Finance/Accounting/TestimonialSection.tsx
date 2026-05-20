"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
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
            <span className="text-handwritten text-emerald-600 text-3xl">Join 15 million users</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              who grow their business with Eden ERP
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200 relative"
          >
            <Quote className="absolute top-6 right-6 h-12 w-12 text-emerald-200 opacity-50" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              "A VAT closing that used to take 4 days is now done in 3 hours with Eden ERP,
              with a better service for our clients: real-time accounting."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                WV
              </div>
              <div>
                <p className="font-semibold text-gray-900">Wim Van den Brande</p>
                <p className="text-sm text-gray-600">Head of Accounting, KPMG</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-8 shadow-xl text-white"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold">15M+</div>
                <div className="text-sm opacity-90 mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold">98%</div>
                <div className="text-sm opacity-90 mt-1">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold">200+</div>
                <div className="text-sm opacity-90 mt-1">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-sm opacity-90 mt-1">Support</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex -space-x-2">
                {["https://randomuser.me/api/portraits/women/1.jpg", "https://randomuser.me/api/portraits/men/2.jpg", "https://randomuser.me/api/portraits/women/3.jpg"].map(
                  (avatar, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                      <img src={avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                  )
                )}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-xs font-semibold">
                  +5k
                </div>
              </div>
              <p className="text-sm mt-3 opacity-90">Join thousands of happy customers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}