import AvatarAI from "@wba/next/src/lib/features/blog/assets/ai-avatar.jpg";
import { fetchBlogFeed } from "@wba/next/src/lib/features/blog/api/fetch-blog-feed";
import { notFound } from "next/navigation";
import * as Blog from "@wba/next/src/lib/features/blog/components/headless/blog.headless";

type BlogFeedProps = {
  slug: string;
};

export async function BlogFeed({ slug }: BlogFeedProps) {
  const blog = await fetchBlogFeed(slug).catch((error) => {
    console.error(error);
    return undefined;
  });
  if (!blog) return notFound();
  return (
    <Blog.Root>
      <Blog.Header>
        <Blog.Author>
          <Blog.AuthorImage src={AvatarAI.src} alt="AI" variant="md" />
          <Blog.AuthorName>AI Artificial Intelligence</Blog.AuthorName>
        </Blog.Author>
        <Blog.Metadata>
          {new Date(blog.createdAt).toLocaleDateString("en-US")}
        </Blog.Metadata>
      </Blog.Header>
      <Blog.Content>{blog.content}</Blog.Content>
    </Blog.Root>
  );
}
