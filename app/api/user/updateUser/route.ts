import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
	try {
		// Parse the request body
		const body = await req.json();

		const { _id, name, email, role, status, password } = body;

		// Validate input
		if (!_id || !name || !email || !role || !status) {
			return NextResponse.json(
				{ message: "Invalid input data" },
				{ status: 400 }
			);
		}

		// Connect to the database
		await dbConnect();

		// Update the user
		const updatedUser = await User.findByIdAndUpdate(
			_id,
			{ name, email, role, status, ...(password && { password }) },
			{ new: true, runValidators: true }
		);

		// Handle case where the user is not found
		if (!updatedUser) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		// Return the updated user
		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error("Error updating user:", error);

		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
