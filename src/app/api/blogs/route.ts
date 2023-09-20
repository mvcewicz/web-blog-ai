import { prismaClient } from "@/src/helpers/clients/prisma-client";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";
import { BLOGS_PER_PAGE } from "@/src/lib/blog/api/blogs.api";

// export const runtime = "edge";

function getBlogsRequestParams(url: NextURL) {
  return {
    page: Number(url.searchParams.get("page") || "1"),
  };
}

export async function GET(request: NextRequest) {
  const params = getBlogsRequestParams(request.nextUrl);

  const [blogs, totalBlogs] = await Promise.all([
    prismaClient.blog.findMany({
      skip: (params.page - 1) * BLOGS_PER_PAGE,
      take: BLOGS_PER_PAGE,
      // TODO: add dynamic sorting
      orderBy: {
        createdAt: "desc",
      },
    }),
    prismaClient.blog.count(),
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
