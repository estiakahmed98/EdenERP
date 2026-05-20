"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// অ্যাপস ডেটা স্ট্রাকচার
interface AppItem {
  name: string;
  icon: string;
  alternative?: string;
  arrowPosition?: "top" | "top-left" | "top-right" | "left" | "right" | "bottom" | "bottom-left" | "bottom-right";
  arrowDirection?: "↗" | "↖" | "↘" | "↙" | "→" | "←" | "↑" | "↓";
}

const appsData: AppItem[] = [
  // ১ম সারি
  { name: "Accounting", icon: "📊", alternative: "Quickbooks", arrowPosition: "top-left", arrowDirection: "↖" },
  { name: "Knowledge", icon: "📘", alternative: "Notion", arrowPosition: "top", arrowDirection: "↑" },
  { name: "Sign", icon: "✍️", alternative: "DocuSign", arrowPosition: "top", arrowDirection: "↑" },
  { name: "CRM", icon: "🤝", alternative: "Salesforce", arrowPosition: "top-right", arrowDirection: "↗" },
  { name: "Studio", icon: "🛠️", alternative: "Power Apps", arrowPosition: "top-right", arrowDirection: "↗" },
  { name: "Subscriptions", icon: "🔄", alternative: "Chargebee", arrowPosition: "top-right", arrowDirection: "↗" },
  
  // ২য় সারি
  { name: "AI", icon: "🤖", alternative: "Nothing seamless", arrowPosition: "left", arrowDirection: "←" },
  { name: "Point of Sale", icon: "🏪", alternative: "Lightspeed", arrowPosition: "bottom-left", arrowDirection: "↙" },
  { name: "Discuss", icon: "💬", alternative: "Slack", arrowPosition: "top-right", arrowDirection: "↗" },
  { name: "Documents", icon: "📂", arrowDirection: "→" },
  { name: "Project", icon: "✅", alternative: "Asana", arrowPosition: "left", arrowDirection: "←" },
  { name: "Timesheets", icon: "⏱️", alternative: "Harvest", arrowPosition: "right", arrowDirection: "→" },
  
  // ৩য় সারি
  { name: "Field Service", icon: "⚡", alternative: "Service cloud", arrowPosition: "left", arrowDirection: "←" },
  { name: "Planning", icon: "🔀", arrowDirection: "↗" },
  { name: "Helpdesk", icon: "➕", alternative: "Zendesk", arrowPosition: "bottom-left", arrowDirection: "↙" },
  { name: "eCommerce", icon: "🛍️", alternative: "Shopify", arrowPosition: "bottom-right", arrowDirection: "↘" },
  { name: "Website", icon: "🌐", arrowDirection: "↗" },
  { name: "Email Marketing", icon: "🚀", alternative: "Hubspot", arrowPosition: "right", arrowDirection: "→" },
  
  // ৪র্থ সারি
  { name: "Purchase", icon: "💳", arrowDirection: "↓" },
  { name: "Inventory", icon: "📦", arrowDirection: "↘" },
  { name: "Manufacturing", icon: "🏭", arrowDirection: "↙" },
  { name: "Sales", icon: "📈", arrowDirection: "↗" },
  { name: "HR", icon: "👥", alternative: "BambooHR", arrowPosition: "bottom-right", arrowDirection: "↘" },
  { name: "Dashboard", icon: "🎛️", alternative: "Tableau", arrowPosition: "bottom-right", arrowDirection: "↘" },
];

// অ্যারো পজিশনের জন্য স্টাইল
const getArrowStyle = (pos?: string) => {
  switch (pos) {
    case "top-left": return "absolute -top-12 -left-16";
    case "top": return "absolute -top-12 left-1/2 -translate-x-1/2";
    case "top-right": return "absolute -top-12 -right-16";
    case "left": return "absolute top-1/2 -left-20 -translate-y-1/2";
    case "right": return "absolute top-1/2 -right-20 -translate-y-1/2";
    case "bottom-left": return "absolute -bottom-12 -left-16";
    case "bottom-right": return "absolute -bottom-12 -right-16";
    default: return "absolute -top-12 left-1/2 -translate-x-1/2";
  }
};

