import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { verify } from "crypto";

export async function POST(req: NextRequest) {
	try {
		const { userId, newName } = await req.json();

		// Validate input
		if (!userId || !newName) {
			return NextResponse.json({ error: "User ID and new name are required" }, { status: 400 });
		}

		// Connect to the database
		await connectToDatabase();

		// Find the user by userId
		const user = await User.findById(userId);
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Update the user's name
		user.name = newName;
		await user.save();

		return NextResponse.json({ message: "Name updated successfully", verify: true }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "An error occurred during name change" }, { status: 500 });
	}
}
