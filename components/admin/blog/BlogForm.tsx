"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { generateSlug } from "@/lib/utils";

interface Blog {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string | Date;
  author: string;
  image: string;
  ads?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

function EditorLoading() {
  const t = useTranslations("admin.blogForm");
  return (
    <div className="h-[400px] border border-border rounded-lg p-4">
      {t("loadingEditor")}
    </div>
  );
}

const RichTextEditor = dynamic(() => import("./JoditEditor"), {
  ssr: false,
  loading: () => <EditorLoading />,
});

interface BlogFormProps {
  blog?: Blog;
  onSuccess?: () => void;
}

export default function BlogForm({ blog, onSuccess }: BlogFormProps) {
  const router = useRouter();
  const t = useTranslations("admin.blogForm");
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAdImage, setUploadingAdImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    image: "",
    ads: "",
  });

  // Generate slug from title
  const slug = generateSlug(formData.title);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (blog) {
      const blogDate =
        typeof blog.date === "string" ? new Date(blog.date) : blog.date;

      setFormData({
        title: blog.title || "",
        summary: blog.summary || "",
        content: blog.content || "",
        date: blogDate.toISOString().split("T")[0],
        author: blog.author || "",
        image: blog.image || "",
        ads: blog.ads || "",
      });
    }
  }, [blog]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = blog ? `/api/blog/${blog.id}` : "/api/blog";
      const method = blog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          blog ? t("toast.updated") : t("toast.created")
        );

        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/admin/blog");
          router.refresh();
        }
      } else {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        if (isJson) {
          const error = await response.json();
          toast.error(error.error || t("toast.wentWrong"));
        } else {
          const text = await response.text();
          console.error("Non-JSON error response:", text);
          toast.error(t("toast.requestFailed"));
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error(t("toast.saveError"));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  // ✅ Main image upload → POST /api/upload (no folder param)
  // /api/upload/${folder} → /api/upload/blogImages

  // 🔹 Main image upload → /api/upload/${folder}
  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const folder = "blogImages"; // public/upload/blogImages এর জন্য

    try {
      setUploadingImage(true);

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`/api/upload/${folder}`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("Image upload failed:", data || res.statusText);
        throw new Error(t("toast.imageUploadFailed"));
      }

      const data = await res.json();

      // ✅ এখানে এখন data.url চেক করবে, fileUrl না
      if (!data.url) {
        console.error("Invalid upload response:", data);
        throw new Error(t("toast.invalidResponse"));
      }

      // এই URL টা সরাসরি image field এ বসবে (DB-তে যাবে)
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));

      toast.success(t("toast.imageUploaded"));
    } catch (err: unknown) {
      console.error("Error uploading image:", err);
      const message =
        err instanceof Error ? err.message : t("toast.imageUploadError");
      toast.error(message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAdImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const folder = "blogAds";

    try {
      setUploadingAdImage(true);

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`/api/upload/${folder}`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        console.error("Ad image upload failed:", data || res.statusText);
        throw new Error(t("toast.adImageUploadFailed"));
      }

      const data = await res.json();

      if (!data.url) {
        console.error("Invalid upload response:", data);
        throw new Error(t("toast.invalidResponse"));
      }

      setFormData((prev) => ({
        ...prev,
        ads: data.url,
      }));

      toast.success(t("toast.adImageUploaded"));
    } catch (err: unknown) {
      console.error("Error uploading ad image:", err);
      const message =
        err instanceof Error ? err.message : t("toast.adImageUploadError");
      toast.error(message);
    } finally {
      setUploadingAdImage(false);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow">
      <h2 className="text-lg font-semibold p-4">{blog ? t("editHeading") : t("createHeading")}</h2>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground/80 mb-2"
          >
            {t("titleLabel")}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            placeholder={t("titlePlaceholder")}
          />

          {/* Slug Preview */}
          <div className="mt-2 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{t("slug")}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              blog/{slug}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-foreground/80 mb-2"
            >
              {t("authorLabel")}
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
              placeholder={t("authorPlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-foreground/80 mb-2"
            >
              {t("dateLabel")}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            {t("summaryLabel")}
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder={t("summaryPlaceholder")}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            {t("contentLabel")}
          </label>
          {isClient && (
            <RichTextEditor
              initialValue={formData.content}
              onContentChange={handleContentChange}
              height="400px"
            />
          )}
        </div>

        {/* Featured Image (upload + URL) */}
        <div className="space-y-2">
          <Label>{t("featuredImage")}</Label>

          {/* Preview */}
          {formData.image && (
              <div className="mb-3 flex items-center gap-4">
              <img
                src={formData.image}
                alt={t("featuredAlt")}
                className="w-24 h-24 rounded-md object-cover border"
              />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                className="text-xs text-destructive hover:underline"
              >
                {t("removeImage")}
              </button>
            </div>
          )}

          <label className="inline-flex items-center gap-2 w-fit cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
              disabled={uploadingImage}
            />
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-primary/20 bg-primary/10 text-sm text-primary">
              <Upload className="h-4 w-4" />
              {uploadingImage ? t("uploading") : t("uploadImage")}
            </span>
          </label>

          {/* Optional: manual URL input */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder={t("imageUrlPlaceholder")}
            className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring focus:border-ring"
          />
        </div>

        <div className="space-y-2">
          <Label>{t("adImage")}</Label>

          {formData.ads && (
            <div className="mb-3 flex items-center gap-4">
              <img
                src={formData.ads}
                alt={t("adAlt")}
                className="w-24 h-24 rounded-md object-cover border"
              />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, ads: "" }))}
                className="text-xs text-destructive hover:underline"
              >
                {t("removeAdImage")}
              </button>
            </div>
          )}

          <label className="inline-flex items-center gap-2 w-fit cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAdImageFileChange}
              disabled={uploadingAdImage}
            />
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-primary/20 bg-primary/10 text-sm text-primary">
              <Upload className="h-4 w-4" />
              {uploadingAdImage ? t("uploading") : t("uploadAdImage")}
            </span>
          </label>

          <input
            type="text"
            name="ads"
            value={formData.ads}
            onChange={handleChange}
            placeholder={t("adUrlPlaceholder")}
            className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring focus:border-ring"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-border rounded-lg text-foreground/80 hover:bg-muted"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 btn-gradient text-white rounded-lg disabled:opacity-50"
          >
            {loading ? t("saving") : blog ? t("update") : t("create")}
          </button>
        </div>
      </form>
    </div>
  );
}
