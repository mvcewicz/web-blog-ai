import * as BlogCard from "@wba/next/src/lib/features/blog/components/headless/blog-card.headless";
import Link from "next/link";
import { Blog } from "@wba/next/src/lib/features/blog/blog.types";

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
          <Link href={`/blog/${blog.slug}`}>
            <BlogCard.Root>
              <BlogCard.HeaderImage
                src={blog.image}
                width={320}
                height={250}
                alt={blog.title}
              />
              <BlogCard.Body>
                <BlogCard.Title>{blog.title}</BlogCard.Title>
                <BlogCard.Slug>/{blog.slug}</BlogCard.Slug>
                <BlogCard.Content>
                  {blog.content.slice(0, 200)}
                </BlogCard.Content>
              </BlogCard.Body>
            </BlogCard.Root>
          </Link>
        </li>
      ))}
    </ul>
  );
}
