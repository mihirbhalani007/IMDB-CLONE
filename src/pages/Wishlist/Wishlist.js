import React, { useContext, useEffect } from "react";
import { MovieContext } from "../../App";
import "./Wishlist.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { deleteFromWishlist, savedMovie, setSavedMovie } =
    useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3001/wishlist");
      setSavedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleClick = async (e, id) => {
    e.stopPropagation();
    deleteFromWishlist(id);
  };

  // const handleCardClick = () => {
  //   navigate(`/movie/${movie.id}`);
  // };

  return (
    <div className="wishlist-container">
      {savedMovie.map((movie) => (
        <div
          className="cards"
          key={movie.id}
          onClick={() => {
            navigate(`/movie/${movie.id}`);
          }}
        >
          <img
            className="card__img"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie poster"
          />
          <div className="card__overlay">
            <button
              onClick={(e) => handleClick(e, movie.id)}
              className="removeButton"
            >
              <span>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  style={{ color: "#f00505" }}
                />
              </span>
            </button>
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
