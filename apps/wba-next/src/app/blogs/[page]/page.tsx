"use server";

import { prismaClient } from "@wba/prisma";
import { BlogsList } from "@wba/next/src/lib/features/blog/components/blogs-list";
import { useMemo } from "react";
import { BLOGS_PER_PAGE } from "@wba/next/src/lib/features/blog/api/blogs.api";
import { fetchBlogs } from "@wba/next/src/lib/features/blog/api/fetch-blogs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@wba/next/src/lib/ui/pagination";

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
  const hasNext = page < total / BLOGS_PER_PAGE - 1;
  const hasPrev = page > 1;
  const isNextEllipsisVisible = page < total / BLOGS_PER_PAGE - 2;
  const isPrevEllipsisVisible = page > 2;
  return {
    options,
    hasNext,
    hasPrev,
    isNextEllipsisVisible,
    isPrevEllipsisVisible,
  };
}

function BlogsPagination({ page, total }: BlogsPaginationProps) {
  const {
    options,
    hasNext,
    hasPrev,
    isNextEllipsisVisible,
    isPrevEllipsisVisible,
  } = useMemo(() => getPaginationOptions(page, total), [page, total]);
  if (!total) {
    return null;
  }
  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && <PaginationPrevious href={`/blogs/${page - 1}`} />}
        {isPrevEllipsisVisible && <PaginationEllipsis />}
        {options.map((option) => (
          <PaginationLink
            key={option}
            isActive={option === page}
            href={`/blogs/${option}`}
          >
            {option}
          </PaginationLink>
        ))}
        {isNextEllipsisVisible && <PaginationEllipsis />}
        {hasNext && <PaginationNext href={`/blogs/${page + 1}`} />}
      </PaginationContent>
    </Pagination>
  );
}

export const generateStaticParams = async () => {
  const blogCount = await prismaClient.blog.count();
  return Array.from({ length: blogCount / BLOGS_PER_PAGE }).map((_, index) => ({
    params: {
      page: String(index + 1),
    },
  }));
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
