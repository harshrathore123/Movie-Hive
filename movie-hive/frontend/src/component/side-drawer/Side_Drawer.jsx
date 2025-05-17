import { useState } from "react";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import ChatBox from "../chatbox/Chatbox";


const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex">
      {/* Menu Button - Positioned on the right */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 button text-white rounded-md fixed top-4 right-4 z-50"
      >
        <Menu size={24} />
      </button>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Right Side Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className="fixed top-0 right-0 h-full w-1/3 container shadow-lg p-5 z-50"
      >
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        {/* {Calling Chatbox Component} */}
        <ChatBox />
        {/* <Chatbot/> */}
      </motion.div>
    </div>
  );
};

export default SideDrawer;
