import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { unstable_noStore } from "next/cache";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  unstable_noStore();
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};
