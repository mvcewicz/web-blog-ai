import { cva } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/src/utils";

const avatarBorderClassName =
  "rounded-full border-transparent border-t-colored border-l-colored border-4";

type AvatarProps = {
  src: string;
  variant: "sm" | "md";
  alt: string;
};

const avatarVariants = cva("relative rounded-full", {
  variants: {
    variant: {
      sm: "w-14 h-14",
      md: "w-24 h-24",
    },
  },
});

export function Avatar({ src, variant, alt }: AvatarProps) {
  return (
    <div className={avatarVariants({ variant })}>
      <Image
        priority
        src={src}
        height={20}
        width={20}
        alt={alt}
        className={cn(avatarBorderClassName, "h-full w-full")}
      />
    </div>
  );
}
