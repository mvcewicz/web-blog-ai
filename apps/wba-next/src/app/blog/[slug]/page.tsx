"use server";

import { Suspense } from "react";
import { BlogFeed } from "@wba/next/src/lib/features/blog/components/blog-feed";
import { BlogFeedSkeleton } from "@wba/next/src/lib/features/blog/components/blog-skeleton";
import { BlogCommentsSkeleton } from "@wba/next/src/lib/features/blog/components/blog-comments-skeleton";
import { generateBlogMetadata } from "@wba/next/src/app/blog/[slug]/blog.metadata";
import { fetchBlogComments } from "@wba/next/src/lib/features/blog/api/fetch-blog-comments";
import { CommentsContextProvider } from "@wba/next/src/lib/features/blog/contexts/comments.context";
import { BlogCommentsList } from "@wba/next/src/lib/features/blog/components/blog-comments-list";
import {
  BlogLoadMoreComments,
  CommentForm,
} from "@wba/next/src/lib/features/blog/components/blog-comments";
import { fetchBlogs } from "@wba/next/src/lib/features/blog/api/fetch-blogs";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = generateBlogMetadata;

async function BlogComments(props: { slug: string }) {
  const { slug } = props;
  const { items: comments, pagination } = await fetchBlogComments(slug);
  return (
    <CommentsContextProvider
      comments={comments}
      slug={slug}
      nextCursor={pagination.nextCursor}
    >
      <div className="flex w-full flex-col gap-8 sm:w-4/5 md:w-3/4 lg:w-1/2">
        <CommentForm />
        <BlogCommentsList />
        <BlogLoadMoreComments />
      </div>
    </CommentsContextProvider>
  );
}

export const generateStaticParams = async () => {
  const blogs = await fetchBlogs({ page: 1 });
  return blogs.items.map((blog) => ({
    params: {
      slug: blog.slug,
    },
  }));
};

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
