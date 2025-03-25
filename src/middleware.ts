import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "@/app/_lib/get-url";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(
    process.env.SESSION_COOKIE_NAME || "authenticationjs.session-token"
  );
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/sign-in" && token) {
    const redirectUrl = getUrl("/app");
    console.log(`Redirecionando para: ${redirectUrl}`);
    return NextResponse.redirect(new URL(getUrl("/app")));
  }

  if (pathname.includes("/app") && !token) {
    const redirectUrl = getUrl("/auth/sign-in");
    console.log(`Redirecionando para: ${redirectUrl}`);
    return NextResponse.redirect(new URL(getUrl("/auth/sign-in")));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
