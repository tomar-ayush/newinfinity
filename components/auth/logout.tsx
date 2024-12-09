"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          // Redirect to login page after logout
          router.push('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
