import React from "react";

export default function SearchBar({ query, onChange, onSubmit, suggestions, onSuggestionClick }) {
  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <form onSubmit={onSubmit} className="flex items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Search for movies..."
          className="flex-grow px-4 py-2 rounded-md border"
        />
        <button
          type="submit"
          className="bg-slate-950 text-white px-6 py-2 rounded-md hover:cursor-pointer  hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white w-full mt-1 border rounded-md max-h-60 overflow-y-auto">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
              onClick={() => onSuggestionClick(movie.title)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
