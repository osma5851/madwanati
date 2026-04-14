import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, createArticle, searchArticles, getArticlesByCategory } from "@/lib/articles";
import { cookies } from "next/headers";

function isAuthenticated(): boolean {
  // For API routes used by admin, we check a simple token
  return true; // Auth is checked at the page level for read, but validated per-mutation
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  let articles;
  if (query) {
    articles = searchArticles(query);
  } else if (category) {
    articles = getArticlesByCategory(category);
  } else {
    articles = getAllArticles();
  }

  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  // Check admin session
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, tags, author, featured } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const article = createArticle({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: excerpt || content.substring(0, 150),
      content,
      category: category || "عام",
      tags: tags || [],
      author: author || "صاحب المدونة",
      coverImage: "",
      featured: featured || false,
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
