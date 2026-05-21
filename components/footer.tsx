"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Apps", href: "/apps" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
      { label: "Help", href: "/help" },
    ],
    Company: [
      { label: "Community", href: "/community" },
      { label: "Learn", href: "/community/learn" },
      { label: "Get Services", href: "/community/get-services" },
      { label: "Collaborate", href: "/community/collaborate" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "Documentation", href: "/community/learn/documentation" },
      { label: "Tutorials", href: "/community/learn/tutorials" },
      { label: "Training", href: "/community/learn/training" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-slate-200 bg-linear-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-4 inline-flex items-center gap-2">
              <span
                className="text-2xl font-black"
                style={{
                  fontFamily:
                    '"Hauser Script", "Segoe Script", "Brush Script MT", "Segoe Print", cursive',
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0ea5e9 70%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Eden-ERP
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600">
              Unified apps for finance, sales, operations, and growth in one
              connected ERP platform.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-slate-500 transition-colors hover:text-cyan-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-cyan-700">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-cyan-700">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-500 transition-colors hover:text-cyan-700">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={`${section}:${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Eden ERP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/pricing"
              className="rounded-xl bg-linear-to-r from-[#5B3B5F] to-cyan-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Try it free
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
