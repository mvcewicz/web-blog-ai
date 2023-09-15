"use client";

import { Textarea } from "@/src/components/ui/textarea";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { BlogCommentsList } from "@/src/components/blog/comments/blog-comments-list";
import { cn } from "@/src/utils";
import { fetchBlogComments } from "@/src/components/blog/comments/actions/fetch-blog-comments";
import {
  CommentsContextProvider,
  useCommentsContext,
} from "@/src/components/blog/comments/contexts/comments.context";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/src/helpers/fetcher";
import { useParams } from "next/navigation";

type BlogCommentsProps = {
  slug: string;
};

type CommentFormProps = {
  slug: string;
};

const useCommentForm = () => {
  const params = useParams();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("comment") as string;
    addCommentMutation.mutate(content);
  };

  return {
    handleSubmit,
  };
};

function CommentForm({ slug }: CommentFormProps) {
  const { handleSubmit } = useCommentForm();
  return (
    <form onSubmit={handleSubmit}>
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

export function BlogLoadMoreComments() {
  const { commentsQuery } = useCommentsContext();
  if (!commentsQuery.hasNextPage) return null;
  return (
    <Button
      type={"button"}
      disabled={!commentsQuery.hasNextPage || commentsQuery.isFetchingNextPage}
      onClick={() => commentsQuery.fetchNextPage()}
      className={cn(buttonVariants({ variant: "outline" }), "text-gray-600")}
    >
      Load More
    </Button>
  );
}

export async function BlogComments(props: BlogCommentsProps) {
  const { slug } = props;
  const { items: comments, pagination } = await fetchBlogComments(slug);
  return (
    <CommentsContextProvider
      comments={comments}
      slug={slug}
      nextCursor={pagination.nextCursor}
    >
      <div className="flex w-full flex-col gap-8 sm:w-4/5 md:w-3/4 lg:w-1/2">
        <CommentForm slug={slug} />
        <BlogCommentsList />
        <BlogLoadMoreComments />
      </div>
    </CommentsContextProvider>
  );
}
