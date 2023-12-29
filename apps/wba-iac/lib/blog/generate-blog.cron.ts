import { GenerateBlogService } from "@wba/logic/src/features/blogs/services/generate-blog.service";

const generateBlogCron = async () => {
  const blogDTO = await GenerateBlogService.generate();
  const result = await GenerateBlogService.publish(blogDTO);
  console.info(result);
};

export const handler = generateBlogCron;
