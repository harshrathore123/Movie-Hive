import { useEffect, useState } from "react"

const useFetchPopularMovies = (fetchData,page) =>{
  //we will making one state for movie

  const[movies,setMovies] = useState([]);
  const[loading,setLoading] =  useState(false);
  const[error,setError] = useState(null);
  const[totalPages,setTotalPages] = useState(1);


  //now we will use useeffect becouse i want that when we fetching data not waitng
useEffect(()=>{

  if(!fetchData) return;

  setLoading(true);
  fetch(`http://localhost:8000/api/movies/popular?page=${page}`)
  .then((response) => response.json())
  .then((data)=>{
    setMovies(data.data.results);
    setTotalPages(data.data.total_pages || 1);
    setLoading(false);
  })
  .catch((err)=>{
    setError(err.message);
    setLoading(false);
  });
},[fetchData,page])
  
return {movies,loading,error,totalPages};
}

export default useFetchPopularMovies;