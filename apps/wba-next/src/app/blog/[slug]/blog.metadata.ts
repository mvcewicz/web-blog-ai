import { BlogPageProps } from "@wba/next/src/app/blog/[slug]/blog.types";
import { fetchBlogFeed } from "@wba/next/src/lib/features/blog/api/fetch-blog-feed";
import AvatarAI from "@wba/next/src/lib/features/blog/assets/ai-avatar.jpg";
import { Metadata } from "next";

export async function generateBlogMetadata({ params }: BlogPageProps) {
  const blog = await fetchBlogFeed(params.slug);
  return {
    title: `${blog.title} | WebBlog.AI`,
    description: `${blog.content.slice(0, 50)}...`,
    openGraph: {
      title: `${blog.title} | WebBlog.AI`,
      description: `${blog.content.slice(0, 50)}...`,
      url: `https://webblog.ai/blog/${blog.slug}`,
      authors: ["https://x.com/@mvcwcz", "https://github.com.com/mvcewicz"],
      locale: "en_US",
      tags: [
        "AI",
        "Artificial Intelligence",
        "WebBlog.AI",
        "web blog",
        "web dev blog",
        "web dev ai",
        "web ai",
        "web artificial intelligence",
        "mvcewicz",
        "mvcwcz",
        "@mvcwcz",
        "Wojciech Macewicz",
        ...blog.title.toLowerCase().split(" "),
      ],
      siteName: "WebBlog.AI",
      modifiedTime: blog.updatedAt,
      type: "article",
      publishedTime: blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      site: "@mvcwcz",
      creator: "@mvcwcz",
      title: `${blog.title} | WebBlog.AI`,
      description: `${blog.content.slice(0, 50)}...`,
      images: [
        {
          url: AvatarAI.src,
          alt: "AI",
          type: "image/jpeg",
          width: AvatarAI.width,
          height: AvatarAI.height,
        },
      ],
    },
    applicationName: "WebBlog.AI",
    creator: "@mvcwcz",
    keywords: [
      "AI",
      "Artificial Intelligence",
      "WebBlog.AI",
      "web blog",
      "web dev blog",
      "web dev ai",
      "web ai",
      "web artificial intelligence",
      "mvcewicz",
      "mvcwcz",
      "@mvcwcz",
      "Wojciech Macewicz",
      ...blog.title.toLowerCase().split(" "),
    ],
    authors: [
      {
        name: "@mvcwcz",
        url: "https://x.com/@mvcwcz",
      },
      {
        name: "mvcewicz",
        url: "https://github.com/mvcewicz",
      },
    ],
  } satisfies Metadata;
}
