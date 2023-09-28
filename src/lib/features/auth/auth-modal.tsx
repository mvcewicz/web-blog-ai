"use client";

import { Button } from "@/src/lib/ui/button";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function AuthButton() {
  const session = useSession();
  const path = usePathname();

  if (!session.isSignedIn) {
    return (
      <SignInButton
        mode="modal"
        redirectUrl={path}
        afterSignInUrl={path}
        afterSignUpUrl={path}
      >
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    );
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
