import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token"); // Token stored in cookies

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if no token
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next(); // Proceed to route
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if invalid
  }
}

export const config = {
  matcher: ["/protected/:path*", "/dashboard/:path*"], // Define protected routes
};
