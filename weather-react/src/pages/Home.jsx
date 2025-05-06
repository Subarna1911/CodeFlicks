import MovieGrid from '../components/MovieGrid';
import { useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import SliderSwiper from '../components/SliderSwiper';

export default function Home() {
  const { movies, loading, loadDefaultMovies } = useSearch();

  useEffect(() => {
    loadDefaultMovies();
  }, []);

  return (
    <>
         {/* <div>
      {movies.length > 0 ? (
        <SliderSwiper movies={movies.slice(4, 9)} />
      ) : (
        <div className="text-white text-center">Loading banners...</div>
      )}
    </div> */}
      {loading ? (
        <p className="text-center text-purple-600 font-semibold">Loading...</p>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </>
  );
}
