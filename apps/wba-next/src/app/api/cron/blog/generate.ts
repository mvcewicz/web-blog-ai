import { prismaClient } from "@wba/next/src/lib/helpers/clients/prisma-client";
import { openaiClient } from "@wba/next/src/lib/helpers/clients/openai-client";

type GenerateBlogParams = {
  excludedTopics?: string[];
};

const generateBlogOpenAIMessage = (params: GenerateBlogParams) =>
  `
Please generate a blog entry for me, which is important, in Markdown. Find an interesting topic and delve into it: e.g:
- specific library
- frameworks
- workarounds
- tricks and tips
- new language features
- web frameworks (e.g. React.js, Next.js, Svelte, Solid.js, Qwik, Vue, Angular and others) changes / features/ common patterns
- new libraries,
- interesting suggestions, advanced techniques, best practices, common patterns, code structure, file structure,
- front-end communication
- optimization methods
- development tools
- development applications
- IDE features / plugins
- testing
- debugging
...and many more

${
  params.excludedTopics
    ? `Excluded titles / topics are: ${params.excludedTopics.join(
        ", ",
      )}, please find something else it can be similar or related but not very similar or exact same topic.`
    : ""
}

Keep in mind that you don't have to write about everything,
just choose one topic and delve deeper into it,
it's better to write about one topic in detail than to write about everything in general
also you don't have to pick everything from the list above, you can choose something else,
but it should be related to web development or full stack
if the relevant topic contains code content, show short examples as code, perfectly a couple of them.
Whole content should be around 8000-12000 characters (compress text if possible). (Please exhaust the topic)
The entire text should be precise on one topic with interesting inserts encouraging further reading.
Generate also up to 10 attractive tags and one slug (slug and tags shouldn't be a part of content check out structure on the end), slug is part of the link,
they should be related to the topic, optionally you can also provide several links at the end of content that may be helpful and can expand the topic, maximum couple links.
Please return everything in JSON format in the following structure:

Content should be in Markdown format, please keep formatting Markdown symbols, also remember to keep it clean and readable.

Please 


\`\`\`json
{
       "topic": <generated topic (string)>,
       "content": <generated Markdown content please keep formatting Markdown symbols (string)>,
       "tags": <generated tags (string[])>,
       "slug": <generated slug (string)>,
}
\`\`\`
`.trim();

type GenerateBlogResponse = {
  topic: string;
  content: string;
  tags: string[];
  slug: string;
};

export async function generateBlog() {
  const blogTitles = await prismaClient.blog.findMany({
    select: {
      title: true,
    },
  });

  const blogTopics = new Set(blogTitles.map((blog) => blog.title));

  const response = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    n: 1,
    temperature: 0.8,
    messages: [
      {
        role: "user",
        content: generateBlogOpenAIMessage({
          excludedTopics: Array.from(blogTopics),
        }),
      },
    ],
  });

  const res = JSON.parse(
    response.choices[0].message.content!,
  ) as GenerateBlogResponse;

  return prismaClient.blog.create({
    data: {
      tags: res.tags,
      title: res.topic,
      content: res.content,
      slug: res.slug,
      // TODO: maybe generate image using some AI tool
      image: "https://picsum.photos/seed/picsum/200/300",
    },
  });
}
