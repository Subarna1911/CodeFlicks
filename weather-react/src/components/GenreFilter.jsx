import React from "react";

export default function GenreFilter({ genres, onChange }) {
  return (
    <select className="my-6 px-4 py-2 border rounded-md" onChange={(e) => onChange(e.target.value)}>
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
