import { NextRequest } from "next/server";
import { generateBlog } from "@/src/app/api/cron/blog/generate";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("CRON_SECRET");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return new Response("Failed to get CRON_SECRET");
  }

  const blog = await generateBlog();

  return new Response(JSON.stringify(blog));
}
