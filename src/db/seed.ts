import { generateBlog } from "@/src/app/api/cron/blog/generate";

async function seed() {
  const blog = await generateBlog();
}

seed();
