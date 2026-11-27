import { NextResponse, type NextRequest } from "next/server";

import { isPublicAppPath } from "~/server/app/domain/guard";

/**
 * Presencia de la cookie de Better Auth. La autorización de verdad
 * la hace el servidor al leer la sesión; aquí solo evitamos pintar
 * el panel si ni siquiera hay cookie.
 */
function hasSessionCookie(request: NextRequest): boolean {
  const names = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth-session_token",
    "__Secure-better-auth-session_token",
  ];
  return names.some((name) => request.cookies.has(name));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (!isPublicAppPath(pathname) && !hasSessionCookie(request)) {
    const login = request.nextUrl.clone();
    login.pathname = "/app/login";
    login.search = "";
    login.searchParams.set("next", pathname);
    const redirect = NextResponse.redirect(login);
    redirect.headers.set("X-Robots-Tag", "noindex, nofollow");
    redirect.headers.set("Cache-Control", "no-store");
    return redirect;
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/app", "/app/:path*"],
};
