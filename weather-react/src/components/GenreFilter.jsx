
import React from "react";
import { useSearch } from "../contexts/SearchContext";

export default function GenreFilter() {
  const { genres, selectedGenre, handleGenreSelect } = useSearch();

  return (
    <select
      className="my-6 p-3 border bg-slate-950  text-white rounded-3xl"
      onChange={(e) => handleGenreSelect(e.target.value)}
      value={selectedGenre}
    >
      <option value="">Categories</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
