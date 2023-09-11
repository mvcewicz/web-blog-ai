"use client";

import { createContext, ReactNode, useContext } from "react";
import { Comment } from "@/src/components/blog/comments/comment.types";
import { useComments } from "@/src/components/blog/comments/hooks/use-comments";

type CommentsContext = ReturnType<typeof useComments>;

export const commentsContext = createContext<CommentsContext | null>(null);

export function useCommentsContext() {
  const context = useContext(commentsContext);
  if (!context) {
    throw new Error(
      "useCommentsContext must be used within a CommentsContextProvider",
    );
  }
  return context;
}

type CommentsContextProviderProps = {
  children: ReactNode;
  comments: Comment[];
  nextCursor?: string;
  slug: string;
};

export function CommentsContextProvider({
  children,
  comments,
  nextCursor,
  slug,
}: CommentsContextProviderProps) {
  const context = useComments({
    comments,
    nextCursor,
    slug,
  });

  return (
    <commentsContext.Provider value={context}>
      {children}
    </commentsContext.Provider>
  );
}
