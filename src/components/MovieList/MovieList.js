import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import "./MovieList.css";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  const getData = async () => {
    try {
      const Data = await axios.get(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      if (Data.data && Data.data.results) {
        setMovieList(Data.data.results);
      } else {
        setMovieList([]); // Ensure movieList is an array
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setMovieList([]); // Ensure movieList is an array even on error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.length > 0 ? (
          movieList.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default MovieList;
