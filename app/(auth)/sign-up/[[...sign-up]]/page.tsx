"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    password: z.string().min(5, "Password must be at least 5 characters").max(25),
    confirmPassword: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(25),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    }
  });

  async function sendOtp() {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Please enter an email address first");
      return;
    }

    try {
      const response = await fetch("../../../api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("OTP sent successfully!");
        setIsOtpSent(true);
        setEmailForOtp(email);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred while sending OTP");
    }
  }

  async function verifyOtp() {
    const otp = form.getValues("otp");
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await fetch("../../../api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailForOtp, otp }),
      });

      if (response.ok) {
        toast.success("OTP verified successfully!");
        setIsOtpVerified(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred while verifying OTP");
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isOtpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    const { firstName, lastName, email, password } = values;
    try {
      const response = await fetch("../../../api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Account created successfully!");
        console.log("API Response:", data);
        window.location.href = "../../../services/ai-mailer";
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to register.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred while registering. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-black">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-3">
          Sign Up
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Create your account and start your journey with us.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name Field */}
            <div className="flex gap-5 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl className="flex-grow">
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                      />
                    </FormControl>
                    <Button 
                      type="button"
                      onClick={sendOtp}
                      className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                    >
                      Send OTP
                    </Button>
                  </div>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Please enter your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* OTP Field */}
            {isOtpSent && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold text-gray-700">
                      OTP
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl className="flex-grow">
                        <Input
                          placeholder="Enter 6-digit OTP"
                          type="text"
                          maxLength={6}
                          {...field}
                          className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                        />
                      </FormControl>
                      <Button 
                        type="button"
                        onClick={verifyOtp}
                        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                      >
                        Verify OTP
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5" />
                        ) : (
                          <EyeSlashIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Ensure your password is strong and secure.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="w-5 h-5" />
                        ) : (
                          <EyeSlashIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 mt-1 pb-8">
                    Please confirm your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-between space-x-4">
              <Button
                type="submit"
                disabled={!isOtpVerified}
                className={`w-full text-white py-2 rounded-lg shadow-md transition duration-300 
                  ${!isOtpVerified 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300'
                  }`}
              >
                Create Account
              </Button>
              <Button
                type="button"
                onClick={() => (window.location.href = "/sign-in")}
                className="w-full bg-indigo-500 text-white py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition duration-300"
              >
                Log In
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
