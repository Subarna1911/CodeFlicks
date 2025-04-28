import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();


export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      
      const parsedFavorites = JSON.parse(storedFavs).filter(
        (movie) => movie && movie.id
      );
      setFavorites(parsedFavorites); 
    }
  }, []);

  
  useEffect(() => {
    if (favorites.length > 0) {
     
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
    
      localStorage.removeItem("favorites");
    }
  }, [favorites]);


  function addFavorites(movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  
  function removeFavorites(movieId) {
 
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }


  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  const value = {
    favorites,
    isFavorite,
    addFavorites,
    removeFavorites,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
