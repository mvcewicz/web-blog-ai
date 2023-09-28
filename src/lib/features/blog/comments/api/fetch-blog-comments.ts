import { Comment } from "@/src/lib/features/blog/comments/blog-comment.types";
import { fetcher } from "@/src/helpers/fetcher";

type FetchBlogCommentsResponse = {
  items: Comment[];
  pagination: {
    nextCursor?: string;
  };
};

export async function fetchBlogComments(
  slug: string,
  cursor?: string,
): Promise<FetchBlogCommentsResponse> {
  // TODO: Fetch blog comments from API
  const data = await fetcher<FetchBlogCommentsResponse>({
    url: `/api/blogs/${slug}/comments`,
    query: {
      cursor,
    },
    method: "GET",
    next: {
      revalidate: 30,
    },
  });

  return {
    items: data.items,
    pagination: {
      nextCursor: data.pagination.nextCursor,
    },
  };
}
