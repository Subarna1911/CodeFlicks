import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { isFavorite, addFavorites, removeFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault(); 
    if (favorite) {
      removeFavorites(movie.id);
    } else {
      addFavorites(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="block">
  <div className="relative group w-full h-[35vh] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
  <button
    onClick={onFavoriteClick}
    className="absolute top-3 right-3 z-10 text-3xl text-white hover:scale-110 transition-transform"
  >
    {favorite ? "❤" : "🤍"}
  </button>
  <img
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt="Movie Poster"
    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
  />
</div>

    </Link>
  );
}
