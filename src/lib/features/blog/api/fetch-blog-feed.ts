import { fetcher } from "@/src/lib/helpers/fetcher";
import { Blog } from "@/src/lib/features/blog/blog.types";
import { cache } from "react";

type FetchBlogFeedResponse = {
  item: Blog;
};

export const fetchBlogFeed = cache(async (slug: string) => {
  const response = await fetcher<FetchBlogFeedResponse>({
    url: `/api/blogs/${slug}`,
    cache: "force-cache",
  });
  return response.item;
});
