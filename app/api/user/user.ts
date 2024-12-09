import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongodb'; // Assumes you have a database connection utility
import User from '@/models/User'; // Import your User model
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await connectToDatabase(); // Ensure database connection

	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				// Handle different GET scenarios
				const { filter, search } = req.query;

				// Build query based on filter and search
				const query: any = {};

				if (filter && ['Active', 'Suspended'].includes(filter as string)) {
					query.status = filter;
				}

				if (search) {
					query.$or = [
						{ name: { $regex: search as string, $options: 'i' } },
						{ email: { $regex: search as string, $options: 'i' } }
					];
				}

				// Fetch users with projection to exclude sensitive data
				const users = await User.find(query, { password: 0 }).lean();

				res.status(200).json(users);
			} catch (error) {
				res.status(500).json({ message: 'Error fetching users', error: error instanceof Error ? error.message : error });
			}
			break;

		case 'POST':
			try {
				const { name, email, password, role } = req.body;

				// Check if user already exists
				const existingUser = await User.findOne({ email });
				if (existingUser) {
					return res.status(400).json({ message: 'User already exists' });
				}

				// Hash password
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				// Create new user
				const newUser = new User({
					name,
					email,
					password: hashedPassword,
					role: role || 'User',
					status: 'Active'
				});

				await newUser.save();

				// Remove password from response
				const userResponse = newUser.toObject();
				delete userResponse.password;

				res.status(201).json(userResponse);
			} catch (error) {
				res.status(500).json({ message: 'Error creating user', error: error instanceof Error ? error.message : error });
			}
			break;

		case 'PUT':
			try {
				const { id, status, role } = req.body;

				if (!id) {
					return res.status(400).json({ message: 'User ID is required' });
				}

				const updateData: any = {};
				if (status) updateData.status = status;
				if (role) updateData.role = role;

				const updatedUser = await User.findByIdAndUpdate(
					id,
					updateData,
					{ new: true, projection: { password: 0 } }
				);

				if (!updatedUser) {
					return res.status(404).json({ message: 'User not found' });
				}

				res.status(200).json(updatedUser);
			} catch (error) {
				res.status(500).json({ message: 'Error updating user', error: error instanceof Error ? error.message : error });
			}
			break;

		case 'DELETE':
			try {
				const { id } = req.query;

				if (!id) {
					return res.status(400).json({ message: 'User ID is required' });
				}

				const deletedUser = await User.findByIdAndDelete(id);

				if (!deletedUser) {
					return res.status(404).json({ message: 'User not found' });
				}

				res.status(200).json({ message: 'User successfully deleted' });
			} catch (error) {
				res.status(500).json({ message: 'Error deleting user', error: error instanceof Error ? error.message : error });
			}
			break;

		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
