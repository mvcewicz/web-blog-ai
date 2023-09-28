import { NextRequest } from "next/server";
import { generateBlog } from "@/src/app/api/cron/blog/generate";

const CRON_SECRET_NAME = "CRON_SECRET";

const validateCronSecret = (request: NextRequest) => {
  const secret = request.nextUrl.searchParams.get(CRON_SECRET_NAME);

  if (!process.env.CRON_SECRET) {
    throw new Error(`"${CRON_SECRET_NAME}" is not defined`);
  }

  if (!secret) {
    throw new Error(`Failed to get "${CRON_SECRET_NAME}"`);
  }

  if (secret !== process.env.CRON_SECRET) {
    throw new Error(`"${CRON_SECRET_NAME}" does not match`);
  }

  return secret;
};

export async function GET(request: NextRequest) {
  validateCronSecret(request);
  const blog = await generateBlog();
  return new Response(JSON.stringify(blog));
}
