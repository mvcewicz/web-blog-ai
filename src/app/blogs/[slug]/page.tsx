import { Suspense } from "react";
import { BlogFeed } from "@/src/components/blog/blog-feed";
import { BlogComments } from "@/src/components/blog/blog-comments";
import { BlogFeedSkeleton } from "@/src/components/blog/blog-skeleton";
import { BlogCommentsSkeleton } from "@/src/components/blog/comments/blog-comments-skeleton";
import { generateBlogMetadata } from "@/src/app/blogs/[slug]/blog.metadata";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = generateBlogMetadata;

export default async function BlogPage({ params }: BlogPageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Suspense fallback={<BlogFeedSkeleton />}>
        <BlogFeed slug={params.slug} />
      </Suspense>
      <Suspense fallback={<BlogCommentsSkeleton />}>
        <BlogComments slug={params.slug} />
      </Suspense>
    </div>
  );
}
