"use server";

import { cookies } from "next/headers";
import { verifySession } from "@wba/next/src/lib/helpers/server/session";
import { prismaClient } from "@wba/prisma";
import { revalidatePath } from "next/cache";
import { serverFunction } from "@wba/next/src/lib/helpers/server/serverFunction";

export const addComment = async (formData: FormData) => {
  const slug = formData.get("slug");
  const content = formData.get("comment");
  const parentId = formData.get("parentId");
  if (!slug) {
    throw new Error("No slug provided", { cause: { slug, content } });
  }
  if (!content) {
    throw new Error("No content provided", { cause: { slug, content } });
  }
  const session = cookies().get("__session");
  if (!session) {
    throw new Error("No session found", { cause: { slug, content } });
  }
  const decodedSession = await verifySession(session.value);
  if (!decodedSession) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const comment = await prismaClient.comment.create({
    data: {
      blog: {
        connect: {
          slug: String(slug),
        },
      },
      content: String(content),
      user: {
        connect: {
          id: decodedSession.sub,
        },
      },
      ...(parentId ? { repliesTo: { connect: { id: String(parentId) } } } : {}),
    },
  });
  return comment;
};

export const addCommentAction = serverFunction({
  fn: async (formData: FormData) => {
    const slug = formData.get("slug");
    const content = formData.get("content");
    const parentId = formData.get("parentId");
    if (!slug) {
      throw new Error("No slug provided", { cause: { slug, content } });
    }
    if (!content) {
      throw new Error("No content provided", { cause: { slug, content } });
    }
    const session = cookies().get("__session");
    if (!session) {
      throw new Error("No session found", { cause: { slug, content } });
    }
    const decodedSession = await verifySession(session.value);
    if (!decodedSession) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    const comment = await prismaClient.comment.create({
      data: {
        blog: {
          connect: {
            slug: String(slug),
          },
        },
        content: String(content),
        user: {
          connect: {
            id: decodedSession.sub,
          },
        },
        ...(parentId
          ? { repliesTo: { connect: { id: String(parentId) } } }
          : {}),
      },
    });
    revalidatePath(`/blog/${slug}`);
    return comment;
  },
});
