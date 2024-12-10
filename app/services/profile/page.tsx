"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Dashboard from "@/components/HOC/Dashboard";
import { ImageIcon, Eye, EyeOff } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  profilePhoto: File | null;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
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

  // State to store the user ID
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch("/api/verify-token");
        const data = await res.json();
        if (data.userId) {
          setUserId(data.userId);
        } else {
          console.error("No user ID returned from /api/verify-token");
        }
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // Fetch user details when userId is available
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const res = await fetch(`/api/user/get-user/${userId}`);
          const data = await res.json();
          if (data) {
            setFormData((prevData) => ({
              ...prevData,
              name: data.name || "",
              email: data.email || "",
              profilePhoto: data.profilePhoto || null,
            }));
          } else {
            console.error("No user data returned from /api/user/get-user/[userid]");
          }
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name" && /\d/.test(value)) {
      alert("Name cannot contain numbers.");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "currentPassword") {
      setVerificationError("");
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
  };

  const handleVerifyCurrentPassword = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, currentPassword: formData.currentPassword }),
      });

      const data = await res.json();
      if (data.verify) {
        setIsVerified(true);
        setVerificationError("");
      } else {
        setVerificationError("Current password is incorrect.");
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      setVerificationError("Failed to verify password.");
      setIsVerified(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified) return; // Prevent submission if not verified

    setIsSubmitting(true);
    try {
      // Change Name
      if (formData.name !== "") {
        const resName = await fetch("http://localhost:3000/api/user/change-name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, newName: formData.name }),
        });
        const dataName = await resName.json();
        console.log("dataname is : ", dataName)
        {/* if (!dataName.verify) throw new Error("Failed to change name"); */ }
      }

      // Change Password
      if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
        const resPassword = await fetch("http://localhost:3000/api/user/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, currentPassword: formData.currentPassword, newPassword: formData.newPassword }),
        });
        const dataPassword = await resPassword.json();
        console.log(dataPassword);
        {/* if (!dataPassword.success) throw new Error("Failed to change password"); */ }
      }

      setSuccessMessage("Profile updated successfully!");

    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dashboard>
      <div className="flex flex-col items-center px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl font-semibold mb-8 text-white">Edit Profile</h2>

        {/* Edit Profile Card */}
        <div className="w-full max-w-lg bg-neutral-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-h-[600px] overflow-y-auto scrollbar-hidden border-4">
          {successMessage && <div className="mb-4 text-green-400">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-6">
              {/* Profile Photo Section */}
              <div
                className={`relative w-24 h-24 rounded-full border-4 dark:bg-neutral-900 overflow-hidden cursor-pointer transition-all duration-300 ${isPhotoEnlarged ? "w-32 h-32" : ""}`}
                onClick={() => setIsPhotoEnlarged(!isPhotoEnlarged)}
              >
                {formData.profilePhoto ? (
                  <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center text-white text-2xl pt-8">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="profilePhoto" className="text-white text-sm cursor-pointer hover:underline">
                  <button type="button" onClick={() => document.getElementById("profilePhoto")?.click()} className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                    Change Photo
                  </button>
                </label>
                <input type="file" id="profilePhoto" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </div>
            </div>

            {/* Name Section */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium text-white">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
                className="mt-2 w-full p-3 border bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                style={{
                  textTransform: "capitalize",
                  letterSpacing: "0.05em",
                  fontFamily: "'Roboto', sans-serif",
                }}
              />
              <small className="text-sm text-gray-400">Only letters and spaces are allowed.</small>
            </div>

            {/* Email Section */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-2 w-full p-3 border dark:bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration=200 ease-in-out"
              />
            </div>

            {/* Current Password Section */}
            <div className="mb-6">
              <label htmlFor="currentPassword" className="block text-lg font-medium text-white">
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
                  className="mt-2 w-full p-3 border dark:bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration=200 ease-in-out"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${showCurrentPassword ? "text-blue-500" : "text-gray-500"}`}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
              {verificationError && <p className="text-red-500 mt-1">{verificationError}</p>}
            </div>

            {/* New Password Section */}
            {isVerified && (
              <>
                <div className="mb-6">
                  <label htmlFor="newPassword" className="block text-lg font-medium text-white">
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
                      className="mt-2 w-full p-3 border dark:bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration=200 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${showNewPassword ? "text-blue-500" : "text-gray-500"}`}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Section */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-lg font-medium text-white">
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
                      className="mt-2 w-full p-3 border dark:bg-neutral-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration=200 ease-in-out"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-[10px] top-[50%] transform -translate-y-[50%] ${showConfirmPassword ? "text-blue-500" : "text-gray-500"}`}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-600 transition-colors duration-300"
                disabled={isSubmitting || !isVerified}
              >
                {isSubmitting ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export default Page;
