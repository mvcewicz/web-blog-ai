import { prismaClient } from "@/src/lib/helpers/clients/prisma-client";
import { NextRequest } from "next/server";

type BlogRequestContext = {
  params: {
    slug: string;
  };
};

export async function GET(request: NextRequest, context: BlogRequestContext) {
  if (!context.params.slug) {
    return new Response("No slug provided");
  }

  const blog = await prismaClient.blog.findUnique({
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
