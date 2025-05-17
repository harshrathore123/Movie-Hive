import { useState, useEffect } from "react";

const useFetchAiringTodayWebseries = (fetchData, page) => {
  const [webseries, setWebseries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!fetchData) return;

    setLoading(true);
    fetch(`http://localhost:8000/api/series/airing-today?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setWebseries(data.data.results);
        setTotalPages(data.data.total_pages || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [fetchData, page]); // Fetch new data when page changes

  return { webseries, loading, error, totalPages };
};

export default useFetchAiringTodayWebseries;
