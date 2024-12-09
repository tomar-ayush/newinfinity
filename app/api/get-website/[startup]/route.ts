import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Website from "@/models/website";

export async function GET(
  request: Request,
  { params }: { params: { startup: string } }
) {
  try {
    await connectDB();
    const websiteData = await Website.findOne({ name: params.startup }).exec();
    return NextResponse.json(websiteData);
  } catch (error) {
    return NextResponse.error();
  }
}