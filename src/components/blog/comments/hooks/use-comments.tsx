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
    queryKey: ["comments"],
    queryFn: (params) => {
      const cursor = params.pageParam;
      return fetchBlogComments(input.slug, cursor);
    },
    initialData: {
      pageParams: [],
      pages: [
        {
          pagination: {
            nextCursor: input.initialCursor,
          },
          items: input.initialComments || [],
        },
      ],
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
  });
}

export function useComments(props: UseCommentsProps) {
  const commentsQuery = useCommentsQuery({
    slug: props.slug,
    initialComments: props.comments,
    initialCursor: props.nextCursor,
  });

  const comments = commentsQuery.data?.pages.flatMap((page) => page.items);

  return {
    slug: props.slug,
    commentsQuery,
    comments,
  };
}