// অ্যারো টাইপ অনুযায়ী ভিন্ন ভিন্ন স্টাইল
const getArrowLineStyle = (direction?: string) => {
  switch (direction) {
    case "↗": return "transform rotate-0";
    case "↖": return "transform rotate-90";
    case "↘": return "transform -rotate-90";
    case "↙": return "transform rotate-180";
    case "→": return "transform rotate-0";
    case "←": return "transform rotate-180";
    case "↑": return "transform -rotate-90";
    case "↓": return "transform rotate-90";
    default: return "";
  }
};

export default function EdenAppsSection() {
  const [showAlternatives, setShowAlternatives] = useState(false);

  return (
    <section className="w-full min-h-screen bg-linear-to-b from-slate-50 to-white py-20 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      
      {/* Eden ERP Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
          <span className="text-[#875A7B]">E</span>
          <span className="text-[#A24689]">d</span>
          <span className="text-[#7C7BAD]">e</span>
          <span className="text-[#5C5C5C]">n</span>
          <span className="ml-3 text-gray-700 text-4xl sm:text-5xl md:text-6xl font-semibold">ERP</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm tracking-wide">All-in-one business management platform</p>
      </div>

      {/* অ্যাপস গ্রিড */}
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 md:gap-x-8 gap-y-14 justify-items-center items-center">
          
          {appsData.map((app, index) => (
            <div key={index} className="relative flex flex-col items-center group">
              
              {/* অল্টারনেটিভ টেক্সট + অ্যারো */}
              <AnimatePresence>
                {showAlternatives && app.alternative && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`${getArrowStyle(app.arrowPosition)} z-10 pointer-events-none flex items-center gap-2 whitespace-nowrap`}
                  >
                    {/* ভিন্ন ভিন্ন অ্যারো সিম্বল */}
                    <span className={`text-purple-500 text-xl font-bold ${getArrowLineStyle(app.arrowDirection)}`}>
                      {app.arrowDirection || "↗"}
                    </span>
                    <span className="font-serif italic text-purple-700 text-sm md:text-base font-medium bg-purple-50 px-3 py-1 rounded-full shadow-sm">
                      {app.alternative}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* আইকন বক্স - মিনিমালিস্ট */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-2xl md:text-3xl border border-gray-100 cursor-pointer group-hover:border-purple-200 group-hover:scale-105">
                {app.icon}
              </div>

              {/* অ্যাপের নাম */}
              <span className="mt-3 text-[11px] md:text-xs font-medium text-gray-500 text-center tracking-wide group-hover:text-purple-700 transition-colors">
                {app.name}
              </span>
            </div>
          ))}
        </div>

        {/* SAP ব্র্যাকেট */}
        <AnimatePresence>
          {showAlternatives && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-[-50px] left-[30%] right-[30%] flex flex-col items-center pointer-events-none"
            >
              <div className="w-full h-[2px] bg-linear-to-r from-transparent via-purple-400 to-transparent" />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-purple-500 text-xl">↘</span>
                <span className="font-serif italic text-purple-700 text-lg font-bold">SAP</span>
                <span className="text-purple-500 text-xl">↙</span>
              </div>
              <div className="w-2/3 h-[2px] bg-linear-to-r from-purple-400 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* কন্ট্রোল বার */}
      <div className="w-full max-w-4xl mt-24 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* টগল সুইচ */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setShowAlternatives(!showAlternatives)}
        >
          <div className="relative">
            <span className={`absolute -top-5 -left-5 text-lg transition-all duration-300 ${showAlternatives ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`}>
              ✨
            </span>
            <div className={`w-12 h-6 rounded-full transition-all duration-300 p-0.5 ${showAlternatives ? "bg-linear-to-r from-purple-600 to-purple-800" : "bg-gray-300"}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${showAlternatives ? "translate-x-6" : "translate-x-0"}`} />
            </div>
          </div>
          <span className={`text-sm font-medium select-none transition-all duration-300 ${showAlternatives ? "text-purple-700 font-semibold" : "text-gray-500"}`}>
            {showAlternatives ? "Imagine without EdenERP ✨" : "Compare alternatives"}
          </span>
        </div>

        {/* অল অ্যাপস লিংক */}
        <a 
          href="#all-apps" 
          className="group flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800 transition-all duration-200"
        >
          View all 50+ apps
          <span className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
        </a>
      </div>
    </section>
  );
}