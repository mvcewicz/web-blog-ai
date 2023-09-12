import Image from "next/image";
import { Blog } from "@/src/components/blog/blog.types";

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group flex flex-col gap-2 rounded-xl p-4 shadow drop-shadow">
      <Image
        priority
        className="flex aspect-square w-52 flex-1  rounded-xl duration-100 group-hover:scale-95"
        src={blog.image}
        alt={blog.title}
        width={100}
        height={100}
      />
      <div className="flex flex-col">
        <p className="font-bold">{blog.title}</p>
        <span className="text-xs text-gray-500 underline">/{blog.slug}</span>
      </div>
      <p className="text-sm">{blog.content}</p>
    </div>
  );
}
