import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, ROOT_ROUTE } from "./constants";

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
}
export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  if (!session) {
    const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
