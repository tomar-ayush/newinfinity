import { NextResponse } from "next/server";
import { otpStorage } from "@/lib/otpStorage"; // Adjust import path as needed

export async function POST(req) {
  const { email, otp } = await req.json();
  const storedOtp = otpStorage.get(email);
  
  if (!storedOtp || storedOtp.expires < Date.now()) {
    return NextResponse.json({ error: "OTP expired or invalid" }, { status: 400 });
  }
  
  if (storedOtp.otp !== otp) {
    return NextResponse.json({ error: "Incorrect OTP" }, { status: 400 });
  }
  
  // Clear OTP after successful verification
  otpStorage.delete(email);
  
  return NextResponse.json({ message: "OTP verified successfully" });
}
