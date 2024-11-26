import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { otpStorage } from "@/lib/otpStorage"; // Adjust import path as needed

export async function POST(req) {
  const { email } = await req.json();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with an expiry time
  otpStorage.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!, 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });
  
  return NextResponse.json({ message: "OTP sent successfully" });
}
