"use client";

import { addCommentAction } from "@/src/app/blogs/[slug]/actions/add-comment";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";

export function CommentForm() {
  return (
    <form action={addCommentAction}>
      <div className="flex flex-col gap-2">
        <Textarea
          id="comment"
          name="comment"
          placeholder="Comment this article..."
          className="h-32 w-full rounded-lg shadow-md"
        />
        <input type="hidden" name="slug" value="blog-1" />
        <Button>Comment</Button>
      </div>
    </form>
  );
}
