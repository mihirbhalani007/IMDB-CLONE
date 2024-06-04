import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
       setPopularMovies(response.data.results);
    };
    fetchPopularMovies();
  }, []);

  console.log(popularMovies);
  return (
    <>
      <h1>this is home page</h1>
    </>
  );
}

export default Home;
