import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const PrivateRoute = ["/trips", "/reservations", "/properties", "/favorites"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPrivateRoute = PrivateRoute.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Allow non-private routes to proceed
  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  // Handle private routes
  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Allow logged-in users to access private routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
