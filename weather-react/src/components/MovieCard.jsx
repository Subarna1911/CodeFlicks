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
      <div className="bg-red-700 flex max-w-sm m-auto justify-center items-center rounded-lg text-white flex-col relative mt-8 shadow-2xl">
        <button
          onClick={onFavoriteClick}
          className="absolute top-4 right-4 font-bold text-2xl"
        >
          {favorite ? "❤" : "🤍"}
        </button>
        <div>
          <img
            className="bg-center bg-no-repeat bg-cover rounded-b-0 rounded-t-md shadow-2xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="p-6 max-h-[200px] text-lg">
          <h1 className="font-bold text-lg uppercase">{movie.title}</h1>
          <p className="font-medium">{movie.release_date}</p>
          <p className="my-2">⭐ {movie.vote_average}/10</p>
        </div>
      </div>
    </Link>
  );
}
