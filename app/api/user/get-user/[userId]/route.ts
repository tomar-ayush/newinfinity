import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	const { userId } = params;

	try {
		await dbConnect(); // Establish DB connection
		console.log("The GET route was called");

		// Find the user by userId and exclude the 'password' field
		const user = await User.findOne({ _id: new ObjectId(userId) }).select('-password');

		// If the user is not found, return a 404 error
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Return the found user
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.error("Error fetching user:", error);

		return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
	}
}
