import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { firstName, lastName, email, password } = await req.json();

    // Check if required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create and save the user
    const user = new User({ name: firstName + " " + lastName, email, password: hashedPassword, role: "user" });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set the token in a cookie
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`
    );

    // Respond with success and set cookie in headers
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
