import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const webSeriesDropdownItems = [
  {
    name: "Popular Web Series",
    img: "https://rukminim2.flixcart.com/image/850/1000/l0h1g280/poster/1/m/t/small-mirzapur-web-series-poster-multicolor-photopaper-print-12-original-imagc95bfufzrhw8.jpeg?q=90&crop=false",
    path: "/webseries",
    state: { fetchPopular: true },
  },
  {
    name: "On-The-Air Web Series",
    img: "https://dubeat.com/wp-content/uploads/2018/05/cover-1050x817-1.jpg",
    path: "/webseries",
    state: { fetchontheair: true },
  },
  {
    name: "Airing Today Web Series",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/2c7d21112473239.601502d49ff6e.jpg",
    path: "/webseries",
    state: { fetchairingtoday: true },
  },
  {
    name: "Top-Rated Web Series",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIo3TMBYAOomo_cy7Z44creBPgXzvcpWiQkg&s",
    path: "/webseries",
    state: { fetchTopRated: true },
  },
];

function WebSeriesDropdown({ handleMouseEnter, handleMouseLeave }) {
  const navigate = useNavigate();

  return (
    <motion.div
          className="absolute left-1/3 top-16 transform -translate-x-1/3 card p-4 rounded-lg shadow-lg flex gap-8 w-[1000px] justify-center transition-all duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {webSeriesDropdownItems.map((movie, idx) => (
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

export default WebSeriesDropdown;
