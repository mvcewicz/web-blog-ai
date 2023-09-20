import { fetcher } from "@/src/helpers/fetcher";
import { Blog } from "@/src/lib/blog/blog.types";

type FetchBlogsParams = {
  page?: number;
};

type FetchBlogsResponse = {
  items: Blog[];
  pagination: {
    type: "page";
    page: number;
    total: number;
  };
};

export async function fetchBlogs(params: FetchBlogsParams) {
  const page = params.page ?? 1;

  const response = await fetcher<FetchBlogsResponse>({
    url: "/api/blogs",
    query: {
      page: String(page),
    },
    next: {
      revalidate: 3600,
    },
  });

  return response;
}
