import { Suspense } from "react";
import { BlogFeed } from "@/src/components/blog/blog-feed";
import { BlogFeedSkeleton } from "@/src/components/blog/blog-skeleton";
import { BlogCommentsSkeleton } from "@/src/components/blog/comments/blog-comments-skeleton";
import { generateBlogMetadata } from "@/src/app/blogs/[slug]/blog.metadata";
import { fetchBlogComments } from "@/src/components/blog/comments/actions/fetch-blog-comments";
import { CommentsContextProvider } from "@/src/components/blog/comments/contexts/comments.context";
import { BlogCommentsList } from "@/src/components/blog/comments/blog-comments-list";
import { CommentForm } from "@/src/components/blog/blog-comments";
import { BlogLoadMoreComments } from "@/src/components/blog/blog-comments";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = generateBlogMetadata;

export const revalidate = 3600;

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
