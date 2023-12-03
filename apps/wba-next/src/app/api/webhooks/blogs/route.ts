import { BlogDTO } from "@wba/types/src/blog.type";
import { prisma } from "@wba/prisma/src";

type BlogCreatedEvent = {
  data: BlogDTO;
  secret: string;
};

export const POST = async (req: Request) => {
  try {
    const { data, secret } = (await req.json()) as BlogCreatedEvent;
    console.log(data);
    if (secret !== "123") {
      throw new Error("Invalid secret");
    }
    const blog = await prisma.blog.create({
      data,
    });
    console.log(blog);
  } catch (err) {
    console.error(err);
  }
  return new Response("OK");
};
