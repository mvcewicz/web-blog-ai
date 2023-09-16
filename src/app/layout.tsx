import "./globals.css";

import { Nav } from "../components/nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/utils";
import { Footer } from "../components/footer";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/clients/query-client";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/src/providers/theme.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog.AI",
  description: "Blogs powered by AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          inter.className,
          "m-0 flex min-h-screen flex-col bg-background",
        )}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
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
        </ClerkProvider>
      </body>
    </html>
  );
}
