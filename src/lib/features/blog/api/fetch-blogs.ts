import { fetcher } from "@/src/lib/helpers/fetcher";
import { Blog } from "@/src/lib/features/blog/blog.types";

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
  return fetcher<FetchBlogsResponse>({
    url: "/api/blogs",
    query: {
      page: String(page),
    },
    next: {
      revalidate: 43200,
    },
  });
}
