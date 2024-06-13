import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="Imdb logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>
            Popular
            <span className="icon">
              <i className="fas fa-fire" style={{ color: "yellow" }} />
            </span>
          </span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
            <span className="icon">
              <i className="fas fa-star-half-stroke" style={{ color: "yellow" }} />
            </span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <div className="headerRight">
        <Link to="/Wishlist" style={{ textDecoration: "none" }}>
          <span className="wishlist">Wishlist</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
