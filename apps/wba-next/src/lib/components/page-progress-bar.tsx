"use client";

import nprogress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import "nprogress/nprogress.css";

nprogress.configure({
  showSpinner: false,
});

export const PageProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  }, [pathname, searchParams]);
  return null;
};
