import { createContext, ReactNode, useContext } from "react";
import { Comment } from "@/src/lib/blog/comments/blog-comment.types";
import { useComment } from "../hooks/use-comment";

type CommentContext = {
  comment: Comment;
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
  comment: Comment;
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
