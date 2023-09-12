import { prisma } from "@/src/clients/prisma";
import { NextRequest } from "next/server";

// export const runtime = "edge";

type BlogRequestContext = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, context: BlogRequestContext) {
  if (!context.params.slug) {
    return new Response("No slug provided");
  }

  const blog = await prisma.blog.findUnique({
    where: {
      slug: context.params.slug,
    },
  });

  if (!blog) {
    return new Response("No blog found");
  }

  const response = {
    item: blog,
  };

  return new Response(JSON.stringify(response));
}
