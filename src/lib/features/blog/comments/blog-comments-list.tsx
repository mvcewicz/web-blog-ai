"use client";

import { Comment } from "@/src/lib/features/blog/comments/blog-comment.types";
import { BlogComment } from "@/src/lib/features/blog/comments/blog-comment";
import { motion, AnimationProps } from "framer-motion";
import { useCommentsContext } from "@/src/lib/features/blog/comments/contexts/comments.context";

type BlogCommentsListProps = {
  comments: Comment[];
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
          exit={{ opacity: 0, y: 40, transition: { duration: 0.2 } }}
          initial={commentAnimation.initial}
          animate={commentAnimation.animate}
          transition={{ delay: 0.1 * (i + 1) }}
          key={comment.id}
        >
          <BlogComment key={comment.id} comment={comment} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function BlogCommentsList() {
  const { comments } = useCommentsContext();
  return <CommentsList comments={comments!} />;
}
