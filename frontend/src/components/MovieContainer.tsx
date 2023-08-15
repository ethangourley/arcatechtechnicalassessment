import MovieCard from "./MovieCard";
import Movie from "../types/Movie";

interface Props {
  movies: Movie[];
}

function MovieContainer({ movies }: Props) {
  return (
    <div className="row">
      {movies.map((movie) => (
        <div className="col-md-4 mb-4" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieContainer;
