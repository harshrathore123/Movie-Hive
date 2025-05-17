import { useState } from "react";

const useFetchSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            return data; // Return success response
        } catch (err) {
            setError(err.message);
            return null; // Return null on failure
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};

export default useFetchSignUp;
