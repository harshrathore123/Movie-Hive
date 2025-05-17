import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import useFetchLogin from "../../hooks/login/useFetchLogin";
import { toast } from "react-toastify";

const Login = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState("");
    const { login, loading } = useFetchLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const userData = { email, password };
        const { data, error } = await login(userData);

        // if (error) {
        //     setError(error);
        // } else {

        // }

        if (data?.success && data?.data) {
            const { email, firstName, lastName, token } = data.data;
            console.log("Login Successful:", data);
            const user = {
                email: email,
                FirstName: firstName,
                LastName: lastName
            };
        
            console.log(localStorage.setItem("token", token));

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
        
            navigate("/movies");
        } else {
            setError(error);
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;
    
        try {
            // Send the Google token to the backend API
            const response = await fetch("http://localhost:8000/api/auth/google-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
    
            const responseJson = await response.json();
            console.log("Response JSON:", responseJson);
    
            if (response.ok && responseJson.success && responseJson.data) {
                const { email, firstName, lastName, token } = responseJson.data;
            
                const user = {
                    email: email,
                    FirstName: firstName,
                    LastName: lastName,
                 
                };
            
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isAuthenticated", "true");
                setIsAuthenticated(true);
                toast.success("Login successful!", { autoClose: 2000 });
                navigate("/movies");
            } else {
                const error = responseJson.error || "Google login failed.";
                setError(error);
            }
        } catch (err) {
            console.error("Error during Google login:", err);
            setError("Something went wrong. Please try again.");
        }
    };   


    const handleGoogleLoginError = () => {
        setError("Google Login failed. Please try again.");
    };

    return (
        <div className="container container_margin flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row card">

                {/* Left Section */}
                <div className="hidden md:flex flex-col justify-center items-center p-8 md:w-1/2 rounded-bl-[100px] rounded-tr-[150px] 
                    bg-cover bg-center"
                    style={{ backgroundImage: "url('https://wallpapers.com/images/high/movie-poster-background-q1zm830g0hfww2lk.webp')" }}></div>

                {/* Right Section */}
                <div className="p-8 flex flex-col justify-center w-full md:w-1/2">
                    <h2 className="text-2xl font-bold text-center">Welcome</h2>
                    <p className="text text-center">Log in to your account to continue</p>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <form className="mt-6" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@gmail.com"
                                value={email ?? ""}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password ?? ""}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <a href="#" className="goldtext hover:underline text-sm">Forgot your password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full button text-white py-2 rounded-md mt-6 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "LOGIN"}
                        </button>
                        <p className="text-center text mt-4">
                            Don't have an account? <a href="/signup" className="goldtext hover:underline">Sign up</a>
                        </p>
                    </form>

                    <div className="mt-6 flex flex-col items-center">
                        <GoogleLogin
                            
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
