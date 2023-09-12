import { prisma } from "@/src/clients/prisma";
import { NextRequest } from "next/server";

type GetBlogCommentRepliesRequestContext = {
  params: {
    slug: string;
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: GetBlogCommentRepliesRequestContext,
) {
  const replies = await prisma.comment
    .findUnique({
      where: {
        id: context.params.id,
      },
    })
    .replies();

  const response = {
    items: replies,
  };

  return new Response(JSON.stringify(response));
}
