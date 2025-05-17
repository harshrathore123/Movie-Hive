import { useState } from "react";
import axios from "axios";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const changePassword = async ({ email, oldPassword, newPassword }) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/change-password", {
        email,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        return response.data;
      } else {
        setError(response.data.message || "Password change failed");
        return null;
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};
