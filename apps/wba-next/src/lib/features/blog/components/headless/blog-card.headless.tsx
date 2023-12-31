import Image from "next/image";
import { HeadlessComponentProps } from "@wba/next/src/lib/types/component.type";
import { cn } from "@wba/next/src/lib/helpers/ui";

export const Root = ({
  children,
  className,
  ...props
}: HeadlessComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "hover:bg-secondary duration-125 group flex w-64 flex-col gap-2 overflow-hidden rounded-xl border p-4 shadow drop-shadow",
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
      {...props}
      className={cn(
        "flex aspect-square w-full flex-1 rounded-xl duration-100",
        className,
      )}
      alt={props.alt}
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
      className={cn("text-darken truncate text-xs underline", className)}
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
