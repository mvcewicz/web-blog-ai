import { prisma } from "@/src/clients/prisma";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";
import { BLOGS_PER_PAGE } from "@/src/components/blog/constants/blogs.api";

// export const runtime = "edge";

function getBlogsRequestParams(url: NextURL) {
  return {
    page: Number(url.searchParams.get("page") || "1"),
  };
}

export async function GET(request: NextRequest) {
  const params = getBlogsRequestParams(request.nextUrl);

  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      skip: (params.page - 1) * BLOGS_PER_PAGE,
      take: BLOGS_PER_PAGE,
    }),
    prisma.blog.count(),
  ]);

  const response = {
    items: blogs,
    pagination: {
      type: "page",
      page: params.page,
      total: totalBlogs,
    },
  };

  return new Response(JSON.stringify(response));
}
