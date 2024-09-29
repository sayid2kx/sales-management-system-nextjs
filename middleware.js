// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/",
    "/seller/login",
    "/seller/register",
    "/customer/login",
    "/customer/register",
  ];

  if (token) {
    const userRole = token.role;

    if (publicRoutes.includes(pathname)) {
      if (userRole === "seller") {
        return NextResponse.redirect(new URL("/seller/dashboard", req.url));
      } else if (userRole === "customer") {
        return NextResponse.redirect(new URL("/customer/dashboard", req.url));
      }
    }

    if (pathname.startsWith("/seller")) {
      if (userRole !== "seller") {
        return NextResponse.redirect(new URL("/customer/dashboard", req.url));
      }
    } else if (pathname.startsWith("/customer")) {
      if (userRole !== "customer") {
        return NextResponse.redirect(new URL("/seller/dashboard", req.url));
      }
    }

    return NextResponse.next();
  }

  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/seller")) {
      return NextResponse.redirect(new URL("/seller/login", req.url));
    } else if (pathname.startsWith("/customer")) {
      return NextResponse.redirect(new URL("/customer/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
