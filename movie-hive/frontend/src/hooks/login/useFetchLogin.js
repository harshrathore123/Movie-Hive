import { useState } from "react";

const useFetchLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
       
            return { data, error: null };
        } catch (err) {
            setError(err.message);
            return { data: null, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useFetchLogin;
