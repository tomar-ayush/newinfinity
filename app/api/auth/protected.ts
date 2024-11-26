import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function handler(req: Request ) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, {
            status: 401
        });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ message: "Access granted", user: decoded}, {status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired token" }, {
        status:401
        });
  }
}
