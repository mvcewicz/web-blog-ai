import { prisma } from "@/src/clients/prisma";

// export const runtime = "edge";

export async function generateBlog() {
  const date = new Date();

  const blog = await prisma.blog.create({
    data: {
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
