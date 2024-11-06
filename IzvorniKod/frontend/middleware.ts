import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/sign-up",
  },
});

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
     * 7. /workouts (workouts page)
     * 8. /workout-plans (workout plans page)
     * 9. /exercises (exercises page)
     * 10. /profile (profile page)
     * 11. /settings (settings page)
     */
    "/((?!api|_next|fonts|icons|[\\w-]+\\.\\w+|workouts|workout-plans|exercises|profile|settings).*)",
  ],
};
