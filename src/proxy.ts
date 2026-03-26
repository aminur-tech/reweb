import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

type Role = "admin" | "client" | "collaborator";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 🔓 Public routes
  const publicRoutes = ["/", "/login", "/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ⛔ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role as Role;

  // 🔐 Role-based protection
  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/client") && role !== "client") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/team") && role !== "collaborator") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};