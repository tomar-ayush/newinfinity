/*
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
  // matcher: ["/protected/:path*"], // Define protected routes
  matcher: ["/services/:path*", "/protected/:path*", "/admin/:path*"], // Define protected routes
};
*/



import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Secret for JWT verification
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  // Extract token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect if no token
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("Decoded JWT:", payload);

    // Extract role from payload
    const userRole = payload.role;

    // Check the route being accessed
    const pathname = req.nextUrl.pathname;

    // Protect Admin routes
    if (pathname.startsWith("/admin")) {
      if (userRole !== "admin") {
        console.log("Unauthorized: Not an admin");
        return NextResponse.redirect(new URL("/403", req.url)); // Redirect non-admin users
      }
    }

    // Protect User routes (both User and Admin can access)
    if (pathname.startsWith("/services")) {
      if (!["user", "admin"].includes(userRole)) {
        console.log("Unauthorized: Not a valid user");
        return NextResponse.redirect(new URL("/403", req.url)); // Redirect non-users
      }
    }

    // Proceed if the user has the correct access
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect on error
  }
}

// Apply the middleware to specific routes
export const config = {
  matcher: [
    "/admin/:path*", // Protect all `/admin` routes
    "/user/:path*",  // Protect all `/user` routes
  ],
};
