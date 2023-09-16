"use client";

import { Textarea } from "@/src/components/ui/textarea";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/utils";
import { useCommentsContext } from "@/src/components/blog/comments/contexts/comments.context";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/src/helpers/fetcher";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FormEvent } from "react";
import { CascadeLoading } from "@/src/components/cascade-loading";

const useCommentForm = () => {
  const params = useParams();
  const user = useUser();

  const blogSlug = params.slug;

  const addCommentMutation = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: async (content: string) => {
      return fetcher({
        url: `/api/blogs/${blogSlug}/comments`,
        method: "POST",
        body: { content },
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("comment") as string;
    addCommentMutation.mutate(content);
  };

  return {
    handleSubmit,
    slug: blogSlug,
    user,
    addCommentMutation,
  };
};

export function CommentForm() {
  const { handleSubmit, slug, user, addCommentMutation } = useCommentForm();

  const isDisabled = !user?.isSignedIn || addCommentMutation.isLoading;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Textarea
          id="comment"
          name="comment"
          placeholder={
            user?.isSignedIn ? "Comment this article..." : "Sign in to comment"
          }
          disabled={isDisabled}
          className="h-32 w-full rounded-lg shadow-md"
        />
        <input id="slug" name="slug" type="hidden" value={slug} />
        <Button disabled={isDisabled}>Comment</Button>
      </div>
    </form>
  );
}

export function BlogLoadMoreComments() {
  const { commentsQuery } = useCommentsContext();
  if (!commentsQuery.hasNextPage) return null;

  const isLoading = commentsQuery.isFetchingNextPage || commentsQuery.isLoading;

  return (
    <Button
      type={"button"}
      onClick={() => commentsQuery.fetchNextPage()}
      className={cn(buttonVariants({ variant: "outline" }), "text-darken")}
      disabled={isLoading}
    >
      {CascadeLoading ? <CascadeLoading /> : "Load More"}
    </Button>
  );
}
