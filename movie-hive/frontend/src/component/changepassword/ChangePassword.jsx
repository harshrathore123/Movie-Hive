import React, { useState, useEffect } from "react";
import { useChangePassword } from "../../hooks/changepassword/useChangePassword";
import { toast } from "react-toastify";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { changePassword, loading, error } = useChangePassword();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await changePassword({ email, oldPassword, newPassword });

    if (response && response.success) {
      toast.success("Password changed successfully!");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen container text-white">
      <div className="relative card shadow-lg rounded-lg max-w-md w-full p-6 bg-gray-900">
        <h2 className="text-2xl font-bold textbtn text-center mb-4">
          Change Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <div>
            <label className="block text-gray-300 mb-1">Email ID</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Old Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full button text-white font-bold py-2 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
