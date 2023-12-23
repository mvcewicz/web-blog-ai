import { BlogDTO } from "@wba/types/src/blog.type";
import { prismaClient } from "@wba/prisma";
import { revalidatePath } from "next/cache";

type BlogCreatedEvent = {
  data: BlogDTO;
  secret: string;
};

export const POST = async (req: Request) => {
  try {
    const { data, secret } = (await req.json()) as BlogCreatedEvent;
    if (secret !== "123") {
      throw new Error("Invalid secret");
    }
    const blog = await prismaClient.blog.create({
      data,
    });
    revalidatePath("/blogs/1");
    revalidatePath(`/blog/${blog.slug}`);
  } catch (err) {
    console.error(err);
  }
  return new Response("OK");
};
