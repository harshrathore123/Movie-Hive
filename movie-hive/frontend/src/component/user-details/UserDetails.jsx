import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDetails({ isAuthenticated, setIsAuthenticated }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);

    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-3 left-0 p-4 z-[9999]" ref={menuRef}>
      {/* User Icon */}
      <button
        className="relative focus:outline-none textcolor"
        onClick={toggleMenu}
      >
        <i className="fas fa-user-circle text-3xl text-primaryText"></i>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute mt-2 w-48 bg-container shadow-md rounded-md">
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            <div className="px-4 py-2 hover:bg-card cursor-pointer txt">
              Profile
            </div>
          </Link>
          <Link to="/change-password" onClick={() => setMenuOpen(false)}>
            <div className="px-4 py-2 hover:bg-card cursor-pointer txt">
              Change Password
            </div>
          </Link>
          <Link to="/reset-password" onClick={() => setMenuOpen(false)}>
            <div className="px-4 py-2 hover:bg-card cursor-pointer txt">
              Reset Password
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="px-4 py-2 hover:bg-card cursor-pointer txt"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
