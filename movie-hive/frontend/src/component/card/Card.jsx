// import { useEffect, useState } from "react";

// const Card = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/movies/popular")
//       .then(response => response.json())
//       .then(data => setMovies(data.data.results))
//       .catch(error => console.error("Error fetching movies:", error));
//   }, []);

//   const [topRatedMovies, settopRatedMovies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/movies/top-rated")
//       .then(response => response.json())
//       .then(data => settopRatedMovies(data.data.results))
//       .catch(error => console.error("Error fetching movies:", error));
//   }, []);

//   const [nowPlayingMovies,setNowPlayingMovies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/movies/now-playing")
//       .then(response => response.json())
//       .then(data => setNowPlayingMovies(data.data.results))
//       .catch(error => console.error("Error fetching movies:", error));
//   }, []);

//   const [upcomingMovies,setUpcomingMovies] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/movies/upcoming")
//       .then(response => response.json())
//       .then(data => setUpcomingMovies(data.data.results))
//       .catch(error => console.error("Error fetching movies:", error));
//   }, []);


//   return (
//     <div className="p-6 bg-gray-900 min-h-screen">

//       {/* This is for popular movies card */}
//       <h1 className="text-3xl font-bold text-white mb-6 text-center mt-14 ">Popular Movies</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {movies.map(movie => (
//           <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="w-full h-80 object-cover rounded-md"
//             />
//             <h2 className="text-xl font-semibold text-white mt-4">{movie.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{movie.release_date}</p>
//             <p className="text-gray-300 text-sm mt-2">{movie.overview.substring(0, 100)}...</p>
//             <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average}</p>
//           </div>
//         ))}
//       </div>
//       <br />
//       <hr /><hr />

//       {/* This is for top rated movies card */}
//       <h1 className="text-3xl font-bold text-white mb-6 text-center mt-10">Top-Rated Movies</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {topRatedMovies.map(movie => (
//           <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="w-full h-80 object-cover rounded-md"
//             />
//             <h2 className="text-xl font-semibold text-white mt-4">{movie.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{movie.release_date}</p>
//             <p className="text-gray-300 text-sm mt-2">{movie.overview.substring(0, 100)}...</p>
//             <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average}</p>
//           </div>
//         ))}
//       </div>
//       <hr /><hr />
//       <br />

//       {/* This is for now playing movies Card */}
//       <h1 className="text-3xl font-bold text-white mb-6 text-center mt-10">Now Playing</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {nowPlayingMovies.map(movie => (
//           <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="w-full h-80 object-cover rounded-md"
//             />
//             <h2 className="text-xl font-semibold text-white mt-4">{movie.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{movie.release_date}</p>
//             <p className="text-gray-300 text-sm mt-2">{movie.overview.substring(0, 100)}...</p>
//             <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average}</p>
//           </div>
//         ))}
//       </div>
//       <hr /><hr />
//       <br />


//       {/* This is for Upcoming movies Card */}
//       <h1 className="text-3xl font-bold text-white mb-6 text-center mt-10">Upcoming</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {upcomingMovies.map(movie => (
//           <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               className="w-full h-80 object-cover rounded-md"
//             />
//             <h2 className="text-xl font-semibold text-white mt-4">{movie.title}</h2>
//             <p className="text-gray-400 text-sm mt-2">{movie.release_date}</p>
//             <p className="text-gray-300 text-sm mt-2">{movie.overview.substring(0, 100)}...</p>
//             <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average}</p>
//           </div>
//         ))}
//       </div>
//       <hr /><hr />
//       <br />

//     </div>


//   );
// };

// export default Card;

const Card = ({ title, movies }) => {
  return (
    <div className="p-6 container min-h-screen mt-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="card p-4 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold text-white mt-4">{movie.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{movie.release_date}</p>
            <p className="text-gray-300 text-sm mt-2">{movie.overview.substring(0, 100)}...</p>
            <p className="text-yellow-400 font-bold mt-2">⭐ {movie.vote_average.toFixed(1)}</p>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default Card;
