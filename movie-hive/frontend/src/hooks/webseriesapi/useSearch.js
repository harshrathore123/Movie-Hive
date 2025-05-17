import { useEffect, useState } from "react";

const useSearch = (query, page) => {
  const [webseries, setWebSeries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`http://localhost:8000/api/series/search?q=${query}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setWebSeries(data.data.results || []);
        setTotalPages(data.data.total_pages || 1); // ✅ Capture total pages
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [query, page]);

  return { webseries, loading, error, totalPages}; // Set totalPages as per API, defaulting to 1
};

export default useSearch;
