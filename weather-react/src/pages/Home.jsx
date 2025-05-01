import MovieGrid from '../components/MovieGrid';
import { useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';


export default function Home() {
  const { movies, loading, loadDefaultMovies } = useSearch();

  useEffect(() => {
    loadDefaultMovies();
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center text-purple-600 font-semibold">Loading...</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}
