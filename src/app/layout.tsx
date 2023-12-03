import "./globals.css";

import { Nav } from "@/src/lib/components/nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/lib/helpers/utils";
import { Footer } from "@/src/lib/components/footer";
import { ReactNode, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/lib/helpers/clients/query-client";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/src/lib/providers/theme.provider";
import { unstable_noStore } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog.AI",
  description: "Blogs powered by AI",
};

type RootLayoutProps = {
  children: ReactNode;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  unstable_noStore();
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          inter.className,
          "m-0 flex min-h-screen flex-col bg-background",
        )}
      >
        {/*<AuthProvider>*/}
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className="flex flex-1 flex-col px-6 py-4 sm:px-10">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </QueryClientProvider>
        {/*</AuthProvider>*/}
      </body>
    </html>
  );
}
