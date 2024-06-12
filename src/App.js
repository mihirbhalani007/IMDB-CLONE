import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./pages/MovieDetail/Movie";
import Wishlist from "./pages/Wishlist/Wishlist";
import React, { useState } from "react";

export const MovieContext = React.createContext();

function App() {
  const [whishlistMovie, setWishlistMovie] = useState([]);

  const addToWishlist = (movieId) => {
    setWishlistMovie((prevMovies) => [...prevMovies, movieId]);
    console.log(whishlistMovie);
  };

  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <MovieContext.Provider value={{ whishlistMovie, addToWishlist }}>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="movie/:id" element={<Movie />}></Route>
              <Route path="movies/:type" element={<MovieList />}></Route>
              <Route path="/*" element={<h1>Error Page</h1>}></Route>
              <Route path="/wishlist" element={<Wishlist />}></Route>
            </Routes>
          </MovieContext.Provider>
        </Router>
      </div>
    </>
  );
}

export default App;
