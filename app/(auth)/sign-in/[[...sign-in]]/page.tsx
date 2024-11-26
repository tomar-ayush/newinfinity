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

const formSchema = z.object({
  name_1508167612: z.string().email("Please enter a valid email"),
  name_9055738434: z.string().min(6, "Password must be at least 6 characters"),
});

export default function MyForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; HttpOnly;`;
      toast.success("Login successful!");

      // Redirect to a protected route
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        "Failed to login. Please check your credentials and try again."
      );
    }
  }

  // Handle Sign Up logic (you can adjust it as needed)
  async function onSignUp(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error during sign-up");
      }

      const data = await response.json();
      document.cookie = `token=${data.token}; path=/; HttpOnly;`;
      toast.success("Sign-up successful!");

      // Redirect to a protected route
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error("Failed to sign up. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br bg-black">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-xs text-center mb-8">
          Login or Sign Up to continue.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="name_1508167612"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition duration-300"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 mt-1">
                    Please enter your registered email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="name_9055738434"
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
                        className="text-black w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5" />
                        ) : (
                          <EyeSlashIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 mt-1 pb-10">
                    Ensure your password is strong and secure.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Buttons */}
            <div className="flex justify-between space-x-4">
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition duration-300"
              >
                Login
              </Button>
              <Button
                type="button" // change type to 'button' to prevent form submission on sign up button
                // onClick={form.handleSubmit(onSignUp)}
                onClick={() => (window.location.href = "/sign-up")}
                className="w-full bg-indigo-500 text-white py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition duration-300"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
