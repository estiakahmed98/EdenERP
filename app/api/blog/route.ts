import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';
import { sanitizeRichHtml } from '@/lib/security/sanitize-html';


// GET all blogs - Public access
export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    const rawPage = Number.parseInt(searchParams.get('page') || '1', 10);
    const rawLimit = Number.parseInt(searchParams.get('limit') || '10', 10);
    const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.min(rawPage, 1000) : 1;
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 50) : 10;
    const search = (searchParams.get('search') || '').trim().slice(0, 100);

    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { author: { contains: search, mode: 'insensitive' as const } },
        { summary: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {};

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blog.count({ where })
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// CREATE new blog - Admin only
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, summary, content, date, author, image, ads } = body;

    if (!title || !date || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const safeTitle = String(title).trim().slice(0, 200);
    const safeAuthor = String(author).trim().slice(0, 200);

    if (!safeTitle || !safeAuthor) {
      return NextResponse.json(
        { error: 'Title and author are required' },
        { status: 400 }
      );
    }
    const safeSummary = typeof summary === 'string' ? sanitizeRichHtml(summary.slice(0, 4000)).trim().slice(0, 2000) : '';
    const safeContent = typeof content === 'string' ? sanitizeRichHtml(content.slice(0, 250000)) : '';
    const safeImage = typeof image === 'string' ? image.trim().slice(0, 500) : '';
    const safeAds = typeof ads === 'string' ? ads.trim().slice(0, 500) : null;

    function cleanSummary(text: string, maxLength: number = 300) {
      if (!text) return "";

      const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

      if (clean.length <= maxLength) return clean;

      const sentences = clean.split(/(?<=[।!?])/).map(s => s.trim()).filter(Boolean);

        let final = "";
        for (const s of sentences) {
        if ((final + " " + s).trim().length <= maxLength) {
          final += (final ? " " : "") + s;
        } else break;
      }

      if (!final) {
        const cut = clean.substring(0, maxLength);
        return cut.substring(0, cut.lastIndexOf(" ")) + "...";
      }

      return final.trim();
    }

    const computedSummary =
      safeSummary && safeSummary.length > 0
        ? safeSummary
        : cleanSummary(safeContent || "");

    // Generate unique slug
    let slug = generateSlug(safeTitle);
    
    // Check if slug already exists and make it unique
    const existingBlog = await prisma.blog.findUnique({ where: { slug } });
    if (existingBlog) {
      let counter = 1;
      let uniqueSlug = `${slug}-${counter}`;
      while (await prisma.blog.findUnique({ where: { slug: uniqueSlug } })) {
        counter++;
        uniqueSlug = `${slug}-${counter}`;
      }
      slug = uniqueSlug;
    }

    const blog = await prisma.blog.create({
      data: {
        slug,
        title: safeTitle,
        summary: computedSummary,
        content: safeContent,
        date: new Date(date),
        author: safeAuthor,
        image: safeImage,
        ads: safeAds,
      }
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
