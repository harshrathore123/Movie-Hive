import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import useFetchPopularWebSeries from "../../hooks/webseriesapi/useFetchPopularWebseries";
import useFetchOntheairWebseries from "../../hooks/webseriesapi/useFetchontheairWebseries";
import useFetchAiringTodayWebseries from "../../hooks/webseriesapi/useFetchairingtodayWebseries";
import useFetchTopRatedWebseries from "../../hooks/webseriesapi/useFetchTopRatedWebseries";
import useSearch from "../../hooks/webseriesapi/useSearch";
import Loader from "../loader/Loader";

function WebSeries() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const [fetchPopular, setFetchPopular] = useState(false);
  const [fetchOntheair, setFetchOntheair] = useState(false);
  const [fetchAiringtoday, setFetchAiringtoday] = useState(false);
  const [fetchTopRated, setFetchTopRated] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    if(!location.state){
      setFetchPopular(true);
      setFetchOntheair(false);
      setFetchAiringtoday(false);
      setFetchTopRated(false);
    }
    else{
      setFetchPopular(location.state?.fetchPopular || false);
      setFetchOntheair(location.state?.fetchontheair || false);
      setFetchAiringtoday(location.state?.fetchairingtoday || false);
      setFetchTopRated(location.state?.fetchTopRated || false);
    }
  },[location.state])

  const{webseries: searchResults, loading: searchLoading, error: searchError, totalPages: searchTotalPages} = useSearch(searchQuery, page);

  // Fetch webseries based on selected category
  const { webseries: popularWebSeries, loading: loadingPopular, error: errorPopular, totalPages: totalPopularPages } = useFetchPopularWebSeries(fetchPopular, page);
  const { webseries: ontheairWebSeries, loading: loadingOntheair, error: errorOntheair, totalPages: totalOntheairPages } = useFetchOntheairWebseries(fetchOntheair, page);
  const { webseries: airingtodayWebSeries, loading: loadingAiringtoday, error: errorAiringtoday, totalPages: totalAiringTodayPages } = useFetchAiringTodayWebseries(fetchAiringtoday, page);
  const { webseries: topRatedWebSeries, loading: loadingTopRated, error: errorTopRated, totalPages: totalTopRatedPages } = useFetchTopRatedWebseries(fetchTopRated, page);

  // Variables to control UI
  let webseries = [], loading = false, error = null, totalPages = 1, title = "";

  if(searchQuery){
    webseries = searchResults || [];
    loading = searchLoading;
    error = searchError;
    totalPages = searchTotalPages;
    title = `Search Result ${searchQuery}`;
  }
  else if (fetchPopular) {
    webseries = popularWebSeries || [];
    loading = loadingPopular;
    error = errorPopular;
    totalPages = totalPopularPages;
    title = "Popular Webseries";
  } else if (fetchOntheair) {
    webseries = ontheairWebSeries || [];
    loading = loadingOntheair;
    error = errorOntheair;
    totalPages = totalOntheairPages;
    title = "On The Air Webseries";
  } else if (fetchAiringtoday) {
    webseries = airingtodayWebSeries || [];
    loading = loadingAiringtoday;
    error = errorAiringtoday;
    totalPages = totalAiringTodayPages;
    title = "Airing Today Webseries";
  } else if (fetchTopRated) {
    webseries = topRatedWebSeries || [];
    loading = loadingTopRated;
    error = errorTopRated;
    totalPages = totalTopRatedPages;
    title = "Top Rated Webseries";
  } else {
    // Default fallback: show Popular if no category is selected
    webseries = popularWebSeries || [];
    loading = loadingPopular;
    error = errorPopular;
    totalPages = totalPopularPages;
    title = "Popular Webseries";
  }

  // Loading state
  if (loading) {
    if (loading) {
      return <Loader />;
    }
  }

  // Error state
  if (error) {
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  // Empty state
  if (webseries.length === 0) {
    return <p className="text-white text-center mt-10">No Webseries Found.</p>;
  }

  // UI Rendering
  return (
    <>
      <div className="p-6 container mx-auto min-h-screen mt-20">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">{title}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {webseries.map((series) => (
            <div key={series.id} className="card p-4 rounded-lg shadow-lg bg-gray-900">
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
                className="w-full h-60 md:h-80 object-cover rounded-md"
              />
              <h2 className="text-lg md:text-xl font-semibold text-white mt-4">{series.name}</h2>
              <p className="text-gray-400 text-xs md:text-sm mt-2">{series.first_air_date}</p>
              <p className="text-gray-300 text-xs md:text-sm mt-2">{series.overview.substring(0, 100)}...</p>
              <p className="text-yellow-400 font-bold mt-2">⭐ {series.vote_average.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 pb-6">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}

export default WebSeries;
