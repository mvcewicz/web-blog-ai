import { generateBlog } from "@wba/next/src/app/api/cron/blog/generate";

async function seed() {
  await generateBlog();
}

seed();
