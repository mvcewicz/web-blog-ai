import { authMiddleware } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/api/(.*)"],
  afterAuth(params) {},
});

export const config = {
  matcher: ["/api/:path*"],
};
