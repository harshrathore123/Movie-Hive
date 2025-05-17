// Example: hooks/resetpassword/useResetPassword.js

import { useState } from 'react';
import axios from 'axios';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/reset-password',
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Using the token passed here
          },
        }
      );

      setSuccess(response.data.message || 'Password has been reset successfully.');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};

export default useResetPassword;
