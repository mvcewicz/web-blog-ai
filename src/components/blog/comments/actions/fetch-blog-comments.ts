import { Comment } from "@/src/components/blog/comments/comment.types";
import { fetchBlogCommentsResponse } from "@/src/components/blog/comments/actions/fetch-blog-comments.fixture";

type FetchBlogCommentsResponse = {
  comments: Comment[];
  pagination: {
    nextCursor?: string;
  };
};

export async function fetchBlogComments(
  slug: string,
): Promise<FetchBlogCommentsResponse> {
  // TODO: Fetch blog comments from API
  return fetchBlogCommentsResponse;
}
