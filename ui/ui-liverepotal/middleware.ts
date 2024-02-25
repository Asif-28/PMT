import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/liveprojects",
  "/closeprojects",
  "/pauseprojects",
  "/data-summary",
];

export default function middleware(req: any) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("X-API-KEY");

  if (!cookie && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (
    (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login") &&
    cookie
  ) {
    const absoluteURL = new URL("/liveprojects", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
