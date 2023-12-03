import { cn } from "@/src/lib/helpers/utils";
import ReactMarkdown from "react-markdown";
import { Avatar } from "@/src/lib/features/blog/components/avatar";
import { HeadlessComponentProps } from "@/src/lib/types/component.type";

export const Root = ({
  children,
  className,
}: HeadlessComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 sm:w-4/5 md:w-3/4 lg:w-1/2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Header = ({
  children,
  className,
}: HeadlessComponentProps<"header">) => {
  return (
    <header className={cn("flex flex-col gap-1", className)}>{children}</header>
  );
};

type ContentProps = HeadlessComponentProps<"div"> & { children: string };

export const Content = ({ children, className }: ContentProps) => {
  return (
    <ReactMarkdown
      className={cn(
        "prose flex flex-col text-primary dark:prose-neutral lg:prose-lg prose-headings:text-primary dark:prose-a:text-blue-500 dark:prose-strong:text-rose-400 dark:prose-code:text-gray-300",
        className,
      )}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Author = ({
  children,
  className,
}: HeadlessComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
};

export const AuthorImage = (props: HeadlessComponentProps<typeof Avatar>) => {
  return <Avatar {...props} />;
};

export const AuthorName = ({
  children,
  className,
}: HeadlessComponentProps<"span">) => {
  return (
    <span className={cn("text-xs font-bold text-darken", className)}>
      {children}
    </span>
  );
};

export const Metadata = ({
  children,
  className,
}: HeadlessComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-row gap-2 text-xs text-darken", className)}>
      {children}
    </div>
  );
};
