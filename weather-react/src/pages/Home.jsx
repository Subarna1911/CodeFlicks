import MovieGrid from '../components/MovieGrid';
import { useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import SliderBanner from '../components/SliderBanner';

export default function Home() {
  const { movies, loading, loadDefaultMovies } = useSearch();

  useEffect(() => {
    loadDefaultMovies();
  }, []);

  return (
    <>
       <SliderBanner/>     
      {loading ? (
        <p className="text-center text-purple-600 font-semibold">Loading...</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}
