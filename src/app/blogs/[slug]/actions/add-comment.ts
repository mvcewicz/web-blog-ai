"use server";

import { revalidatePath } from "next/cache";

export async function addCommentAction(formData: FormData) {
  const slug = formData.get("slug");
  const comment = formData.get("comment");

  console.log({
    slug,
    comment,
  });

  formData.set("comment", "");

  revalidatePath(`/blogs/${slug}`);

  return {
    slug,
  };
}
