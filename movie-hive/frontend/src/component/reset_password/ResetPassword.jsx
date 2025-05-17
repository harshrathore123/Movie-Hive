import React, { useState, useEffect } from 'react';
import useResetPassword from '../../hooks/resetpassword/useResetPassword';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, loading, error, success } = useResetPassword();

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        navigate('/login'); // Redirect to login after success
      }, 2000);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem('token'); // Get token from localStorage (after login)

    // Check if token exists in localStorage
    if (!storedToken) {
      toast.error('Token is missing or invalid.');
      return;
    }

    // Attempt to parse token (in case it's stored as a stringified JSON object)
    let parsedToken;
    try {
      parsedToken = JSON.parse(storedToken); // Parse the token if it's a stringified object
    } catch (err) {
      parsedToken = storedToken; // If it's not a stringified object, use it as it is
    }

    console.log('Stored token:', parsedToken);
    console.log('Stored token Type:', typeof(parsedToken));

    // If token is invalid, show error
    if (!parsedToken) {
      toast.error('Token is missing or invalid.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Pass token and new password to the resetPassword function
      await resetPassword(parsedToken, newPassword);
    } catch (err) {
      console.error('❌ Reset password failed:', err.response?.data || err.message);
    }
  };

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-screen container text-white">
        <div className="relative card shadow-lg rounded-lg max-w-md w-full p-6 bg-gray-900 text-center">
          <h2 className="text-2xl font-bold textbtn mb-4">Password Reset Successful</h2>
          <p className="mb-4">{success}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full button text-white font-bold py-2 rounded-md mt-4"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen container text-white">
      <div className="relative card shadow-lg rounded-lg max-w-md w-full p-6 bg-gray-900">
        <h2 className="text-2xl font-bold textbtn text-center mb-4">Reset Your Password</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full button text-white font-bold py-2 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2">Resetting...</span>
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
