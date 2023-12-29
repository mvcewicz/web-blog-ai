import { cn } from "@wba/next/src/lib/helpers/ui";
import ReactMarkdown from "react-markdown";
import { Avatar } from "@wba/next/src/lib/features/blog/components/avatar";
import { HeadlessComponentProps } from "@wba/next/src/lib/types/component.type";

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
        "prose text-primary dark:prose-neutral lg:prose-lg prose-headings:text-primary dark:prose-a:text-blue-500 dark:prose-strong:text-rose-400 dark:prose-code:text-gray-300 flex flex-col",
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
    <span className={cn("text-darken text-xs font-bold", className)}>
      {children}
    </span>
  );
};

export const Metadata = ({
  children,
  className,
}: HeadlessComponentProps<"div">) => {
  return (
    <div className={cn("text-darken flex flex-row gap-2 text-xs", className)}>
      {children}
    </div>
  );
};
