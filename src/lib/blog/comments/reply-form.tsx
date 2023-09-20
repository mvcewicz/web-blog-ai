import { useCommentContext } from "@/src/lib/blog/comments/contexts/comment.context";
import { Button } from "@/src/lib/ui/button";
import { AnimationProps, motion } from "framer-motion";
import { Input } from "@/src/lib/ui/input";
import { useUser } from "@clerk/nextjs";

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

const useReplyForm = () => {
  const { context } = useCommentContext();

  const user = useUser();

  return {
    user,
    context,
  };
};

export function ReplyForm() {
  const {
    context: { reply, onCommentContentChange, commentContent, isLoading },
    user,
  } = useReplyForm();

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
        placeholder={
          user?.isSignedIn ? "Reply..." : "You must be signed in to reply"
        }
        disabled={isLoading || !user?.isSignedIn}
      />
      <Button disabled={isLoading || !user?.isSignedIn}>Add</Button>
    </motion.form>
  );
}
