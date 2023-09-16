import { Comment } from "@/src/components/blog/comments/comment.types";
import { fetchBlogCommentsResponse } from "@/src/components/blog/comments/actions/fetch-blog-comments.fixture";
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
  });

  return {
    items: data.items,
    pagination: {
      nextCursor: data.pagination.nextCursor,
    },
  };
}
