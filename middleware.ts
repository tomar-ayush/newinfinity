import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("Decoded JWT:", payload);

    // You can optionally check payload claims here, e.g., roles, expiration, etc.
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/protected/:path*"], // Define protected routes
  // matcher: ["/services/:path*", "/protected/:path*"], // Define protected routes
};
