import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Update input value if user navigates back
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const existingQuery = params.get("q") || "";
    setQuery(existingQuery);
  }, [location.search]);

  // Automatically navigate on query change
  useEffect(() => {
    const currentPath = location.pathname;

    if (query.trim() !== "") {
      // Dynamically redirect based on current page
      if (currentPath.startsWith("/movies")) {
        navigate(`/movies?q=${encodeURIComponent(query.trim())}`);
      } else if (currentPath.startsWith("/webseries")) {
        navigate(`/webseries?q=${encodeURIComponent(query.trim())}`);
      } else if (currentPath === "/") {
        navigate(`/?q=${encodeURIComponent(query.trim())}`); // <-- Add for Home page
      }
    } else {
      // Clear search
      if (currentPath.startsWith("/movies")) {
        navigate(`/movies`);
      } else if (currentPath.startsWith("/webseries")) {
        navigate(`/webseries`);
      } else if (currentPath === "/") {
        navigate(`/`); // <-- Reset Home page
      }
    }
  }, [query, navigate, location.pathname]);

  return (
    <div className="flex items-center border-2 container rounded-full p-2 px-4 w-full max-w-md mt-10">
      <Search className="textbtn" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Movies / Webseries"
        className="ml-2 w-full outline-none text-green-600"
      />
    </div>
  );
}
