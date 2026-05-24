import Image from "next/image";
import {
  Search,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

type BlogPost = {
  title: string;
  image: string;
  category: string;
  date: string;
};

export default function BlogPage() {
  const t = useTranslations("pages.community.blog");
  const posts = t.raw("posts") as BlogPost[];
  const categories = t.raw("hero.categories") as string[];
  const tags = t.raw("tags") as string[];
  const dates = t.raw("pagination.dates") as string[];
  const lastPage = t("pagination.lastPage");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-center text-5xl font-bold tracking-tight text-foreground">
            {t("hero.title")}
          </h1>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Posts Column */}
            <div>
              {/* Categories Filter */}
              <div className="mb-10 flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    className={
                      index === 0
                        ? "text-primary font-semibold"
                        : "transition-colors hover:text-primary"
                    }
                  >
                    {category}
                  </button>
                ))}
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
                        {t("description")}
                      </p>

                      <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80">
                        {t("readMore")}
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
                  {lastPage}
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
                    placeholder={t("sidebar.search")}
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <Search size={18} className="text-muted-foreground" />
                </div>

                {/* Archives */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
                    {t("sidebar.archives")}
                  </h3>
                  <select className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none text-foreground focus:border-primary/40 focus:ring-1 focus:ring-primary/20">
                    <option>{t("sidebar.allDates")}</option>
                    {dates.map((date) => (
                      <option key={date}>{date}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
                    {t("sidebar.tags")}
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
