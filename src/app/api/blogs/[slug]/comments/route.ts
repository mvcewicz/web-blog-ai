import { prisma } from "@/src/clients/prisma";
import { verifySession } from "@/src/helpers/server/session";
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
    image: string;
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
    image: string;
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
      image: comment.user.image,
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
      commentId: null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
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

async function createBlogCommentRequestBody(
  request: NextRequest,
  context: GetBlogCommentsRequestContext,
) {
  const { parentId, content } = await request.json();
  return {
    slug: context.params.slug,
    parentId,
    content,
  } as CreateBlogCommentRequestBody;
}

export async function POST(
  request: NextRequest,
  context: GetBlogCommentsRequestContext,
) {
  const body = await createBlogCommentRequestBody(request, context);

  const session = request.cookies.get("__session");

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const decodedSession = await verifySession(session.value);

  if (!decodedSession) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

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
          id: decodedSession.sub,
        },
      },
      ...(body.parentId
        ? { repliesTo: { connect: { id: body.parentId } } }
        : {}),
    },
  });

  return new Response(JSON.stringify(comment));
}
