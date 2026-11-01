import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// The /extension page must be public — IDE users land here before they log in
// const isPublicRoute = createRouteMatcher(["/extension(.*)", "/(web)(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/extension(.*)",
  "/auth(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/(web)(.*)",
  "/pricing(.*)",
  "/auth/callback(.*)",
  "/projects(.*)",
  "/api/public/(.*)",
  "/api/payments/(.*)",
  "/api/teamspace/download(.*)",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
  // "/api/chatbot(.*)",  // temperory
  "/invite(.*)",
  "/",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    frontendApiProxy: {
      enabled: true,
    },
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
