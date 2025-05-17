import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFetchNowPlayingMovies from "../../hooks/moviesapi/useFetchNowPlayingMovies";
import useFetchPopularMovies from "../../hooks/moviesapi/useFetchPopularMovies";
import useFetchTopRatedMovies from "../../hooks/moviesapi/useFetchTopRatedMovies";
import useFetchUpcomingMovies from "../../hooks/moviesapi/useFetchUpcomingMovies";
import useSearch from "../../hooks/moviesapi/useSearch";
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader"; // Import your Loader component

function Movies() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const [fetchPopular, setFetchPopular] = useState(false);
  const [fetchNowPlaying, setFetchNowPlaying] = useState(false);
  const [fetchUpcoming, setFetchUpcoming] = useState(false);
  const [fetchTopRated, setFetchTopRated] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Default to Popular Movies if no state passed
    if (!location.state) {
      setFetchPopular(true);
      setFetchNowPlaying(false);
      setFetchUpcoming(false);
      setFetchTopRated(false);
    } else {
      setFetchPopular(location.state?.fetchPopular || false);
      setFetchNowPlaying(location.state?.fetchNowPlaying || false);
      setFetchUpcoming(location.state?.fetchUpcoming || false);
      setFetchTopRated(location.state?.fetchTopRated || false);
    }
  }, [location.state]);

  // Search Hook
  const { movies: searchResults, loading: searchLoading, error: searchError, totalPages: searchTotalPages } = useSearch(searchQuery, page);

  // Category API calls
  const { movies: popularMovies, loading: loadingPopular, error: errorPopular, totalPages: totalPopularPages } = useFetchPopularMovies(fetchPopular, page);
  const { movies: nowPlayingMovies, loading: loadingNowPlaying, error: errorNowPlaying, totalPages: totalNowPlayingPages } = useFetchNowPlayingMovies(fetchNowPlaying, page);
  const { movies: upcomingMovies, loading: loadingUpcoming, error: errorUpcoming, totalPages: totalUpcomingPages } = useFetchUpcomingMovies(fetchUpcoming, page);
  const { movies: topRatedMovies, loading: loadingTopRated, error: errorTopRated, totalPages: totalTopRatedPages } = useFetchTopRatedMovies(fetchTopRated, page);

  // Decide which movies to show
  let movies = [], loading, error, totalPages, title;

  if (searchQuery) {
    movies = searchResults || [];
    loading = searchLoading;
    error = searchError;
    totalPages = searchTotalPages;
    title = `Search Results for "${searchQuery}"`;
  } else if (fetchPopular) {
    movies = popularMovies || [];
    loading = loadingPopular;
    error = errorPopular;
    totalPages = totalPopularPages;
    title = "Popular Movies";
  } else if (fetchNowPlaying) {
    movies = nowPlayingMovies || [];
    loading = loadingNowPlaying;
    error = errorNowPlaying;
    totalPages = totalNowPlayingPages;
    title = "Now Playing Movies";
  } else if (fetchUpcoming) {
    movies = upcomingMovies || [];
    loading = loadingUpcoming;
    error = errorUpcoming;
    totalPages = totalUpcomingPages;
    title = "Upcoming Movies";
  } else if (fetchTopRated) {
    movies = topRatedMovies || [];
    loading = loadingTopRated;
    error = errorTopRated;
    totalPages = totalTopRatedPages;
    title = "Top Rated Movies";
  }

  // Show the loader while loading
  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <>
      <div className="p-6 container mx-auto min-h-screen mt-20">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
          {title}
        </h1>

        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="card p-4 rounded-lg shadow-lg bg-gray-900">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-60 md:h-80 object-cover rounded-md"
                />
                <h2 className="text-lg md:text-xl font-semibold text-white mt-4">
                  {movie.title}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm mt-2">{movie.release_date}</p>
                <p className="text-gray-300 text-xs md:text-sm mt-2">
                  {movie.overview.substring(0, 100)}
                </p>
                <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">No movies to display.</p>
        )}
      </div>

      {/* Pagination - only if not search and movies exist */}
      {!searchQuery && movies.length > 0 && (
        <div className="flex justify-center mt-6 pb-6">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </>
  );
}

export default Movies;
