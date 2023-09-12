import AvatarAI from "@/src/components/blog/assets/ai-avatar.jpg";
import Link from "next/link";
import { fetchBlogFeed } from "@/src/components/blog/actions/fetch-blog-feed";
import { Avatar } from "@/src/components/blog/avatar";

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

type BlogMetadataProps = {
  createdAt: string;
};

function BlogMetadata({ createdAt }: BlogMetadataProps) {
  return (
    <div className="flex flex-row gap-2 text-xs text-gray-500">
      <span>{new Date(createdAt).toLocaleDateString("en-US")}</span>
    </div>
  );
}

export async function BlogFeed({ slug }: BlogFeedProps) {
  const blog = await fetchBlogFeed(slug);
  return (
    <div className="flex w-full flex-col gap-4 sm:w-4/5 md:w-3/4 lg:w-2/3">
      <div className="flex flex-col ">
        <BlogAuthor />
        <BlogMetadata createdAt={blog.createdAt} />
        <BlogTitle title={blog.title} />
      </div>
      <BlogContent content={blog.content} />
    </div>
  );
}