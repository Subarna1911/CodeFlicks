import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
          className="absolute text-black px-4 py-3 rounded-md hover:cursor-pointer text-2xl  right-0"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
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
