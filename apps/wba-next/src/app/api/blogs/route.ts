import { prismaClient } from "@wba/prisma";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest } from "next/server";
import { BLOGS_PER_PAGE } from "@wba/next/src/lib/features/blog/api/blogs.api";
import { BlogDTO } from "@wba/types/src/blog.type";

type BlogField = keyof BlogDTO;

type BlogsRequestParams = {
  page: number;
  fields: BlogField[];
};

function getBlogsRequestParams(url: NextURL): BlogsRequestParams {
  return {
    page: Number(url.searchParams.get("page") || "1"),
    fields:
      (url.searchParams.get("fields")?.trim().split(",") as BlogField[]) || [],
  };
}

export async function GET(request: NextRequest) {
  const params = getBlogsRequestParams(request.nextUrl);
  const [blogs, totalBlogs] = await Promise.all([
    prismaClient.blog.findMany({
      ...(params.fields.length
        ? {
            select: params.fields.reduce(
              (acc, field) => {
                acc[field] = true;
                return acc;
              },
              {} as Record<BlogField, boolean>,
            ),
          }
        : {}),
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
