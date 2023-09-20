import { prismaClient } from "@/src/helpers/clients/prisma-client";

// export const runtime = "edge";

export async function generateBlog() {
  const date = new Date();

  const blog = await prismaClient.blog.create({
    data: {
      image: "https://picsum.photos/seed/picsum/200/300",
      tags: ["test"],
      title: "Test",
      content: "Test",
      slug: "test",
    },
  });

  return {
    blog,
    date: date.toISOString(),
  };
}

// generateBlog();
