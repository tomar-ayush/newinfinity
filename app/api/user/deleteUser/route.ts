import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function DELETE(req: Request) {
	try {
		// Parse the request body
		const body = await req.json();
		const { _id } = body;

		// Validate the input
		if (!_id) {
			return NextResponse.json(
				{ message: "User ID is required" },
				{ status: 400 }
			);
		}

		// Connect to the database
		await dbConnect();

		// Find and delete the user
		const deletedUser = await User.findByIdAndDelete(_id);

		// If no user is found, respond with a 404
		if (!deletedUser) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		// Respond with success
		return NextResponse.json(
			{ message: "User deleted successfully", user: deletedUser },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error deleting user:", error);

		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
