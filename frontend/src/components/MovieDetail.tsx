import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useStoreMovies } from "../stores/movieStore";
import Movie from "../types/Movie";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const getMovie = useStoreMovies((store) => store.getMovie);
  const [movie, setMovie] = useState<Movie | undefined>();

  useEffect(() => {
    if (!id) {
      return;
    }
    getMovie(parseInt(id)).then((movie) => {
      setMovie(movie);
    });
  }, [true]);

  console.log(movie);

  if (!movie) {
    return <div>No Movie</div>;
  }

  return (
    <Container>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={
          ("https://image.tmdb.org/t/p/original/" + movie.poster_path) as string
        }
        alt={movie.title}
        className="img-fluid"
      />

      <h2>Details:</h2>
      <p>Original Title: {movie.original_title}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>
        Genres:{" "}
        {movie ? movie.genres.map((genre) => genre.name).join(", ") : "None"}
      </p>
      <p>
        Production Companies:{" "}
        {movie.production_companies.map((company) => company.name).join(", ")}
      </p>

      <h2>Additional Information:</h2>
      <p>IMDb ID: {movie.imdb_id}</p>
      <p>Tagline: {movie.tagline}</p>
      <p>Popularity: {movie.popularity}</p>
    </Container>
  );
}

export default MovieDetails;
