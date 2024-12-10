import { NextResponse } from "next/server";

export async function PUT(request: Request) {
	const { userId, newName } = await request.json();

	// Simulate DB update (Replace with real DB logic)
	if (userId && newName) {
		// Update name in DB here (using userId)

		return NextResponse.json({ success: true, message: "Name updated successfully" }, { status: 200 });
	}

	return NextResponse.json({ success: false, message: "Invalid data" }, { status: 400 });
}
