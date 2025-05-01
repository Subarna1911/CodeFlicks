import { useSearch } from '../contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  const {
    query,
    suggestions,
    handleChange,
    handleSubmit,
    handleSuggestionClick
  } = useSearch();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for movies..."
          className="flex-grow px-4 py-2 rounded-md border"
        />
        <button type="submit" className="text-white px-4 py-2 absolute right-0 hover:cursor-pointer">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white text-black w-full mt-1 border rounded-md max-h-60 overflow-y-auto">
          {suggestions.map((movie) => (
            <li
              key={movie.id}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
              onClick={() => handleSuggestionClick(movie.title)}
            >
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
