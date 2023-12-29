import "./globals.css";

import { Nav } from "@wba/next/src/lib/components/nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@wba/next/src/lib/helpers/ui";
import { Footer } from "@wba/next/src/lib/components/footer";
import { ReactNode, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@wba/next/src/lib/helpers/clients/query-client";
import { ThemeProvider } from "@wba/next/src/lib/providers/theme.provider";
import { AuthProvider } from "@wba/next/src/lib/providers/auth.provider";
import { PageProgressBar } from "@wba/next/src/lib/components/page-progress-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog.AI",
  description: "Blogs powered by AI",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          inter.className,
          "bg-background m-0 flex min-h-screen flex-col",
        )}
      >
        <Suspense>
          <PageProgressBar />
        </Suspense>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Nav />
              <main className="flex flex-1 flex-col px-6 py-4 sm:px-10">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
