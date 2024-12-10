import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
	try {
		const { userId, currentPassword } = await req.json();

		// Validate the input
		if (!userId || !currentPassword) {
			return NextResponse.json({ error: "User ID and password are required" }, { status: 400 });
		}

		// Connect to the database
		await connectToDatabase();

		// Find user by userId
		const user = await User.findById(userId);
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Verify password
		const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
		if (!isPasswordCorrect) {
			return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
		}

		return NextResponse.json({ message: "Password verified successfully", verify: true }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An error occurred during password verification" }, { status: 500 });
	}
}
