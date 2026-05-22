// app/blog/page.tsx

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronRight,
} from "lucide-react";

const posts = [
  {
    title: "Access Management Suite",
    image: "/Assets/apps/Access Management Suite.jpg",
    category: "Security",
    date: "May 24, 2026",
  },
  {
    title: "Accounting Suite for Modern Businesses",
    image: "/Assets/apps/Accounting Suite.jpg",
    category: "Accounting",
    date: "May 24, 2026",
  },
  {
    title: "AI Business Dashboard Analytics",
    image: "/Assets/apps/AI Business Dashboard.jpg",
    category: "Analytics",
    date: "May 23, 2026",
  },
  {
    title: "Advanced BI Dashboard Reporting",
    image: "/Assets/apps/BI Dashboard.png",
    category: "Business Intelligence",
    date: "May 23, 2026",
  },
  {
    title: "Contact Field Validation System",
    image: "/Assets/apps/Contact Field Validation.jpg",
    category: "CRM",
    date: "May 22, 2026",
  },
  {
    title: "Customer Follow-ups Automation",
    image: "/Assets/apps/Customer Follow-ups.webp",
    category: "Customer Success",
    date: "May 22, 2026",
  },
  {
    title: "Delivery Shipping Connector",
    image: "/Assets/apps/Delivery Shipping Connector.avif",
    category: "Logistics",
    date: "May 21, 2026",
  },
  {
    title: "Direct Print Pro Solution",
    image: "/Assets/apps/Direct Print Pro.jpg",
    category: "Printing",
    date: "May 21, 2026",
  },
  {
    title: "Export Manager for Enterprises",
    image: "/Assets/apps/Export Manager.jpg",
    category: "Finance",
    date: "May 20, 2026",
  },
  {
    title: "IT Hardware & Support Services",
    image: "/Assets/apps/IT Hardware & Support.jpg",
    category: "IT Services",
    date: "May 20, 2026",
  },
  {
    title: "Multi Currency Financial Reports",
    image: "/Assets/apps/Multi Currency Reports.jpg",
    category: "Accounting",
    date: "May 19, 2026",
  },
  {
    title: "Shopify Connector Integration",
    image: "/Assets/apps/Shopify-Connector.jpg",
    category: "eCommerce",
    date: "May 19, 2026",
  },
];

const tags = [
  "Accounting",
  "CRM",
  "Analytics",
  "Security",
  "Manufacturing",
  "Finance",
  "eCommerce",
  "Logistics",
  "Marketing",
  "Technology",
  "ERP",
  "Business",
  "Automation",
  "Dashboard",
  "IT Services",
  "Customer Success",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7]">

      {/* Hero */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-center text-5xl font-bold tracking-tight text-slate-900">
            Our Latest Posts
          </h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Posts */}
            <div>
              {/* Categories */}
              <div className="mb-10 flex flex-wrap gap-4 text-sm font-medium text-slate-600">
                <button className="text-[#714B67]">All</button>
                <button>Customer Reviews</button>
                <button>Employee Testimonials</button>
                <button>Partner Stories</button>
                <button>Adon News</button>
                <button>Business Hacks</button>
              </div>

              {/* Grid */}
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.title}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-[#714B67]">
                          {post.category}
                        </span>

                        <span className="text-xs text-slate-500">
                          {post.date}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-slate-800">
                        {post.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        Discover how modern businesses use smart ERP, CRM,
                        automation, analytics, and integrations to scale
                        operations efficiently.
                      </p>

                      <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#714B67] transition hover:text-[#5f3f56]">
                        Read More
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#714B67] text-white">
                  1
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white">
                  2
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white">
                  3
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white">
                  4
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white">
                  133
                </button>

                <button className="flex h-10 w-10 items-center justify-center rounded-md border bg-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              {/* Search */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center rounded-lg border border-slate-200 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm outline-none"
                  />

                  <Search size={18} className="text-slate-500" />
                </div>

                {/* Archives */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                    Archives
                  </h3>

                  <select className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none">
                    <option>All dates</option>
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-700">
                    Tags
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-[#714B67] hover:bg-[#714B67] hover:text-white"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}