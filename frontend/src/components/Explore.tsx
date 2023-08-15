import MovieContainer from "./MovieContainer.tsx";
import { useState } from "react";
import { searchMovieDetails } from "../services/MovieService.ts";

import SearchBar from "./SearchBar";
import Movie from "../types/Movie.ts";

function Explore() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const result = (await searchMovieDetails(query)) as any;
    console.log(result);
    if (!result) {
      return;
    }
    setMovies(result.results);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <h2>Search through out database movies!</h2>
      <SearchBar onSearch={handleSearch} />
      <MovieContainer movies={movies} />
    </div>
  );
}

export default Explore;
