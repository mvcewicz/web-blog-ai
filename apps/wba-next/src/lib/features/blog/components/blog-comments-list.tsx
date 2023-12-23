"use client";

import { BlogComment } from "@wba/next/src/lib/features/blog/blog-comments.types";
import { BlogCommentItem } from "@wba/next/src/lib/features/blog/components/blog-comment-item";
import { motion, AnimationProps } from "framer-motion";
import { useCommentsContext } from "@wba/next/src/lib/features/blog/contexts/comments.context";

type BlogCommentsListProps = {
  comments: BlogComment[];
};

const commentAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
} satisfies AnimationProps;

export function CommentsList({ comments }: BlogCommentsListProps) {
  return (
    <motion.ul className="flex flex-1 flex-col gap-4">
      {comments.map((comment, i) => (
        <motion.li
          exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
          initial={commentAnimation.initial}
          animate={commentAnimation.animate}
          transition={{ delay: 0.1 * (i + 1) }}
          key={comment.id}
        >
          <BlogCommentItem key={comment.id} comment={comment} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function BlogCommentsList() {
  const { comments } = useCommentsContext();
  return <CommentsList comments={comments ?? []} />;
}
