import { fetcher } from "@/src/helpers/fetcher";
import { Blog } from "../blog.types";

type FetchBlogFeedResponse = {
  item: Blog;
};

export async function fetchBlogFeed(slug: string) {
  // TODO: Fetch blog feed from API
  const response = await fetcher<FetchBlogFeedResponse>({
    url: `/api/blogs/${slug}`,
  });
  return response.item;
}
