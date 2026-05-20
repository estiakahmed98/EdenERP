"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, FileText, Users } from "lucide-react";

const filters = ["Categories", "All Prices", "All Platforms", "All Versions"];

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState("Categories");

  return (
    <div className="border-b border-gray-200 bg-white sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4 gap-4">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeFilter === filter
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {filter}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Right Side Links */}
          <div className="flex gap-6 text-sm">
            <button className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition">
              <FileText className="h-4 w-4" />
              Sales Conditions
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition">
              <Users className="h-4 w-4" />
              Vendor Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}