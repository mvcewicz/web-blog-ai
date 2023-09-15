"use client";

import {
  DialogContent,
  Dialog,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { SignIn, SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Auth() {
  const session = useSession();
  const path = usePathname();

  if (!session.isSignedIn) {
    return <AuthModalButton />;
  }

  return (
    <div className="px-2">
      <UserButton
        afterSignOutUrl={path}
        afterMultiSessionSingleSignOutUrl={path}
        afterSwitchSessionUrl={path}
      />
    </div>
  );
}

export function AuthModalButton() {
  const path = usePathname();
  return (
    <SignInButton
      mode="modal"
      redirectUrl={path}
      afterSignInUrl={path}
      afterSignUpUrl={path}
    >
      <Button>Sign In</Button>
    </SignInButton>
  );
}
