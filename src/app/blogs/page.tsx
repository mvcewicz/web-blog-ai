import { BlogsList } from "@/src/lib/features/blog/components/blogs-list";
import { Button } from "@/src/lib/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { BLOGS_PER_PAGE } from "@/src/lib/features/blog/api/blogs.api";
import { fetchBlogs } from "@/src/lib/features/blog/api/fetch-blogs";

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
      <div className="flex flex-col gap-20">
        <BlogsList blogs={blogs} />
        <BlogsPagination page={pagination.page} total={pagination.total} />
      </div>
    </div>
  );
}
