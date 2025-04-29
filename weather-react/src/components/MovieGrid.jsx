import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  if (!movies.length) {
    return <p className="text-center mt-8 text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 -z-10">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
