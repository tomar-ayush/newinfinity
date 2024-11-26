import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Check if required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create and save the user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Respond with success
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
