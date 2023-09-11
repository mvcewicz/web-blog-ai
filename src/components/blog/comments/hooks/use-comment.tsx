import { Comment } from "@/src/components/blog/comments/comment.types";
import { useState } from "react";

export function useComment(comment: Comment) {
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  function toggleReplies() {
    setIsRepliesVisible((prev) => !prev);
  }

  function toggleReply() {
    setIsReplying((prev) => !prev);
  }

  function addComment(content: string) {
    console.log(content);
  }

  function onCommentContentChange(content: string) {
    setCommentContent(content);
  }

  return {
    isRepliesVisible,
    isReplying,
    toggleReplies,
    toggleReply,
    addComment,
    onCommentContentChange,
    commentContent,
  };
}
