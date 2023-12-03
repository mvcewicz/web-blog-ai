import { GenerateBlogService } from "@wba/logic/src/features/blogs/services/generate-blog.service";

const generateBlogCron = async (params: unknown) => {
  console.log("parsasmjsssss", params);
  console.log(process.env);
  await GenerateBlogService.generate();
};

export const handler = generateBlogCron;
