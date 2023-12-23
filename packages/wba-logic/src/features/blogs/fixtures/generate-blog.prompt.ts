type GenerateBlogParams = {
  excludedTopics?: string[];
};

export const promptKeywords = [
  "javascript",
  "typescript",
  "react",
  "angular",
  "vue",
  "nodejs",
  "express",
  "nestjs",
  "mongodb",
  "mysql",
  "postgresql",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "serverless",
  "microservices",
  "graphql",
  "rest",
  "websockets",
  "webassembly",
  "pwa",
  "spa",
  "ssr",
  "seo",
  "isr",
  "storybook",
  "storybookjs",
  "solidjs",
  "astro",
  "svelte",
  "next.js",
  "nuxt.js",
  "tailwindcss",
  "bootstrap",
  "material-ui",
  "chakra-ui",
  "styled-components",
  "emotion",
  "redux",
  "mobx",
  "xstate",
  "jest",
  "cypress",
  "vitest",
  "vite",
  "webpack",
  "rollup",
  "tsup",
  "babel",
  "eslint",
  "react native",
  "flutter",
  "browser native api",
  "webgl",
  "webgpu",
  "animations",
  "css",
  "html",
  "web components",
  "web workers",
  "web assembly",
  "web rtc",
  "web sockets",
  "web speech",
  "web audio",
  "web storage",
  "web crypto",
  "web share",
  "web bluetooth",
  "web usb",
  "web midi",
  "web vr",
  "web xr",
  "web optimization",
  "bundle size",
  "seo",
  "web performance",
  "grpc",
  "rpc",
  "schema",
  "validation",
  "openapi",
  "swagger",
  "best practices",
  "common mistakes",
  "tips and tricks",
  "how to",
  "tutorial",
  "guide",
  "introduction",
  "deep dive",
  "advanced",
  "beginner",
  "intermediate",
  "expert",
  "mocks",
  "e2e",
  "unit tests",
  "integration tests",
  "vercel",
  "netlify",
  "heroku",
  "cloudflare",
  "firebase",
  "editors",
  "vscode",
  "vim",
  "emacs",
  "webstorm",
  "intellij",
  "ide",
  "extensions",
  "plugins",
  "open source",
  "github",
  "gitlab",
  "bitbucket",
  "git",
  "github actions",
  "ci",
  "cd",
  "breaking changes",
  "web evolution",
  "serverless",
  "microservices",
  "monolith",
  "architecture",
  "design patterns",
  "algorithms",
  "data structures",
  "monorepo",
  "lerna",
  "yarn workspaces",
  "npm workspaces",
  "pnpm workspaces",
  "yarn",
  "npm",
  "pnpm",
  "nvm",
  "bun",
  "sql",
  "nosql",
  "orm",
  "cqrs",
  "event sourcing",
  "postgres",
  "auroa",
  "mysql",
  "mongodb",
  "redis",
  "dynamodb",
  "cassandra",
  "neo4j",
  "fauna",
  "prisma",
  "sequelize",
  "typeorm",
  "mongoose",
  "drizzle.io",
  "encoding",
  "decoding",
  "compression",
  "decompression",
  "css-in-js",
  "kafka",
  "rabbitmq",
  "kinesis",
  "sqs",
  "sns",
  "queue",
  "pub/sub",
  "message broker",
  "message queue",
  "message bus",
  "message streaming",
  "high traffic",
  "high availability",
  "concurrency",
  "parallelism",
  "web security",
  "web vulnerabilities",
  "web attacks",
  "web exploits",
  "web pentesting",
  "protobuf",
  "figma",
  "design",
  "ux",
  "ui",
];

export const generateBlogOpenAIMessage = (params: GenerateBlogParams) =>
  `
IMPORTANT: Whole blog content should be minimum 500-600 words, it should take 5 minutes to read it, please exhaust the topic, the entire text should be precise on one topic with interesting inserts encouraging further reading.
  
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
(Please exhaust the topic)
The entire text should be precise on one topic with interesting inserts encouraging further reading.
Generate also up to 10 attractive tags and one slug (slug and tags shouldn't be a part of content check out structure on the end), slug is part of the link,
they should be related to the topic, optionally you can also provide several links at the end of content that may be helpful and can expand the topic, maximum couple links.
Please return everything in JSON format in the following structure:


Content should be in Markdown format, please keep formatting Markdown symbols, also remember to keep it clean and readable.


\`\`\`json
{
       "topic": <generated topic (string)>,
       "content": <generated Markdown content please keep formatting Markdown symbols (string)>,
       "tags": <generated tags (string[])>,
       "slug": <generated slug (string)>,
}
\`\`\`
`.trim();
