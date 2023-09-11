"use client";

import { addCommentAction } from "@/src/app/blogs/[slug]/actions/add-comment";
import { Textarea } from "@/src/components/ui/textarea";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { BlogCommentsList } from "@/src/components/blog/comments/blog-comments-list";
import { cn } from "@/src/utils";
import { fetchBlogComments } from "@/src/components/blog/comments/actions/fetch-blog-comments";
import {
  CommentsContextProvider,
  useCommentsContext,
} from "@/src/components/blog/comments/contexts/comments.context";

type BlogCommentsProps = {
  slug: string;
};

type CommentFormProps = {
  slug: string;
};

async function CommentForm({ slug }: CommentFormProps) {
  return (
    <form action={addCommentAction}>
      <div className="flex flex-col gap-2">
        <Textarea
          id="comment"
          name="comment"
          placeholder="Comment this article..."
          className="h-32 w-full rounded-lg shadow-md"
        />
        <input id="slug" name="slug" type="hidden" value={slug} />
        <Button>Comment</Button>
      </div>
    </form>
  );
}

function BlogLoadMoreComments() {
  const { commentsQuery } = useCommentsContext();
  if (!commentsQuery.hasNextPage) return null;
  return (
    <Button
      type={"button"}
      onClick={() => commentsQuery.fetchNextPage()}
      className={cn(buttonVariants({ variant: "outline" }), "text-gray-600")}
    >
      Load More
    </Button>
  );
}

export async function BlogComments({ slug }: BlogCommentsProps) {
  const { comments, pagination } = await fetchBlogComments(slug);
  return (
    <CommentsContextProvider
      comments={comments}
      slug={slug}
      nextCursor={pagination.nextCursor}
    >
      <div className="mx-2 flex flex-col gap-8 sm:w-4/5 md:w-3/4 lg:w-2/3">
        <CommentForm slug={slug} />
        <BlogCommentsList />
        <BlogLoadMoreComments />
      </div>
    </CommentsContextProvider>
  );
}
