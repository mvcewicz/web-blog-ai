"use client";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { Comment } from "@/src/components/blog/comments/comment.types";
import {
  CommentContextProvider,
  useCommentContext,
} from "@/src/components/blog/comments/contexts/comment.context";
import { CommentsList } from "@/src/components/blog/comments/blog-comments-list";
import { AnimatePresence } from "framer-motion";
import { ReplyForm } from "@/src/components/blog/comments/reply-form";
import { FaReply } from "react-icons/fa";
import { cn } from "@/src/utils";
import { Avatar } from "@/src/components/blog/avatar";

type BlogCommentProps = {
  comment: Comment;
};

function CommentVotes() {
  const { comment } = useCommentContext();
  return (
    <div className="flex gap-2">
      <Button
        aria-label="Up"
        className={buttonVariants({ variant: "outline" })}
      >
        <span className="text-xs font-bold text-gray-600">
          +{comment?.votes?.up}
        </span>
      </Button>
      <Button
        aria-label="Down"
        className={buttonVariants({ variant: "outline" })}
      >
        <span className="text-xs font-bold text-gray-600">
          -{comment?.votes?.down}
        </span>
      </Button>
    </div>
  );
}

function CommentAuthor() {
  const { comment } = useCommentContext();
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <CommentMetadata />
      <Avatar src={comment.user.image} alt={comment.user.name} variant="sm" />
      <span className="text-xs">{comment.user.name}</span>
    </div>
  );
}

function CommentContent() {
  const { comment } = useCommentContext();
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="flex-1 break-words rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold">
        {comment.content}
      </p>
    </div>
  );
}

function CommentReplyButton() {
  const {
    context: { toggleReply },
  } = useCommentContext();

  return (
    <Button
      aria-label="Reply"
      type="button"
      className={cn(buttonVariants({ variant: "outline" }), "text-gray-600")}
      onClick={toggleReply}
    >
      <FaReply />
    </Button>
  );
}

function useCommentReplies() {
  const {
    context: {
      isRepliesVisible,
      commentQuery,
      toggleReplies,
      isReplying,
      comment,
      reply,
    },
  } = useCommentContext();

  return {
    reply,
    isReplying,
    comment,
    isRepliesVisible,
    toggleReplies,
    commentQuery,
  };
}

function CommentRepliesList() {
  const { commentQuery } = useCommentReplies();

  if (commentQuery.isLoading || commentQuery.isFetching) {
    return (
      <div className="relative flex gap-1 overflow-hidden p-5">
        <div className="animate-cascade h-2 w-2 rounded-full bg-gray-800 delay-0"></div>
        <div className="animate-cascade h-2 w-2 rounded-full bg-gray-800 delay-100"></div>
        <div className="animate-cascade h-2 w-2 rounded-full bg-gray-800 delay-200"></div>
        <div className="animate-cascade h-2 w-2 rounded-full bg-gray-800 delay-300"></div>
      </div>
    );
  }

  if (!commentQuery.data?.replies) return null;

  return <CommentsList comments={commentQuery.data?.replies} />;
}

function CommentReplies() {
  const { toggleReplies, commentQuery, reply, isRepliesVisible, isReplying } =
    useCommentReplies();

  const comment = commentQuery.data!;

  return (
    <>
      <div className="flex gap-6 py-1">
        {Boolean(comment?.replyCount) && (
          <button
            type="button"
            onClick={toggleReplies}
            className="mt-2 flex text-xs font-bold text-gray-600 underline"
          >
            {isRepliesVisible ? "Hide" : "Show"} replies ({comment.replyCount})
          </button>
        )}
      </div>
      <AnimatePresence>{isReplying && <ReplyForm />}</AnimatePresence>
      <AnimatePresence>
        {isRepliesVisible && (
          <div className="ml-4 mt-4 md:ml-8">
            <CommentRepliesList />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CommentMetadata() {
  const { comment } = useCommentContext();

  return (
    <div className="flex flex-col gap-2">
      <span className="flex flex-col items-center gap-0.5 text-xs text-gray-500">
        <span className="block">
          {new Date(comment.createdAt).toLocaleDateString("en-US")}
        </span>
      </span>
    </div>
  );
}

export function BlogComment({ comment }: BlogCommentProps) {
  return (
    <CommentContextProvider comment={comment}>
      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <CommentAuthor />
            <CommentContent />
          </div>
          <div className="flex items-center gap-2">
            <CommentVotes />
            <CommentReplyButton />
          </div>
        </div>
        <CommentReplies />
      </div>
    </CommentContextProvider>
  );
}
