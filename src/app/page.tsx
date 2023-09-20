import { Button } from "@/src/lib/ui/button";
import Link from "next/link";

function HomeIntro() {
  return (
    <div className="mb-8 flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-4xl font-bold">WebBlog.AI</span>
        <span className="text-sm font-bold">Blog that is powered by AI</span>
      </div>
      <Link href="/blogs">
        <Button>Check out blogs</Button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeIntro />
    </div>
  );
}
