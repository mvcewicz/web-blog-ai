import { prisma } from "@/src/clients/prisma";
import { NextURL } from "next/dist/server/web/next-url";

import { NextRequest } from "next/server";

// export const runtime = "edge";

function getBlogCommentsRequestParams(url: NextURL) {
  return {
    slug: url.searchParams.get("slug"),
  };
}

type GetBlogCommentsRequestContext = {
  params: {
    slug: string;
  };
};

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
  _count: {
    replies: number;
  };
};

type CommentDTO = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  replyCount: number;
};

function commentToDTO(comment: Comment): CommentDTO {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    user: {
      id: comment.user.id,
      name: comment.user.name,
    },
    replyCount: comment._count.replies,
  };
}

function getCommentsCursor(comments: CommentDTO[]) {
  return comments.at(-1)?.id;
}

export async function GET(
  request: NextRequest,
  context: GetBlogCommentsRequestContext,
) {
  const comments = await prisma.comment.findMany({
    where: {
      blog: {
        slug: context.params.slug,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  const commentsDTO = comments.map(commentToDTO);

  const response = {
    items: commentsDTO || [],
    pagination: {
      type: "cursor",
      nextCursor: getCommentsCursor(commentsDTO),
    },
  };

  return new Response(JSON.stringify(response));
}

type CreateBlogCommentRequestBody = {
  slug: string;
  content: string;
  parentId?: string;
};

async function createBlogCommentRequestBody(request: NextRequest) {
  const { slug, parentId, content } = await request.json();
  return {
    slug,
    parentId,
    content,
  } as CreateBlogCommentRequestBody;
}

export async function POST(request: NextRequest) {
  const body = await createBlogCommentRequestBody(request);

  const comment = await prisma.comment.create({
    data: {
      blog: {
        connect: {
          slug: body.slug,
        },
      },
      content: body.content,
      user: {
        connect: {
          id: "1",
        },
      },
      repliesTo: {
        connect: {
          id: body.parentId,
        },
      },
    },
  });

  return new Response(JSON.stringify(comment));
}
