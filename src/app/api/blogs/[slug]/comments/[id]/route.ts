import { prisma } from "@/src/clients/prisma";
import { NextRequest } from "next/server";
import { verifySession } from "@/src/helpers/server/session";

type GetCommentsRequestContext = {
  params: {
    slug: string;
    id: string;
  };
};

type CommentDTO = {
  id: string;
  replyCount: number;
  content: string;
  createdAt: string;
  replies: Omit<CommentDTO, "replies" | "replyCount">[];
  user: {
    id: string;
    name: string;
    image: string;
  };
};

type CommentDB = {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: Date;
  content: string;
  replies: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
    };
    content: string;
    createdAt: Date;
  }[];
  _count: {
    replies: number;
  };
};

function commentToDTO(comment: CommentDB): CommentDTO {
  return {
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    user: {
      id: comment.user.id,
      name: comment.user.name,
      image: comment.user.image,
    },
    replies: comment.replies.map((reply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt.toISOString(),
      user: {
        id: reply.user.id,
        name: reply.user.name,
        image: reply.user.image,
      },
    })),
    replyCount: comment._count.replies,
  };
}

export async function POST(
  request: NextRequest,
  context: GetCommentsRequestContext,
) {
  const { slug, id } = context.params;

  if (!slug) {
    return new Response("No slug provided");
  }

  if (!id) {
    return new Response("No id provided");
  }

  const body = await request.json();

  if (!body) {
    return new Response("No body provided");
  }

  const { content } = body as { content: string };

  if (!content) {
    return new Response("No content provided");
  }

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
      content,
      blog: {
        connect: {
          slug,
        },
      },
      user: {
        connect: {
          id: decodedSession.sub,
        },
      },
      repliesTo: {
        connect: {
          id,
        },
      },
    },
  });
  return new Response(JSON.stringify({ item: comment }));
}

export async function GET(
  request: NextRequest,
  context: GetCommentsRequestContext,
) {
  const { slug, id } = context.params;

  if (!slug) {
    return new Response("No slug provided");
  }

  if (!id) {
    return new Response("No id provided");
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id,
      blog: {
        slug,
      },
    },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
      replies: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  if (!comment) {
    throw new Error("No comment found");
  }
  const response = {
    item: commentToDTO(comment),
  };

  return new Response(JSON.stringify(response));
}
