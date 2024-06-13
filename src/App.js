import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./pages/MovieDetail/Movie";
import Wishlist from "./pages/Wishlist/Wishlist";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const MovieContext = React.createContext();

function App() {
  const [wishlistMovie, setWishlistMovie] = useState([]);

  const notify = () =>
    toast.success("Movie Successfully added!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const addToWishlist = (movie) => {
    setWishlistMovie((prevMovies) => {
      if (wishlistMovie.some((m) => m.id === movie.id)) {
        return prevMovies;
      }
      return  [...prevMovies, movie];
    });

    axios
      .post("http://localhost:3001/wishlist", movie)
      .then(() => {
        notify();
      })
      .catch((error) => {
        console.error("Error adding movie to wishlist:", error);
      });
  };

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <MovieContext.Provider value={{ wishlistMovie, addToWishlist }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="*" element={<h1>Error Page</h1>} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <ToastContainer />
          </MovieContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
