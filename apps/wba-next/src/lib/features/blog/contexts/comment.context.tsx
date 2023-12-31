import { createContext, ReactNode, useContext } from "react";
import { BlogComment } from "@wba/next/src/lib/features/blog/blog-comments.types";
import { useComment } from "@wba/next/src/lib/features/blog/hooks/use-comment";

type CommentContext = {
  comment: BlogComment;
  context: ReturnType<typeof useComment>;
};

export const commentContext = createContext<CommentContext | null>(null);

export function useCommentContext() {
  const context = useContext(commentContext);
  if (!context) {
    throw new Error(
      "useCommentContext must be used within a CommentContextProvider",
    );
  }
  return context;
}

type CommentContextProviderProps = {
  comment: BlogComment;
  children: ReactNode;
};

export function CommentContextProvider({
  comment,
  children,
}: CommentContextProviderProps) {
  const context = useComment(comment);
  return (
    <commentContext.Provider value={{ comment, context }}>
      {children}
    </commentContext.Provider>
  );
}
