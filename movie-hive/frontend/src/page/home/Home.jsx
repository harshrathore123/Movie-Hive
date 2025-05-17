import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../component/card/Card";
import Pagination from "../../component/pagination/Pagination";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(48960);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const fetchMovies = (pageNumber) => {
    fetch(`http://localhost:8000/api/movies/popular?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.data.results);
        setTotalPages(48960); // Keep as static or dynamic based on your backend
      })
      .catch((error) => console.error("Error fetching popular movies:", error));
  };

  const fetchSearchResults = (pageNumber) => {
    fetch(`http://localhost:8000/api/movies/search?q=${query}&page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.data.results);
        setTotalPages(data.data.total_pages || 1); // Adjust if backend supports total pages
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSearchResults(page);
    } else {
      fetchMovies(page);
    }
  }, [query, page]);

  // Reset page to 1 when new search happens
  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="p-9">
      <Card title={query ? `Search Results for "${query}"` : "Popular Movies"} movies={movies} />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Home;
