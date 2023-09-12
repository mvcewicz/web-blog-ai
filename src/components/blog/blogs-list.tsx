import { BlogCard } from "@/src/components/blog/blog-card";
import Link from "next/link";
import { Blog } from "./blog.types";

type BlogsListProps = {
  blogs: Blog[];
};

export function BlogsList({ blogs }: BlogsListProps) {
  return (
    <ul
      role="list"
      className="flex flex-col items-center justify-center gap-6 py-6 sm:flex-row sm:flex-wrap"
    >
      {blogs.map((blog) => (
        <li key={blog.slug}>
          <Link href={`/blogs/${blog.slug}`}>
            <BlogCard blog={blog} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
