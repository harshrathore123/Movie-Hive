import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SideDrawer from "../side-drawer/Side_Drawer";
import SearchBar from "../searching_bar/SearchBar";
// import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Signup", path: "/signup" },
  { name: "Login", path: "/login" },
]
function Navbar() {
  const [active, setActive] = useState("home");

  return (
    <nav className="relative flex justify-center items-center w-full">
      <div className="container p-2 rounded-full flex space-x-4 w-full justify-center fixed mt-10">
        {menuItems.map((item, index) => (
          <div key={index} className="relative mt-10">
            <Link to={item.path} onClick={() => setActive(item.name)}>
              <button
                className={`relative z-10 px-4 py-2 font-medium transition-all rounded-full 
                  ${active === item.name ? "specialbutton" : "txt"}`}
              >
                {item.name}
              </button>
            </Link>

            {active === item.name && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gray-800 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>
        ))}

        <SearchBar />


      </div>
    </nav>
  );
}

export default Navbar;
