"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutGrid,
  List,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { processBlogSummary } from "./summaryUtils";

const BlogForm = dynamic(() => import("./BlogForm"), { ssr: false });

interface Blog {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string | Date;
  image?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type View = "grid" | "list";
const PAGE_SIZE = 12;
const VIEW_KEY = "admin-blog-view";

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const initialsOf = (name: string) => {
  const parts = (name || "?").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
};

function Cover({ blog, className }: { blog: Blog; className?: string }) {
  return blog.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={blog.image}
      alt=""
      loading="lazy"
      className={cn("size-full object-cover", className)}
    />
  ) : (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-linear-to-br from-primary/15 to-secondary/20 text-primary/50",
        className,
      )}
    >
      <FileText className="size-10" aria-hidden="true" />
    </div>
  );
}

function Author({ blog, light }: { blog: Blog; light?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-xs font-medium",
        light ? "text-white/85" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-full text-[10px] font-bold",
          light ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
        )}
      >
        {initialsOf(blog.author)}
      </span>
      <span className="truncate">{blog.author}</span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <CalendarDays className="size-3" aria-hidden="true" />
        {formatDate(blog.date)}
      </span>
    </span>
  );
}

function Actions({
  blog,
  onDelete,
  floating,
}: {
  blog: Blog;
  onDelete: (blog: Blog) => void;
  floating?: boolean;
}) {
  const base =
    "flex size-9 items-center justify-center rounded-xl transition-colors";
  const edit = floating
    ? "bg-white/90 text-slate-800 shadow-md backdrop-blur hover:bg-white hover:text-primary"
    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary";
  const del = floating
    ? "bg-white/90 text-slate-800 shadow-md backdrop-blur hover:bg-destructive hover:text-white"
    : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive";
  return (
    <div
      className={cn(
        "flex gap-1.5",
        floating &&
          "absolute right-3 top-3 z-10 translate-y-1 opacity-0 transition-all group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Link
        href={`/admin/blog/edit/${blog.id}`}
        aria-label={`Edit ${blog.title}`}
        title="Edit"
        className={cn(base, edit)}
      >
        <Pencil className="size-4" />
      </Link>
      <button
        type="button"
        aria-label={`Delete ${blog.title}`}
        title="Delete"
        onClick={() => onDelete(blog)}
        className={cn(base, del)}
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

/** Large hero card for the newest post. */
function FeaturedCard({
  blog,
  onDelete,
}: {
  blog: Blog;
  onDelete: (blog: Blog) => void;
}) {
  return (
    <article className="group relative min-h-80 overflow-hidden rounded-3xl bg-secondary shadow-lg md:col-span-2">
      <Cover
        blog={blog}
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/5" />
      <Link
        href={`/admin/blog/edit/${blog.id}`}
        aria-label={`Edit ${blog.title}`}
        className="absolute inset-0 z-0"
      />
      <Actions blog={blog} onDelete={onDelete} floating />
      <div className="pointer-events-none relative z-0 flex h-full min-h-80 flex-col justify-end gap-3 p-6 md:p-8">
        <span className="w-fit rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Latest
        </span>
        <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white md:text-3xl">
          {blog.title}
        </h3>
        <p className="line-clamp-2 max-w-2xl text-sm text-white/75">
          {processBlogSummary(blog.summary, 180)}
        </p>
        <Author blog={blog} light />
      </div>
    </article>
  );
}

function PostCard({
  blog,
  onDelete,
}: {
  blog: Blog;
  onDelete: (blog: Blog) => void;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-16/10 overflow-hidden">
        <Cover
          blog={blog}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <Actions blog={blog} onDelete={onDelete} floating />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <Link
          href={`/admin/blog/edit/${blog.id}`}
          className="after:absolute after:inset-0 after:z-0"
        >
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {blog.title}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {processBlogSummary(blog.summary, 140)}
        </p>
        <div className="border-t border-border pt-3">
          <Author blog={blog} />
        </div>
      </div>
    </article>
  );
}

function PostRow({
  blog,
  onDelete,
}: {
  blog: Blog;
  onDelete: (blog: Blog) => void;
}) {
  return (
    <article className="group flex items-center gap-4 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-primary/30">
      <Link
        href={`/admin/blog/edit/${blog.id}`}
        className="size-20 shrink-0 overflow-hidden rounded-xl sm:size-24"
        aria-label={`Edit ${blog.title}`}
      >
        <Cover blog={blog} />
      </Link>
      <div className="min-w-0 flex-1 space-y-1.5">
        <Link href={`/admin/blog/edit/${blog.id}`}>
          <h3 className="truncate text-base font-bold text-foreground group-hover:text-primary">
            {blog.title}
          </h3>
        </Link>
        <p className="line-clamp-1 text-sm text-muted-foreground sm:line-clamp-2">
          {processBlogSummary(blog.summary, 160)}
        </p>
        <Author blog={blog} />
      </div>
      <div className="shrink-0 pr-1">
        <Actions blog={blog} onDelete={onDelete} />
      </div>
    </article>
  );
}

export default function BlogCard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [view, setView] = useState<View>("grid");
  const [toDelete, setToDelete] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(VIEW_KEY);
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  const changeView = (next: View) => {
    setView(next);
    window.localStorage.setItem(VIEW_KEY, next);
  };

  // Debounce search to reduce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: String(PAGE_SIZE),
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
      });
      const response = await fetch(`/api/blog?${params}`, {
        cache: debouncedSearchTerm ? "no-store" : "default",
        next: { revalidate: debouncedSearchTerm ? 0 : 60 },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      if (data) {
        setBlogs(data.blogs || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Blog posts could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    void fetchBlogs();
  }, [fetchBlogs]);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/blog/${toDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("delete failed");
      toast.success(`Deleted “${toDelete.title}”`);
      setToDelete(null);
      if (blogs.length === 1 && page > 1) setPage((p) => p - 1);
      else void fetchBlogs();
    } catch {
      toast.error("The blog post could not be deleted.");
    } finally {
      setDeleting(false);
    }
  }

  const showFeatured =
    view === "grid" && page === 1 && !debouncedSearchTerm && blogs.length > 1;
  const featured = showFeatured ? blogs[0] : undefined;
  const rest = showFeatured ? blogs.slice(1) : blogs;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1,
  );

  return (
    <div className="w-full space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Blog
            </h2>
            {!loading || totalCount > 0 ? (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                {totalCount} {totalCount === 1 ? "post" : "posts"}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Write, publish and manage the stories on your website.
          </p>
        </div>
        <Button size="lg" className="rounded-xl" onClick={() => setIsModalOpen(true)}>
          <Plus /> New post
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-card p-2.5 shadow-sm ring-1 ring-border">
        <div className="relative min-w-52 flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            aria-label="Search blog posts"
            placeholder="Search by title or author…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 rounded-xl border-0 bg-muted/60 pl-10 shadow-none"
          />
        </div>
        {searchTerm && (
          <Button variant="ghost" onClick={() => setSearchTerm("")}>
            <X /> Clear
          </Button>
        )}
        <div
          role="group"
          aria-label="Layout"
          className="flex rounded-xl bg-muted/60 p-1"
        >
          {(
            [
              ["grid", LayoutGrid, "Grid"],
              ["list", List, "List"],
            ] as const
          ).map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              aria-label={`${label} view`}
              title={`${label} view`}
              onClick={() => changeView(key)}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg transition-colors",
                view === key
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading && !blogs.length ? (
        view === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        )
      ) : blogs.length ? (
        <>
          {view === "grid" ? (
            <div
              className={cn(
                "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                loading && "opacity-60 transition-opacity",
              )}
            >
              {featured && <FeaturedCard blog={featured} onDelete={setToDelete} />}
              {rest.map((blog) => (
                <PostCard key={blog.id} blog={blog} onDelete={setToDelete} />
              ))}
            </div>
          ) : (
            <div className={cn("space-y-3", loading && "opacity-60")}>
              {blogs.map((blog) => (
                <PostRow key={blog.id} blog={blog} onDelete={setToDelete} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex items-center justify-between gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border"
            >
              <span className="pl-2 text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous page"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft />
                </Button>
                {pageNumbers.map((n, i) => (
                  <span key={n} className="flex items-center">
                    {i > 0 && n - pageNumbers[i - 1] > 1 && (
                      <span className="px-1 text-muted-foreground">…</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(n)}
                      aria-current={n === page ? "page" : undefined}
                      className={cn(
                        "size-8 rounded-lg text-sm font-semibold transition-colors",
                        n === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {n}
                    </button>
                  </span>
                ))}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next page"
                  disabled={page >= totalPages || loading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-card px-6 py-20 text-center shadow-sm ring-1 ring-border">
          <span className="flex size-20 items-center justify-center rounded-3xl bg-linear-to-br from-primary/15 to-secondary/20 text-primary">
            <FileText className="size-9" />
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">
              {debouncedSearchTerm ? "No posts match your search" : "No posts yet"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {debouncedSearchTerm
                ? "Try a different title or author."
                : "Write your first post and it will show up here."}
            </p>
          </div>
          {!debouncedSearchTerm && (
            <Button size="lg" className="rounded-xl" onClick={() => setIsModalOpen(true)}>
              <Plus /> Write the first post
            </Button>
          )}
        </div>
      )}

      {/* New post */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-6xl overflow-y-auto p-2 sm:max-w-6xl sm:p-4">
          <DialogTitle className="sr-only">New blog post</DialogTitle>
          <DialogDescription className="sr-only">
            Fill in the details to publish a new blog post.
          </DialogDescription>
          <BlogForm
            onSuccess={() => {
              setIsModalOpen(false);
              toast.success("Blog post published");
              void fetchBlogs();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={toDelete !== null}
        onOpenChange={(open) => !open && !deleting && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete
                ? `“${toDelete.title}” will be permanently removed from the website. This can't be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
