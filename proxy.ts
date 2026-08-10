import { NextRequest, NextResponse } from "next/server";
import type { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "@/utils/jwt";
import { getNewAccessToken } from "@/service/refreshToken";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

const roleDashboard: Record<Role, string> = {
  CUSTOMER: "/dashboard",
  PROVIDER: "/provider-dashboard",
  ADMIN: "/admin-dashboard",
};

const protectedPrefixes: { prefix: string; role: Role }[] = [
  { prefix: "/dashboard", role: "CUSTOMER" },
  { prefix: "/provider-dashboard", role: "PROVIDER" },
  { prefix: "/admin-dashboard", role: "ADMIN" },
];

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/gear",
  "/cart",
  "/about",
  "/blog",
  "/contact",
  "/help",
  "/privacy",
  "/terms",
  "/forgot-password",
  "/payment/success",
  "/payment/cancel",
];

function matchesRoute(routes: string[], pathname: string) {
  return routes.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccess = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let refreshedAccessToken: string | null = null;

  // Access token missing/expired/invalid, but a refresh token exists — try to refresh
  if (!decodedAccess?.success && refreshToken) {
    const decodedRefresh = jwtUtils.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    );

    if (decodedRefresh.success) {
      const result = await getNewAccessToken(refreshToken);
      if (result.success) {
        refreshedAccessToken = result.data.accessToken;
        accessToken = refreshedAccessToken;
        decodedAccess = jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        );
      }
    }
  }

  const isAuthenticated = !!decodedAccess?.success;
  const userRole = decodedAccess?.success
    ? ((decodedAccess.data as JwtPayload).role as Role)
    : null;

  const isPublicRoute = matchesRoute(PUBLIC_ROUTES, pathname);
  const isAuthRoute = matchesRoute(AUTH_ROUTES, pathname);

  let finalResponse: NextResponse;

  // Logged-in user visiting /login or /register → their own dashboard
  if (isAuthRoute && isAuthenticated && userRole) {
    finalResponse = NextResponse.redirect(
      new URL(roleDashboard[userRole], request.url),
    );
  }
  // Authentication: any non-public, non-auth route requires a valid session.
  // No cookie at all, or a token that couldn't be verified/refreshed → login.
  else if (!isPublicRoute && !isAuthRoute && !isAuthenticated) {
    finalResponse = NextResponse.redirect(new URL("/login", request.url));
  } else {
    // Authorization: role-based access control on dashboard routes
    const matched = protectedPrefixes.find((r) =>
      pathname.startsWith(r.prefix),
    );
    if (matched && userRole && userRole !== matched.role) {
      finalResponse = NextResponse.redirect(
        new URL(roleDashboard[userRole], request.url),
      );
    } else {
      finalResponse = NextResponse.next();
    }
  }

  // Attach whatever cookie state changed to whichever response we're returning
  if (refreshedAccessToken) {
    finalResponse.cookies.set("accessToken", refreshedAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  } else if (!isAuthenticated && accessToken) {
    // Had a token but it's dead and couldn't be refreshed — clear stale cookies
    finalResponse.cookies.delete("accessToken");
    finalResponse.cookies.delete("refreshToken");
  }

  return finalResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
