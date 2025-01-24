import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/sign-in",
//     signOut: "/sign-out",
//     error: "/error",
//     verifyRequest: "/verify-request",
//     newUser: "/sign-up",
//   },
// });

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /icons (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     * 6. / (home page)
     * 7. /sign-in
     * 8. /sign-up
     * 9. /privacy-policy
     * 10. /terms-of-service
     */
    "/((?!api|_next|fonts|icons|[\\w-]+\\.\\w+|$|sign-in|sign-up|privacy-policy|terms-of-service).*)",
  ],
};

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    // Provjera admin rute
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        // return Response.redirect(new URL("/", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
