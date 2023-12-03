import { prismaClient } from "@/src/lib/helpers/clients/prisma-client";
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
  const replies = await prismaClient.comment
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
