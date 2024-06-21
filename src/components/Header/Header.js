import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faStarHalfStroke,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { MovieContext } from "../../context/MovieContext";

const Header = () => {
  const { badge } = useContext(MovieContext);

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDb logo"
          />
        </Link>
        <Link to="/movies/popular" className="header__link">
          <span className="popular">
            Trending
            <FontAwesomeIcon
              icon={faFire}
              style={{ color: "#FFD43B", marginLeft: "5px" }}
            />
          </span>
        </Link>
        <Link to="/movies/top_rated" className="header__link">
          <span className="topRated">
            Highest Rated
            <FontAwesomeIcon
              icon={faStarHalfStroke}
              style={{ color: "#4169e1", marginLeft: "5px" }}
            />
          </span>
        </Link>
        <Link to="/movies/upcoming" className="header__link">
          <span className="upcoming">
            Coming Soon
            <FontAwesomeIcon
              icon={faCalendarXmark}
              style={{ color: "#ffa500", marginLeft: "5px" }}
            />
          </span>
        </Link>
      </div>
      <div className="headerRight">
        <Link to="/wishlist" className="header__link">
          <span className="wishlist">
            Wishlist
            {badge > 0 && <span className="badge">{badge}</span>}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
