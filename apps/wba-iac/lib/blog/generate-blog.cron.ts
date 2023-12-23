import { GenerateBlogService } from "@wba/logic/src/features/blogs/services/generate-blog.service";

const generateBlogCron = async () => {
  const blogDTO = await GenerateBlogService.generate();
  void GenerateBlogService.publish(blogDTO);
};

export const handler = generateBlogCron;
