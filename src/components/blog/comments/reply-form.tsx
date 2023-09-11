import { useCommentContext } from "@/src/components/blog/comments/contexts/comment.context";
import { Button } from "@/src/components/ui/button";
import { AnimationProps, motion } from "framer-motion";
import { Input } from "@/src/components/ui/input";

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
    context: { addComment, onCommentContentChange, commentContent },
  } = useCommentContext();

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(commentContent);
      }}
      animate={replyFormAnimation.animate}
      initial={replyFormAnimation.initial}
      exit={replyFormAnimation.exit}
      className="my-2 flex gap-4"
    >
      <Input
        value={commentContent}
        onChange={(event) => onCommentContentChange(event.currentTarget.value)}
        placeholder="Reply..."
      />
      <Button>Add</Button>
    </motion.form>
  );
}
