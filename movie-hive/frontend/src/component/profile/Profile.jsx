import React from "react";
import { motion } from "framer-motion";
import useFetchMe from "../../hooks/profile/useFetchMe";
import Loader from "../loader/Loader";

function Profile() {
  const { data, loading, error } = useFetchMe();

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br container p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative backdrop-blur-lg bg-white/10 border border-gray-700 shadow-2xl rounded-2xl p-8 max-w-lg w-full text-white"
      >
        {/* Glowing Animated Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-gray-700 opacity-30 blur-md"></div>

        {/* Title with Animation */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-extrabold text-center textbtn tracking-widest"
        >
          USER PROFILE
        </motion.h1>

        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6 mt-6"
          >
            {/* User Avatar with Glowing Effect */}
            <div className="flex justify-center">
              <motion.img
                src={data.profilePicture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"}
                alt={`${data.firstName} ${data.lastName}`}
                className="w-24 h-24 rounded-full shadow-md border-4 border-red-500 hover:border-purple-600 transition-all"
                whileHover={{ scale: 1.1 }}
              />
            </div>

            {/* User Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold">{data.firstName} {data.lastName}</h2>
              <p className="text-gray-400 text-sm">{data.email}</p>
            </motion.div>

            {/* Metadata Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="rounded-lg p-4 card text-center border border-gray-700 shadow-sm"
            >
              <p className="text-sm text-gray-400">
                <strong>Joined:</strong> {new Date(data.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Last Updated:</strong> {new Date(data.updatedAt).toLocaleString()}
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <p className="text-gray-400 text-center mt-10">No profile data available.</p>
        )}
      </motion.div>
    </div>
  );
}

export default Profile;
