"use client";

import { Button, buttonVariants } from "@wba/next/src/lib/ui/button";
import { BlogComment } from "@wba/next/src/lib/features/blog/blog-comments.types";
import {
  CommentContextProvider,
  useCommentContext,
} from "@wba/next/src/lib/features/blog/contexts/comment.context";
import { CommentsList } from "@wba/next/src/lib/features/blog/components/blog-comments-list";
import { AnimatePresence } from "framer-motion";
import { FaReply } from "react-icons/fa";
import { cn } from "@wba/next/src/lib/helpers/ui";
import { Avatar } from "@wba/next/src/lib/features/blog/components/avatar";
import { CascadeLoading } from "@wba/next/src/lib/components/cascade-loading";
import { BlogCommentsReplyForm } from "@wba/next/src/lib/features/blog/components/blog-comments-reply-form";

type BlogCommentProps = {
  comment: BlogComment;
};

function CommentVotes() {
  const { comment } = useCommentContext();
  return (
    <div className="flex gap-2">
      <Button
        aria-label="Up"
        className={buttonVariants({ variant: "outline" })}
      >
        <span className="text-darken text-xs font-bold">
          +{comment?.votes?.up}
        </span>
      </Button>
      <Button
        aria-label="Down"
        className={buttonVariants({ variant: "outline" })}
      >
        <span className="text-darken text-xs font-bold">
          -{comment?.votes?.down}
        </span>
      </Button>
    </div>
  );
}

function CommentAuthor() {
  const { comment } = useCommentContext();
  return (
    <div className="flex-start flex flex-col content-center items-center gap-2">
      <CommentMetadata />
      <Avatar src={comment.user.image} alt={comment.user.name} variant="sm" />
      <span className="text-center text-xs">{comment.user.name}</span>
    </div>
  );
}

function CommentContent() {
  const { comment } = useCommentContext();
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-secondary-foreground flex-1 break-words rounded-xl border px-4 py-2.5 text-xs font-bold">
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
      className={cn(buttonVariants({ variant: "outline" }), "text-darken")}
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
    return <CascadeLoading />;
  }
  if (!commentQuery.data?.replies) {
    return null;
  }
  return <CommentsList comments={commentQuery.data?.replies} />;
}

function CommentReplies() {
  const { toggleReplies, commentQuery, isRepliesVisible, isReplying } =
    useCommentReplies();
  const comment = commentQuery.data!;
  return (
    <>
      <div className="flex gap-6 py-1">
        {Boolean(comment?.replyCount) && (
          <button
            type="button"
            onClick={toggleReplies}
            className="text-darken mt-2 flex text-xs font-bold underline"
          >
            {isRepliesVisible ? "Hide" : "Show"} replies ({comment.replyCount})
          </button>
        )}
      </div>
      <AnimatePresence>
        {isReplying && <BlogCommentsReplyForm />}
      </AnimatePresence>
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
      <span className="text-darken flex flex-col items-center gap-0.5 text-xs">
        <span className="block">
          {new Date(comment.createdAt).toLocaleDateString("en-US")}
        </span>
      </span>
    </div>
  );
}

export function BlogCommentItem({ comment }: BlogCommentProps) {
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
