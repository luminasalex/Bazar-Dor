import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL("/api/auth/get-session", request.nextUrl.origin);
  const response = await fetch(url.toString(), {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = response.ok ? await response.json() : null;

  if (!session || Object.keys(session).length === 0) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/product-details/:path*",
    "/category/:path*",
  ],
};
