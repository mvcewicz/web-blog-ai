import { BlogComment } from "@wba/next/src/lib/features/blog/blog-comments.types";
import { fetcher } from "@wba/next/src/lib/helpers/fetcher";

type FetchBlogCommentsResponse = {
  items: BlogComment[];
  pagination: {
    nextCursor?: string;
  };
};

export async function fetchBlogComments(
  slug: string,
  cursor?: string,
): Promise<FetchBlogCommentsResponse> {
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
