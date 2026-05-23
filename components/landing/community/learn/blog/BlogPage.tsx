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
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-center text-5xl font-bold tracking-tight text-foreground">
            Our Latest Posts
          </h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Posts Column */}
            <div>
              {/* Categories Filter */}
              <div className="mb-10 flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                <button className="text-primary font-semibold">All</button>
                <button className="hover:text-primary transition-colors">Customer Reviews</button>
                <button className="hover:text-primary transition-colors">Employee Testimonials</button>
                <button className="hover:text-primary transition-colors">Partner Stories</button>
                <button className="hover:text-primary transition-colors">Adon News</button>
                <button className="hover:text-primary transition-colors">Business Hacks</button>
              </div>

              {/* Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.title}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.date}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-foreground">
                        {post.title}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Discover how modern businesses use smart ERP, CRM,
                        automation, analytics, and integrations to scale
                        operations efficiently.
                      </p>

                      <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80">
                        Read More
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted/30 transition">
                  2
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted/30 transition">
                  3
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted/30 transition">
                  4
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted/30 transition">
                  133
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground hover:bg-muted/30 transition">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                {/* Search */}
                <div className="flex items-center rounded-lg border border-input px-4 py-3">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <Search size={18} className="text-muted-foreground" />
                </div>

                {/* Archives */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
                    Archives
                  </h3>
                  <select className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none text-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20">
                    <option>All dates</option>
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        className="rounded-full border border-border bg-muted/30 px-4 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
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