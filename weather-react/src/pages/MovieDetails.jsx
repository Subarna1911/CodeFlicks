
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id }   = useParams();
  const API_KEY  = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [movie, setMovie] = useState(null);

  useEffect(()=>{

    const fetchMovies = async()=>{
        try{
            const response =  await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
            const data = await response.json();
            setMovie(data);
        }

        catch(error){
            console,log("Failed to fetch movie details", error);
        }
    };

    fetchMovies();
  }, [id])
  

//   useEffect(() => {
//     fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
//       .then((res) => res.json())
//       .then((data) => setMovie(data))
//       .catch((err) => console.error("Failed to fetch movie details", err));
//   }, [id]);



  if (!movie) return <p className="text-center mt-10">Loading movie...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-md"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <p className="text-gray-600">{movie.release_date}</p>
          <p className="text-yellow-500 font-bold">⭐ {movie.vote_average}/10</p>
          <p className="text-gray-700">{movie.overview}</p>
          <p className="text-gray-500 italic">Runtime: {movie.runtime} mins</p>
        </div>
      </div>
    </div>
  );
}
