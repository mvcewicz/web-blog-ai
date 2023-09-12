import { BlogsList } from "@/src/components/blog/blogs-list";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { BLOGS_PER_PAGE } from "@/src/components/blog/constants/blogs.api";
import { fetchBlogs } from "@/src/components/blog/actions/fetch-blogs";

type FetchBlogsParams = {
  page: number;
};

// async function fetchBlogs(params: FetchBlogsParams) {
//   return {
//     blogs: [
//       {
//         slug: "blog-1",
//         title: "Blog 1",
//         content: "Blog 1 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-2",
//         title: "Blog 2",
//         content: "Blog 2 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-3",
//         title: "Blog 3",
//         content: "Blog 3 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-4",
//         title: "Blog 4",
//         content: "Blog 4 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-5",
//         title: "Blog 5",
//         content: "Blog 5 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-6",
//         title: "Blog 6",
//         content: "Blog 6 Content",
//         image: "https://picsum.photos/200/300",
//       },
//       {
//         slug: "blog-7",
//         title: "Blog 7",
//         content: "Blog 7 Content",
//         image: "https://picsum.photos/200/300",
//       },
//     ],
//     pagination: {
//       page: params.page,
//       total: 7,
//     },
//   };
// }

type BlogsPageProps = {
  searchParams: {
    page?: string;
  };
  params: {
    page?: string;
  };
};

type BlogsPaginationProps = {
  page: number;
  total: number;
};

function getPaginationOptions(page: number, total: number) {
  const options = [];

  // prev
  if (page > 1) {
    options.push(page - 1);
  }

  // current
  options.push(page);

  // next
  if (page < total / BLOGS_PER_PAGE - 1) {
    options.push(page + 1);
  }

  return options;
}

function BlogsPagination({ page, total }: BlogsPaginationProps) {
  const paginationOptions = useMemo(
    () => getPaginationOptions(page, total),
    [page, total],
  );

  if (!total) {
    return null;
  }

  return (
    <ul role="list" className="flex items-center justify-center gap-2">
      {paginationOptions.map((option) => (
        <li key={option}>
          <Link href={`/blogs?page=${option}`}>
            <Button variant="outline">{option}</Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { items: blogs, pagination } = await fetchBlogs({
    ...searchParams,
    page: Number(searchParams.page ?? 1),
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Blogs</h1>
      <BlogsList blogs={blogs} />
      <BlogsPagination page={pagination.page} total={pagination.total} />
    </div>
  );
}
