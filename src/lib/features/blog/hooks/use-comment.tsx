import { Comment } from "@/src/lib/features/blog/blog-comments.types";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetcher } from "@/src/lib/helpers/fetcher";
import { useCommentsContext } from "@/src/lib/features/blog/contexts/comments.context";
import { queryClient } from "@/src/lib/helpers/clients/query-client";
import { useParams } from "next/navigation";

export const useCommentLocal = (commentId: string) => {
  const commentsContext = useCommentsContext();
  return useQuery({
    queryKey: ["comments", { id: commentId }],
    queryFn: async () => {
      const res = await fetcher<{ item: Comment }>({
        url: `/api/blogs/${commentsContext.slug}/comments/${commentId}`,
      });
      return res.item;
    },
    initialData: () => {
      const commentsQuery = queryClient.getQueryData(["comments"]) as {
        pages: { items: Comment[] }[];
      };
      return commentsQuery.pages
        .flatMap((page) => page.items)
        .find((comment) => comment.id === commentId);
    },
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
};

function useCommentReplyMutation(commentId: string) {
  const { slug } = useParams();
  return useMutation({
    mutationKey: ["comments", commentId],
    mutationFn: async (content: string) => {
      return fetcher({
        url: `/api/blogs/${slug}/comments/${commentId}`,
        method: "POST",
        body: { content },
      });
    },
  });
}

export function useComment(comment: Comment) {
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const commentReplyMutation = useCommentReplyMutation(comment.id);
  const commentQuery = useCommentLocal(comment.id);

  useEffect(() => {
    if (!commentQuery.data?.replies && isRepliesVisible) {
      commentQuery.refetch();
    }
  }, [commentQuery, isRepliesVisible]);

  function toggleReplies() {
    setIsRepliesVisible((prev) => !prev);
  }

  function toggleReply() {
    setIsReplying((prev) => !prev);
  }

  async function reply(content: string) {
    commentReplyMutation.mutate(content, {
      onSuccess: async () => {
        await commentQuery.refetch();
        setCommentContent("");
      },
    });
  }

  function onCommentContentChange(content: string) {
    setCommentContent(content);
  }

  const isLoading = commentQuery.isLoading || commentReplyMutation.isLoading;

  return {
    isLoading,
    isRepliesVisible,
    isReplying,
    toggleReplies,
    toggleReply,
    reply,
    onCommentContentChange,
    commentContent,
    commentQuery,
    comment: commentQuery.data!,
    commentReplyMutation,
  };
}
