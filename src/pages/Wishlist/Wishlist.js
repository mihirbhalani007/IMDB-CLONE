import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../App";
import "./Wishlist.css";
import axios from "axios";

function Wishlist() {
  const { wishlistMovie, deleteFromWishlist, savedMovie, setSavedMovie } = useContext(MovieContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/wishlist");
      setSavedMovie(response.data);
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleClick = (id) => {
    deleteFromWishlist(id);
  };

  return (
    <div className="wishlist-container">
      {savedMovie.map((movie) => (
        <div className="cards" key={movie.id}>
          <img
            className="card__img"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie poster"
          />
          <div className="card__overlay">
            <button onClick={() => handleClick(movie.id)}>Remove</button>
            <div
              className="card__title"
              style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            >
              {movie.original_title}
            </div>
            <div className="card__runtime">
              {movie.release_date}
              <span className="card__rating">
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                <div className="star">
                  <i className="fas fa-star" style={{ color: "yellow" }} />
                </div>
              </span>
            </div>
            {/* <div
              className="card__description"
              style={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
            >
              {movie.overview ? movie.overview.slice(0, 118) + "..." : "N/A"}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
