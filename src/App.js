import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./pages/MovieDetail/Movie";
import Wishlist from "./pages/Wishlist/Wishlist";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MovieContextProvider from "./context/MovieContext";

function App() {
  return (
    <>
      <div className="App">
        <MovieContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
            <ToastContainer />
          </Router>
        </MovieContextProvider>
      </div>
    </>
  );
}

export default App;
