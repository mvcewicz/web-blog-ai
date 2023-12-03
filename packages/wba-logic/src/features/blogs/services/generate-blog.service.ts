import { openaiClient } from "@wba/openai";
import OpenAI from "openai";
import { generateBlogOpenAIMessage } from "@wba/logic/src/features/blogs/fixtures/generate-blog.prompt";
import { Blog, BlogDTO } from "@wba/types/src/blog.type";

type GenerateBlogResponse = {
  topic: string;
  content: string;
  tags: string[];
  slug: string;
};


export class GenerateBlogService {
  static async getExcludedTopics() {
    try {
      const url = new URL(`${process.env.WBA_API_URL}/blogs`);
      url.searchParams.set("fields", "title");
      const blogs = (await (await fetch(url)).json()) as Blog[];
      return Array.from(new Set(blogs.map((blog) => blog.title)));
    } catch (err) {
      return [];
    }
  }

  static parseBlogDTO(completion: OpenAI.ChatCompletion): BlogDTO {
    const res = JSON.parse(
      completion.choices[0].message.content!,
    ) as GenerateBlogResponse;
    return {
      tags: res.tags,
      title: res.topic,
      content: res.content,
      slug: res.slug,
      // TODO: generate image using some AI tool
      image: "https://picsum.photos/seed/picsum/200/300",
    };
  }

  static async sendWebhookCallback(blog: BlogDTO) {
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

  static async generate() {
    const excludedTopics = await GenerateBlogService.getExcludedTopics();
    const response = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      n: 1,
      temperature: 0.8,
      messages: [
        {
          role: "user",
          content: generateBlogOpenAIMessage({
            excludedTopics: excludedTopics,
          }),
        },
      ],
    });
    console.log("resssponse", response);

    const blog = GenerateBlogService.parseBlogDTO(response);
    return GenerateBlogService.sendWebhookCallback(blog);
  }
}
