"use client";

import {
  DialogContent,
  Dialog,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { SignIn, UserButton, useSession } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Auth() {
  const session = useSession();

  if (!session.isSignedIn) {
    return <AuthModalButton />;
  }

  return (
    <div className="px  -2">
      <UserButton />
    </div>
  );
}

export function AuthModalButton() {
  const path = usePathname();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <SignIn
          appearance={{
            elements: {
              footer: {
                display: "none",
              },
            },
          }}
          path={path}
          afterSignInUrl={path}
          afterSignUpUrl={path}
          redirectUrl={path}
        />
      </DialogContent>
    </Dialog>
  );
}
