import { promptKeywords } from "../fixtures/generate-blog.prompt";
import { ChatPromptBuilder } from "./chat-session.service";
import { Blog, BlogDTO } from "@wba/types/src/blog.type";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string().url(),
    }),
  ),
});

export class GenerateBlogService {
  static async getExcludedTopics() {
    const url = new URL(`${process.env.WBA_API_URL}/blogs`);
    url.searchParams.set("fields", "title");
    const blogs = (await (await fetch(url)).json()) as Blog[];
    return Array.from(new Set(blogs.map((blog) => blog.title)));
  }

  static getPromptKeywords() {
    return promptKeywords;
  }

  static async publish(blog: BlogDTO) {
    return fetch(`${process.env.WBA_API_URL}/webhooks/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: blog,
        secret: "123",
      }),
    });
  }

  static async generate(): Promise<BlogDTO> {
    const excludedTopics = await GenerateBlogService.getExcludedTopics();
    const promptKeywords = GenerateBlogService.getPromptKeywords();
    const chatBuilder = new ChatPromptBuilder();
    chatBuilder.addContext("Please response using Markdown format");
    const header = await chatBuilder.prompt(`
      Please write header of blog about one of topics (you should ignore: ${excludedTopics} exact topics, it can be something similar bot not the same (keep in mind it shouldn't be exact topic but similar or related to it): ${promptKeywords}
      Please use markdown format, please keep formatting Markdown symbols, also remember to keep it clean and readable. Whole header should be around 200-300 words.
      You can also show some attractive code fragments, it's very important, because it gives better perspective.
    `);
    const content = await chatBuilder.prompt(`
      We have paragraph, now please write main content paragraph, this section should be only middle part of blog, please don't include header and conclusion here. It should be around 600-700 words and a lot of code fragments, it's very important, because it gives better perspective.
      Please include explanation, examples, code fragments, common usage/patterns/mistakes/best practices,
      Content should be in Markdown format, please keep formatting Markdown symbols, also remember to keep it clean and readable.
    `);
    const conclusion = await chatBuilder.prompt(`
      Now please write conclusion paragraph, it should be around 200-300 words. it will be the last paragraph of the blog.
      Please use markdown format, please keep formatting Markdown symbols, also remember to keep it clean and readable.
    `);
    const links = await chatBuilder.prompt(`
      Please prepare 3-4 links to other resources as JSON array of { label: <name>, href: <href> } don't use Markdown format, it should be plain json
    `);
    const metadata = await chatBuilder.prompt(`
      Please generate up to 10 tags as JSON array of strings and slug and title as string, response format: { title: string, slug: string, tags: string[] } dont use markdown format, it should be plain json
    `);
    const blog = {
      content: `${header}\n${content}\n${conclusion}`,
      metadata: JSON.parse(metadata),
      links: JSON.parse(links),
    };
    const parsedMetadata = JSON.parse(metadata);
    const blogParsed = blogSchema.parse({
      ...blog,
      ...parsedMetadata,
    });
    return {
      content: blogParsed.content,
      tags: blogParsed.tags,
      title: blogParsed.title,
      slug: blogParsed.slug,
      // TODO: generate image using some AI tool, for now it's just random image
      image: "https://picsum.photos/seed/picsum/200/300",
    };
  }
}
