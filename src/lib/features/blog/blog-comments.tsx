"use client";

import { Textarea } from "@/src/lib/ui/textarea";
import { Button, buttonVariants } from "@/src/lib/ui/button";
import { cn } from "@/src/helpers/utils";
import { useCommentsContext } from "@/src/lib/features/blog/comments/contexts/comments.context";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/src/helpers/fetcher";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { FormEvent } from "react";
import { CascadeLoading } from "@/src/lib/cascade-loading";
import { queryClient } from "@/src/helpers/clients/query-client";

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
    addCommentMutation.mutate(content, {
      onSuccess: () => {
        (event.target as HTMLFormElement).reset();
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(["comments"]);
      },
    });
  };

  return {
    handleSubmit,
    user,
    addCommentMutation,
  };
};

export function CommentForm() {
  const { handleSubmit, user, addCommentMutation } = useCommentForm();

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
        {addCommentMutation.isError && (
          <strong className="text-red-500">Something went wrong</strong>
        )}
        <input type="reset" hidden />
        <Button type="submit" variant="outline" disabled={isDisabled}>
          {addCommentMutation.isLoading ? <CascadeLoading /> : "Comment"}
        </Button>
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
      {isLoading ? <CascadeLoading /> : "Load More"}
    </Button>
  );
}
