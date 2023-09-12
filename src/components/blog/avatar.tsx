import { cva } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/src/utils";

const avatarBorderClassName =
  "rounded-full border-rose-50 border-transparent border-t-rose-300 border-l-rose-300 border-4";

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
        src={src}
        alt={alt}
        layout="fill"
        objectFit={"cover"}
        className={cn(avatarBorderClassName, "h-full w-full")}
      />
    </div>
  );
}