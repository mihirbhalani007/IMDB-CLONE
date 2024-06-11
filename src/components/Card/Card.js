import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    });
  }, []);

  return (
    <>
      {isLoding ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
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
              {/* <button
                className="bg-pink-300 text-white active:bg-pink-500 hover:bg-pink-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12"
                type="button"
              >
                <i class="fas fa-heart"></i>
              </button> */}
              <button
                className="heart-button relative bg-transparent text-pink-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-3/12"
                type="button"
              >
                <i className="fas fa-heart heart-icon"></i>
              </button>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
