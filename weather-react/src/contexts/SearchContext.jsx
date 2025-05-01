import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies, fetchGenres, filterMoviesByGenre } from '../services/api';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

 
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');


  useEffect(() => {
    loadDefaultMovies();
    loadGenres();
  }, []);

  const loadDefaultMovies = async () => {
    const defaultMovies = await fetchPopularMovies();
    setMovies(defaultMovies);
  };

  const loadGenres = async () => {
    const genreList = await fetchGenres();
    setGenres(genreList);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedGenre(''); 

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const results = await searchMovies(value);
    setSuggestions(results || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results || []);
    setSuggestions([]);
    setLoading(false);
  };

  const handleSuggestionClick = async (title) => {
    setQuery(title);
    const results = await searchMovies(title);
    setMovies(results || []);
    setSuggestions([]);
  };

  const handleGenreSelect = async (genreId) => {
    setSelectedGenre(genreId);
    setQuery(''); // clear search when filtering by genre
    setSuggestions([]);
    const filtered = await filterMoviesByGenre(genreId);
    setMovies(filtered);
  };

  const resetSearch = async () => {
    setQuery('');
    setSelectedGenre('');
    await loadDefaultMovies();
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        movies,
        loading,
        suggestions,
        genres,
        selectedGenre,
        handleChange,
        handleSubmit,
        handleSuggestionClick,
        handleGenreSelect,
        resetSearch,
        loadDefaultMovies,
        setMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
