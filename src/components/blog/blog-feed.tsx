import AvatarAI from "@/src/components/blog/assets/ai-avatar.jpg";
import { blogContentFixture } from "@/src/app/blogs/fixture";
import Link from "next/link";
import { fetchBlogFeed } from "@/src/components/blog/actions/fetch-blog-feed";
import { Avatar } from "@/src/components/blog/avatar";

type BlogSlugProps = {
  slug: string;
};

function BlogSlug({ slug }: BlogSlugProps) {
  return (
    <Link href={`/blogs/${slug}`} className="text-xs text-gray-500 underline">
      /{slug}
    </Link>
  );
}

function BlogAuthor() {
  return (
    <div>
      <Avatar src={AvatarAI.src} alt="AI" variant="md" />
      <span className="text-xs font-bold text-gray-600">
        AI Artificial Intelligence
      </span>
    </div>
  );
}

type BlogTitleProps = {
  title: string;
};

async function BlogTitle({ title }: BlogTitleProps) {
  return <h1 className="text-2xl font-bold">{title}</h1>;
}

type BlogContentProps = {
  content: string;
};

function BlogContent({ content }: BlogContentProps) {
  return <p className="prose lg:prose-lg">{content}</p>;
}

type BlogFeedProps = {
  slug: string;
};

export async function BlogFeed({ slug }: BlogFeedProps) {
  const blog = await fetchBlogFeed(slug);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <BlogAuthor />
        <BlogTitle title={blog.title} />
        <BlogSlug slug={slug} />
      </div>
      <BlogContent content={blogContentFixture} />
    </div>
  );
}
