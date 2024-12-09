"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Dashboard from "@/components/HOC/Dashboard";

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  profilePhoto: File | null;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isPhotoEnlarged, setIsPhotoEnlarged] = useState(false);

  // State to manage password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to manage verification
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "currentPassword") {
      setVerificationError(""); // Clear error on input change
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
  };

  const handleVerifyCurrentPassword = () => {
    // Mock verification logic
    if (formData.currentPassword === "correct-password") {
      // Replace with actual verification logic
      setIsVerified(true);
      setVerificationError("");
    } else {
      setVerificationError("Current password is incorrect.");
      setIsVerified(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) return; // Prevent submission if not verified

    setIsSubmitting(true);

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Updated Profile Data:", formData);
    setSuccessMessage("Profile updated successfully!");
    setIsSubmitting(false);
  };

  return (
    <Dashboard>
      <div className="flex flex-col items-center py-12 px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl font-semibold mb-8 text-white">Edit Profile</h2>

        {/* Edit Profile Card */}
        <div className="w-full max-w-lg bg-black p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-h-[600px] overflow-y-auto scrollbar-hidden border-4">
          {successMessage && (
            <div className="mb-4 text-green-400">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-6">
              {/* Profile Photo Section */}
              <div
                className={`relative w-24 h-24 rounded-full border-4 border-white bg-gray-600 overflow-hidden cursor-pointer transition-all duration-300 ${
                  isPhotoEnlarged ? "w-32 h-32" : ""
                }`}
                onClick={() => setIsPhotoEnlarged(!isPhotoEnlarged)}
              >
                {formData.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center text-white text-2xl">
                    <span className="font-bold">+</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="profilePhoto"
                  className="text-white text-sm cursor-pointer hover:underline"
                >
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("profilePhoto")?.click()
                    }
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    Change Photo
                  </button>
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name Section */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-white"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-in-out"
              />
            </div>

            {/* Email Section */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-white"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring=2 focus:ring-white transition duration=200 ease-in-out"
              />
            </div>

            {/* Phone Section */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-white"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
                className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring=2 focus:ring-white transition duration=200 ease-in-out"
              />
              <small className="text-gray-400">Format: 1234567890</small>
            </div>

            {/* Current Password Section */}
            <div className="mb-6">
              <label
                htmlFor="currentPassword"
                className="block text-lg font-medium text-white"
              >
                Current Password:
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                  minLength={8}
                  className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring=2 focus:ring-white transition duration=200 ease-in-out"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${
                    showCurrentPassword ? "text-blue-500" : "text-gray-500"
                  }`}
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Verification Button */}
              <button
                type="button"
                onClick={handleVerifyCurrentPassword}
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              >
                Verify Current Password
              </button>
              {verificationError && (
                <p className="text-red-500 mt-1">{verificationError}</p>
              )}
            </div>

            {/* New Password Section */}
            {isVerified && (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="newPassword"
                    className="block text-lg font-medium text-white"
                  >
                    New Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring=2 focus:ring-white transition duration=200 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${
                        showNewPassword ? "text-blue-500" : "text-gray-500"
                      }`}
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showNewPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Section */}
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-lg font-medium text-white"
                  >
                    Confirm New Password:
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="mt-2 w-full p-3 border border-white bg-gray-700 text-white rounded-lg focus:outline-none focus:ring=2 focus:ring-white transition duration=200 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${
                        showConfirmPassword ? "text-blue-500" : "text-gray-500"
                      }`}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isVerified}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                isSubmitting || !isVerified
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Page;
