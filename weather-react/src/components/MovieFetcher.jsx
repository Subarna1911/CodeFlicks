import React, { useEffect, useState } from 'react';

const MovieFetcher = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c49e2fb9c0msh93cc5c217972938p114eb8jsn328ee3084c2d',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      setError('Error fetching movie data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Top 100 IMDb Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.image} alt={movie.title} width="50" style={{ marginRight: '10px' }} />
            <strong>{movie.title}</strong> ({movie.year}) - Rating: {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieFetcher;
