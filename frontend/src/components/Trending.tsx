import MovieContainer from "./MovieContainer.tsx";
import { useEffect } from "react";
import { useTrendingStore } from "../stores/trendingStore.ts";

function Trending() {
  const loadTrending = useTrendingStore((store) => store.loadTrending);
  const movies = useTrendingStore((store) => store.movies);

  useEffect(() => {
    loadTrending();
  }, [true]);

  return (
    <div className="container mt-5">
      <h1>Movie List</h1>
      <h1 />
      <h2>View all the latest trending movies!</h2>
      <MovieContainer movies={movies} />
    </div>
  );
}

export default Trending;
