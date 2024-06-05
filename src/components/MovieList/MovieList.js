import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movielist() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  const getData = () => {};

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  return <></>;
}

export default Movielist;
