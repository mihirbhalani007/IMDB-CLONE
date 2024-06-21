import React, { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [savedMovie, setSavedMovie] = useState([]);
  const [badge, setBadge] = useState(0);

  // Generalized notification function
  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Fetch the number of items in the wishlist
  const handleBadge = async () => {
    try {
      const response = await axios.get("http://localhost:3001/wishlist");
      setBadge(response.data.length);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    handleBadge();
  }, [savedMovie]);

  // Add a movie to the wishlist
  const addToWishlist = async (movie) => {
    const movieWithStringId = { ...movie, id: String(movie.id) };

    // Check if the movie is already in the wishlist
    if (savedMovie.some((m) => m.id === movieWithStringId.id)) {
      notify("This movie is already in your wishlist!", "warn");
      return;
    }

    try {
      await axios.post("http://localhost:3001/wishlist", movieWithStringId);
      setSavedMovie((prevMovies) => [...prevMovies, movieWithStringId]);
      notify("Movie Successfully added!");
      handleBadge();
    } catch (error) {
      console.error("Error adding movie to wishlist:", error);
    }
  };

  // Delete a movie from the wishlist
  const deleteFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${id}`);
      setSavedMovie((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== id)
      );
      handleBadge();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        addToWishlist,
        deleteFromWishlist,
        savedMovie,
        setSavedMovie,
        badge,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
