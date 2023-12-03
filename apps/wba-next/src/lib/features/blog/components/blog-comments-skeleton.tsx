import { Textarea } from "@wba/next/src/lib/ui/textarea";
import { Button } from "@wba/next/src/lib/ui/button";

function BlogCommentRowSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-darken text-darken flex flex-col items-center gap-0.5">
              <span className="block">10/10/2021</span>
            </span>
          </div>
          <div className="h-10 w-10 rounded-full bg-black shadow" />
          <span className="text-xs">AI</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="flex-1 break-words rounded-xl bg-gray-100 px-4 py-2 text-xs font-bold">
            Random comment
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <button className="border-input bg-background text-primary-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className="text-darken text-xs font-bold">+69</span>
          </button>
          <button className="border-input bg-background text-primary-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <span className="text-darken text-xs font-bold">0</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function BlogCommentsSkeleton() {
  return (
    <div className="pointer-events-none flex w-full select-none flex-col items-center justify-center gap-8 self-start px-2 blur">
      <div className="flex w-full flex-col gap-4 self-center sm:w-4/5 md:w-3/4 lg:w-1/2">
        <form>
          <div className="flex flex-col gap-2">
            <Textarea
              id="comment"
              name="comment"
              placeholder="Comment this article..."
              className="h-32 w-full rounded-lg shadow-md"
            />
            <Button className="h-10 w-full rounded-lg shadow-md">
              Comment
            </Button>
          </div>
        </form>
        <div className="flex w-full flex-col gap-8 px-2 sm:w-4/5 md:w-3/4 lg:w-1/2">
          <BlogCommentRowSkeleton />
          <BlogCommentRowSkeleton />
          <BlogCommentRowSkeleton />
          <BlogCommentRowSkeleton />
        </div>
      </div>
    </div>
  );
}
