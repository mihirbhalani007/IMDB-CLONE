import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Movielist from "../../components/MovieList/MovieList";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);

  // Fetch popular movies from the API
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      setPopularMovies(response.data.results);
    } catch (err) {
      setError("Failed to fetch popular movies");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="poster">
      {error && <div className="error">{error}</div>}
      {popularMovies.length > 0 ? (
        <Carousel
          showThumbs={false}
          autoPlay={true}
          autoFocus={true}
          transitionTime={0}
          infiniteLoop={true}
          showStatus={false}
          interval={1500}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
              key={movie.id}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={`${movie.original_title} Poster`}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average.toFixed(1)}
                    <i className="fas fa-star" style={{ color: "yellow" }} />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      ) : (
        !error && <div className="loading">Loading...</div>
      )}
      <Movielist />
    </div>
  );
}

export default Home;
