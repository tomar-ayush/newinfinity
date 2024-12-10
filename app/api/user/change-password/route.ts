import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
	try {
		const { userId, currentPassword, newPassword } = await req.json();

		// Validate input
		if (!userId || !currentPassword || !newPassword) {
			return NextResponse.json({ error: "User ID, current password, and new password are required" }, { status: 400 });
		}

		// Connect to the database
		await connectToDatabase();

		// Find the user by userId
		const user = await User.findById(userId);
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Verify current password
		const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
		if (!isPasswordCorrect) {
			return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 12);

		// Update the password in the database
		user.password = hashedPassword;
		await user.save();

		return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An error occurred during password update" }, { status: 500 });
	}
}
