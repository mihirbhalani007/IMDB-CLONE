import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";

const Card = ({ movie }) => {
  const { addToWishlist } = useContext(MovieContext);
  const [isLoding, setIsLoding] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    });
  }, []);
  const handleClick = (e) => {
    addToWishlist(movie);
    e.stopPropagation();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <>
      {isLoding ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div
          className="cards"
          onClick={handleCardClick}
          style={{ textDecoration: "none", color: "white" }}
        >
          <img
            className="card__img"
            src={`https://image.tmdb.org/t/p/original${
              movie ? movie.poster_path : ""
            }`}
            alt="movie poster"
          />
          <div className="card__overlay">
            <div className="card__title">
              {movie ? movie.original_title : ""}
            </div>
            <div className="card__runtime">
              {movie ? movie.release_date : ""}
              <span className="card__rating">
                {movie ? movie.vote_average.toFixed(1) : ""}
                <div className="star">
                  <i className="fas fa-star" style={{ color: "yellow" }} />
                </div>
              </span>
            </div>
            <div className="card__description">
              {movie ? movie.overview.slice(0, 118) + "..." : ""}
            </div>
            <button
              className={`heart-button relative bg-transparent text-pink-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12 ${
                isClicked ? "clicked" : ""
              }`}
              type="button"
              onClick={handleClick}
            >
              <i className="fas fa-heart heart-icon"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
