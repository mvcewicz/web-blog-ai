"use server";

import { cookies } from "next/headers";
import { verifySession } from "@wba/next/src/lib/helpers/server/session";

export async function addCommentAction(formData: FormData) {
  "use server";
  const slug = formData.get("slug");
  const comment = formData.get("comment");

  const session = cookies().get("__session")?.value;

  if (!session) {
    throw new Error("No session");
  }

  const decodedSession = await verifySession(session);

  if (!decodedSession) {
    throw new Error("Invalid session");
  }

  const userId = decodedSession.sub;

  return {
    slug,
    userId,
  };
}
