import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Movie() {
  const [clickedMovieDetails, setClickedMovieDetail] = useState();
  const { id } = useParams();

  const getDataById = async () => {
    const Data = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    );
    setClickedMovieDetail(Data.data.results);
    console.log("id: ", id);
    console.log(clickedMovieDetails);
  };
  useEffect(() => {
    getDataById();
    window.scrollTo(0, 0);
  }, []);

  return <h2>Movie detail page </h2>;
}

export default Movie;
