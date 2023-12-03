import { generateBlog } from "@/src/app/api/cron/blog/generate";

async function seed() {
  await generateBlog();
}

seed();
