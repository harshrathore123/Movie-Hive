import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searching_bar/SearchBar";
import MovieDropdown from "../drop-down/moviedropdown/MovieDropdown";
import WebSeriesDropdown from "../drop-down/webseriesdropdown/WebSeriesDropdown";

const menuItems = [
  { name: "WebSeries", path: "/webseries", dropdown: "webseries" },
  { name: "Movies", path: "/movies", dropdown: "movies" },
  // { name: "Favorites", path: "/favorites",dropdown: "favorites" },
  // { name: "News", path: "/news" },
];

function Authentication_Navbar({ setIsAuthenticated }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  let timeoutId = null;

  const handleMouseEnter = (type) => {
    clearTimeout(timeoutId);
    setDropdownOpen(type);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(null);
    }, 100);
  };

  const handleMenuClick = () => {
    setDropdownOpen(null);
  };

  return (
    <div className="container p-2 rounded-full flex flex-wrap items-center justify-between w-full md:justify-center fixed top-0 left-0 bg-opacity-80 z-50 shadow-lg">
      <div className="container p-2 rounded-full flex space-x-4 w-full justify-center fixed mt-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative mt-10 dropdown-container"
            onMouseEnter={item.dropdown ? () => handleMouseEnter(item.dropdown) : undefined}
            onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
            onClick={handleMenuClick}
          >
            <Link to={item.path} onClick={handleMenuClick}>
              <button className="relative z-10 px-4 py-2 font-medium transition-all rounded-full txt">
                {item.name}
              </button>
            </Link>

            <div
              className={`absolute top-full left-0 w-48 bg-white rounded-md shadow-lg transform transition-all duration-300 ${dropdownOpen === item.dropdown
                ? "scale-100 opacity-100 ease-out"
                : "scale-95 opacity-0 ease-in pointer-events-none"
                }`}
            >
              {item.dropdown === "movies" && <MovieDropdown />}
              {item.dropdown === "webseries" && <WebSeriesDropdown />}
            </div>

          </div>
        ))}
        <SearchBar />
      </div>
    </div>
  );
}

export default Authentication_Navbar;

