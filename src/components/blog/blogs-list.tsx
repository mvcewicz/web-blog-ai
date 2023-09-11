import { BlogCard } from "@/src/components/blog/blog-card";
import Link from "next/link";

type Blog = {
  slug: string;
  title: string;
  content: string;
  image: string;
};

type BlogsListProps = {
  blogs: Blog[];
};

export function BlogsList({ blogs }: BlogsListProps) {
  return (
    <ul
      role="list"
      className="my-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:flex-wrap"
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
