import Image from "next/image";
import { HeadlessComponentProps } from "@/src/types/component.type";
import { cn } from "@/src/helpers/utils";

export const Root = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "group flex w-64 flex-col gap-2 overflow-hidden rounded-xl p-4 shadow drop-shadow dark:bg-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const HeaderImage = ({
  className,
  ...props
}: HeadlessComponentProps<typeof Image>) => {
  return (
    <Image
      className={cn(
        "flex aspect-square w-full flex-1 rounded-xl duration-100 group-hover:scale-95",
        className,
      )}
      {...props}
    />
  );
};

export const Body = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
};

export const Title = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"p">) => {
  return (
    <p
      title={typeof children === "string" ? children : undefined}
      className={cn("truncate font-bold", className)}
      {...props}
    >
      {children}
    </p>
  );
};

export const Slug = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"span">) => {
  return (
    <span
      title={typeof children === "string" ? children : undefined}
      className={cn("truncate text-xs text-darken underline", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export const Content = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"p">) => {
  return (
    <p
      title={typeof children === "string" ? children : undefined}
      className={cn("line-clamp-3 overflow-hidden text-sm", className)}
      {...props}
    >
      {children}
    </p>
  );
};
