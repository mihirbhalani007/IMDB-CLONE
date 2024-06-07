import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Card/Card";
import "./MovieList.css";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const { type } = useParams();

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterOption(e.target.value);
  };

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
      <div className="controls">
        <input
          type="text"
          placeholder="Search movie here..."
          onChange={handleSearch}
          value={searchTerm}
        ></input>
        <select value={sortOption} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </select>
        <select value={filterOption} onChange={handleFilter}>
          <option value="">Filter By</option>
          <option value="genre1">Genre 1</option>
          <option value="genre2">Genre 2</option>
        </select>
      </div>

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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Card from "../Card/Card";
// import "./MovieList.css";

// function MovieList() {
//   const [movieList, setMovieList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [filterOption, setFilterOption] = useState("");
//   const { type } = useParams();

//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/${
//           type ? type : "popular"
//         }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
//       );
//       if (response.data && response.data.results) {
//         setMovieList(response.data.results);
//       } else {
//         setMovieList([]); // Ensure movieList is an array
//       }
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setMovieList([]); // Ensure movieList is an array even on error
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [type]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSort = (event) => {
//     setSortOption(event.target.value);
//   };

//   const handleFilter = (event) => {
//     setFilterOption(event.target.value);
//   };

//   const filteredMovies = movieList
//     .filter((movie) =>
//       movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((movie) => {
//       // Add your filter logic here based on filterOption
//       if (!filterOption) return true;
//       // Example: return movie.genre_ids.includes(parseInt(filterOption));
//       return true; // Placeholder
//     })
//     .sort((a, b) => {
//       if (sortOption === "title") {
//         return a.original_title.localeCompare(b.original_title);
//       } else if (sortOption === "release_date") {
//         return new Date(b.release_date) - new Date(a.release_date);
//       } else if (sortOption === "rating") {
//         return b.vote_average - a.vote_average;
//       }
//       return 0;
//     });

//   return (
//     <div className="movie__list">
//       <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>

//       <div className="controls">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         <select value={sortOption} onChange={handleSort}>
//           <option value="">Sort By</option>
//           <option value="title">Title</option>
//           <option value="release_date">Release Date</option>
//           <option value="rating">Rating</option>
//         </select>
//         <select value={filterOption} onChange={handleFilter}>
//           <option value="">Filter By</option>
//           {/* Add filter options here */}
//           <option value="genre1">Genre 1</option>
//           <option value="genre2">Genre 2</option>
//         </select>
//       </div>

//       <div className="list__cards">
//         {filteredMovies.length > 0 ? (
//           filteredMovies.map((movie) => <Card movie={movie} key={movie.id} />)
//         ) : (
//           <p>No movies found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MovieList;
