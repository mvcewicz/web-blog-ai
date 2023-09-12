import { Comment } from "@/src/components/blog/comments/comment.types";
import { fetchBlogComments } from "@/src/components/blog/comments/actions/fetch-blog-comments";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseCommentsProps = {
  slug: string;
  comments: Comment[];
  nextCursor?: string;
};

type UseCommentsQueryInput = {
  slug: string;
  initialComments?: Comment[];
  initialCursor?: string;
};

function useCommentsQuery(input: UseCommentsQueryInput) {
  return useInfiniteQuery({
    queryKey: [input.slug, "comments"],
    queryFn: () => {
      return fetchBlogComments(input.slug);
    },
    initialData: {
      pageParams: [],
      pages: [
        {
          pagination: {
            nextCursor: input.initialCursor,
          },
          comments: input.initialComments || [],
        },
      ],
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
  });
}

export function useComments(props: UseCommentsProps) {
  const commentsQuery = useCommentsQuery({
    slug: props.slug,
    initialComments: props.comments,
    initialCursor: props.nextCursor,
  });

  const comments = commentsQuery.data?.pages.flatMap((page) => page.comments);

  return {
    commentsQuery,
    comments,
  };
}