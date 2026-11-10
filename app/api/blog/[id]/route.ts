import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
import { sanitizeRichHtml } from "@/lib/security/sanitize-html";

// GET single blog by ID - Public access (for backward compatibility)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blogId = Number(id);
    if (!Number.isInteger(blogId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// UPDATE blog - Admin only
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const blogId = Number(id);
    if (!Number.isInteger(blogId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Only allow fields in your schema
    const {
      title: rawTitle,
      summary,
      content,
      date,
      author,
      image,
      ads,
    }: {
      title?: unknown;
      summary?: unknown;
      content?: unknown;
      date?: unknown;
      author?: unknown;
      image?: unknown;
      ads?: unknown;
    } = await req.json();

    const title = typeof rawTitle === "string" ? rawTitle.trim().slice(0, 200) : "";
    const parsedDate = typeof date === "string" && date ? new Date(date) : null;
    if (parsedDate && Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    // Generate new slug if title is being updated
    const updateData: {
      title?: string;
      slug?: string;
      summary: string;
      content?: string;
      date: Date;
      author: string;
      image: string;
      ads: string | null;
    } = {
      summary:
        typeof summary === "string" && summary.trim().length > 0
          ? sanitizeRichHtml(summary.slice(0, 4000)).trim().slice(0, 2000)
          : existingBlog.summary,
      date: parsedDate ?? existingBlog.date,
      author:
        typeof author === "string" && author.trim()
          ? author.trim().slice(0, 200)
          : existingBlog.author,
      image: typeof image === "string" ? image.trim().slice(0, 500) : existingBlog.image,
      ads:
        typeof ads === "string" && ads.trim().length > 0
          ? ads.trim().slice(0, 500)
          : existingBlog.ads,
    };

    // Previously ignored, so content edits from the admin form were silently lost.
    if (typeof content === "string") {
      updateData.content = sanitizeRichHtml(content.slice(0, 250000));
    }

    if (title && title !== existingBlog.title) {
      let newSlug = generateSlug(title);
      
      // Check if new slug already exists (excluding current blog)
      const existingSlug = await prisma.blog.findFirst({ 
        where: { 
          slug: newSlug,
          id: { not: blogId }
        }
      });
      
      if (existingSlug) {
        let counter = 1;
        let uniqueSlug = `${newSlug}-${counter}`;
        while (await prisma.blog.findFirst({ 
          where: { 
            slug: uniqueSlug,
            id: { not: blogId }
          }
        })) {
          counter++;
          uniqueSlug = `${newSlug}-${counter}`;
        }
        newSlug = uniqueSlug;
      }
      
      updateData.title = title;
      updateData.slug = newSlug;
    }

    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE blog - Admin only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const blogId = Number(id);
    if (!Number.isInteger(blogId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const existing = await prisma.blog.findUnique({
      where: { id: blogId },
    });
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { id: blogId } });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
