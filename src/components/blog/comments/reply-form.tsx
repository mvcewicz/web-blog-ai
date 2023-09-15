import { useCommentContext } from "@/src/components/blog/comments/contexts/comment.context";
import { Button } from "@/src/components/ui/button";
import { AnimationProps, motion } from "framer-motion";
import { Input } from "@/src/components/ui/input";
import { useComments } from "@/src/components/blog/comments/hooks/use-comments";
import { useCommentsContext } from "@/src/components/blog/comments/contexts/comments.context";

const replyFormAnimation = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
} satisfies AnimationProps;

export function ReplyForm() {
  const {
    context: { reply, onCommentContentChange, commentContent, isLoading },
  } = useCommentContext();

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        reply(commentContent);
      }}
      animate={replyFormAnimation.animate}
      initial={replyFormAnimation.initial}
      exit={replyFormAnimation.exit}
      className="flex gap-4 py-2"
    >
      <Input
        value={commentContent}
        onChange={(event) => onCommentContentChange(event.currentTarget.value)}
        placeholder="Reply..."
        disabled={isLoading}
      />
      <Button disabled={isLoading}>Add</Button>
    </motion.form>
  );
}
