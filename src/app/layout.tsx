import { Nav } from "../components/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/utils";
import { Footer } from "../components/footer";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/clients/query-client";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog.AI",
  description: "Blogs powered by AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={cn(inter.className, "m-0 flex h-[100vh] flex-col")}>
          <QueryClientProvider client={queryClient}>
            <Nav />
            <main className="flex flex-1 flex-col px-10 py-4">{children}</main>
            <Footer />
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
