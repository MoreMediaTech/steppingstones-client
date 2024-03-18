import { NextResponse } from "next/dist/server/web/spec-extension/response";
import type { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NEXT_URL } from "./config";
import { getSession } from "@lib/getSession";

export function middleware(request: NextRequest) {
  const cookies = getSession();
  if (
    !cookies &&
    request.nextUrl.pathname.startsWith("${NEXT_URL}/admin-portal")
  ) {
    return NextResponse.redirect(`${NEXT_URL}/auth/login`);
  }
  // if (
  //   cookies &&
  //   request.nextUrl.pathname.startsWith("${NEXT_URL}/auth/login")
  // ) {
  //   return NextResponse.redirect(`${NEXT_URL}/admin-portal`);
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin-portal/:path*",
};
