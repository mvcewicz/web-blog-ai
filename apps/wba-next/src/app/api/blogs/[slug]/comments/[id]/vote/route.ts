import { NextRequest } from "next/server";

async function getBlogCommentVoteRequestBody(request: NextRequest) {
  const body = await request.json();
  return {
    vote: body.vote,
  };
}

type BlogCommentVoteRequestContext = {
  params: {
    id: string;
  };
};

export async function POST(
  request: NextRequest,
  context: BlogCommentVoteRequestContext,
) {
  const commentId = context.params.id;
  const { vote } = await getBlogCommentVoteRequestBody(request);
  return new Response("Not implemented");
}
