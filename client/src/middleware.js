// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a matcher to match the protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard', '/budgets', '/expenses(.*)'  // Ensure these routes exist
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware triggered for:", req.url);  // Debugging log

  // Check if the requested route is a protected route
  if (isProtectedRoute(req)) {
    console.log("Protecting route:", req.url);  // Debugging log
    try {
      await auth.protect();  // Ensure user is authenticated
      console.log("User authenticated or redirected.");
    } catch (err) {
      console.error("Authentication failed:", err);  // Debugging log
      throw new Error("User not authenticated");
    }
  } else {
    console.log("Public route, no protection needed.");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
