import { Nav } from "../components/nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/utils";
import { Footer } from "../components/footer";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/clients/query-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBlog.AI",
  description: "Blogs powered by AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "m-0 flex h-[100vh] flex-col")}>
        <QueryClientProvider client={queryClient}>
          <Nav />
          <main className="mx-10 my-4 flex flex-1 flex-col">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
