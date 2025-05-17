import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchSignUp from "../../hooks/signup/useFetchSignUp";

const images = {
    img1: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    img2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjoP95gLHgXRmQ6mBBS6I8zAewiFCmXYfZpA&s",
    img3: "https://m.media-amazon.com/images/I/81cwbLBVDbL.jpg",
    img4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9gHxWXNMUr3lMJr4W8rWpVh6vwyjriJ6bQ&s",
    img5: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202412/first-poster-of-salman-khans-sikandar-261457960-1x1_0.jpg?VersionId=d8hf2R3hNaHixfzbwZJJ7Pzt4Eh8UI7i",
    img6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0wrCLheY5A7rmXnLFljLq_4COSCaxua3G0w&s",
};

const Signup = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { signup, loading, error } = useFetchSignUp();
    
    const submitSignUp = async (e) => {
        e.preventDefault();
    
        if (!email || !firstname || !lastname || !password) {
            toast.error("All fields are required!", { position: "top-right", autoClose: 3000 });
            return;
        }
    
        const userData = { email, firstName: firstname, lastName: lastname, password };
    
        const response = await signup(userData);
    
        if (response && response?.data && response?.data?.token) {
            const { email, firstName, lastName, token } = response.data;
            console.log("Login Successful:", response);
            const user = {
                email: email,
                FirstName: firstName,
                LastName: lastName
            };
        
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(true);
            toast.success("Signup successful!", { autoClose: 2000 });
            navigate("/movies");
        } else {
            toast.error(error || "Signup failed. Please try again.");
        }
    };
    
    return (
        <>
            <ToastContainer />
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center min-h-screen gap-6">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
                    <h1 className="text-3xl font-bold mb-4 textcolor">Movies Hive</h1>
                    <h2 className="text-xl primaryText font-semibold mb-4">Let’s get started</h2>
                    <form className="w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text mb-1">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@gmail.com" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text mb-1">First Name</label>
                                <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"/>
                            </div>
                            <div>
                                <label className="block text mb-1">Last Name</label>
                                <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"/>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text mb-1">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-500"/>
                        </div>
                        <button className="w-full button py-2 rounded text-white font-semibold transition" onClick={submitSignUp} disabled={loading}>
                            {loading ? "Signing Up..." : "Continue with Email"}
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center bg-cover bg-center p-6"
                    style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/014/000/181/small/red-stage-curtain-illuminated-by-spotlights-illustration-vector.jpg')" }}>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.values(images).map((src, index) => (
                            <motion.img key={index} src={src} alt="movie poster" className="w-24 md:w-32 lg:w-36 border-[1px] border-yellow-500"/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;