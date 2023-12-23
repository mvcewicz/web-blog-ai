import { BlogsList } from "@wba/next/src/lib/features/blog/components/blogs-list";
import { Button } from "@wba/next/src/lib/ui/button";
import Link from "next/link";
import { useMemo } from "react";
import { BLOGS_PER_PAGE } from "@wba/next/src/lib/features/blog/api/blogs.api";
import { fetchBlogs } from "@wba/next/src/lib/features/blog/api/fetch-blogs";

type BlogsPageProps = {
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
          <Link href={`/blogs/${option}`}>
            <Button variant="outline">{option}</Button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const generateStaticParams = async () => {
  const blogs = await fetchBlogs();
  return Array.from({ length: blogs.pagination.total / BLOGS_PER_PAGE }).map(
    (_, index) => ({
      params: {
        page: String(index + 1),
      },
    }),
  );
};

export default async function BlogsPage({ params }: BlogsPageProps) {
  const { items: blogs, pagination } = await fetchBlogs({
    page: Number(params.page ?? 1),
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
