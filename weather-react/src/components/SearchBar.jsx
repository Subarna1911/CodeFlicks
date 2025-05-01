import { useState, useRef, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  const {
    query,
    suggestions,
    handleChange,
    handleSubmit,
    handleSuggestionClick,
  } = useSearch();

  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef();

  // Close input on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!inputRef.current?.contains(e.target)) {
        setShowInput(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowInput(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="text-white hover:cursor-pointer hover:text-amber-300 transition"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      )}

      {showInput && (
        <div className="absolute right-0 top-0 mt-1 z-20 w-72 bg-white border-1 border-gray-200 text-black shadow-lg rounded-md p-2 ">
          <form onSubmit={(e) => {
            handleSubmit(e);
            setShowInput(false);
          }} className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search for movies..."
              className="flex-grow px-3 py-2  rounded-md w-full text-sm focus:outline-none"
              autoFocus
            />
            <button type="submit" className="text-slate-600 font-semibold hover:cursor-pointer">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="bg-white text-black mt-2 z-40 rounded-md max-h-60 overflow-y-auto text-sm">
              {suggestions.map((movie) => (
                <li
                  key={movie.id}
                  className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                  onClick={() => {
                    handleSuggestionClick(movie.title);
                    setShowInput(false);
                  }}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
