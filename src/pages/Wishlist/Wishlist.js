import React, { useContext } from "react";
import { MovieContext } from "../../App";
import "./Wishlist.css";

function Wishlist() {
  const { whishlistMovie } = useContext(MovieContext);
  return whishlistMovie.map((movie) => (
    <div
      className="wishlist-container"
      style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
    >
      {movie}
    </div>
  ));
}

export default Wishlist;
