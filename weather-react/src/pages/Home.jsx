import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import {fetchPopularMovies,searchMovies,fetchGenres,filterMoviesByGenre,fetchMovieById} from "../services/api";

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
  
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
  
    try {
      const movieSuggestions = await searchMovies(value);
      setSuggestions(movieSuggestions || []);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
    }
  };
  
  const handleQuery = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSuggestions([]);
  
    try {
      const searchedMovies = await searchMovies(query);
      setMovies(searchedMovies || []);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSuggestions([]);
  };

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularMovies = await fetchPopularMovies(); 
        setMovies(popularMovies);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };
    fetchMovies();
  }, []);


  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };
  
    fetchMovieGenres();
  }, []);

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
  
    try {
      const movies = await filterMoviesByGenre(genreId);
      setMovies(movies);
    } catch (error) {
      console.error("Error filtering by genre", error);
    }
  };


  return (
    <>
      <div className="max-w-md mx-auto">
        <GenreFilter genres={genres} onChange={handleGenreChange} />
        <SearchBar
          query={query}
          onChange={handleChange}
          onSubmit={handleQuery}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>

      {loading ? (
        <p className="text-center mt-8 text-purple-600 font-semibold">Loading...</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}
