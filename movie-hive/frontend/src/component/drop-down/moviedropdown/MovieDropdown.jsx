import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const movieDropdownItems = [
  {
    name: "Popular Movies",
    img: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/1792196789.png",
    path: "/movies",
    state: { fetchPopular: true },
  },
  {
    name: "Now-Playing Movies",
    img: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC/et00408691-wqmumfxjtk-portrait.jpg",
    path: "/movies",
    state: { fetchNowPlaying: true },
  },
  {
    name: "Upcoming Movies",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYXv-53bNknWyvp7SaKEIhJDZKcA6QuQ4ykQ&s",
    path: "/movies",
    state: { fetchUpcoming: true },
  },
  {
    name: "Top-Rated Movies",
    img: "https://townsquare.media/site/965/files/2021/08/attachment-Movie-Posters.jpg?w=780&q=75",
    path: "/movies",
    state: { fetchTopRated: true },
  },
];

function MovieDropdown({ handleMouseEnter, handleMouseLeave }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="absolute left-1/3 top-16 transform -translate-x-1/3 card p-4 rounded-lg shadow-lg flex gap-8 w-[1000px] justify-center transition-all duration-300 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {movieDropdownItems.map((movie, idx) => (
        <div
          key={idx}
          onClick={() => navigate(movie.path, { state: movie.state })}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={movie.img}
            alt={movie.name}
            className="rounded object-cover w-[150px] h-[225px]"
          />
          <h3 className="font-bold mt-2">{movie.name}</h3>
        </div>
      ))}
    </motion.div>
  );
}

export default MovieDropdown;
