import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Movie from "../types/Movie";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          ("https://image.tmdb.org/t/p/original/" + movie.poster_path) as string
        }
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview}</Card.Text>
        <Button variant="primary">
          <Link to={"/movie/" + movie.id} className="nav-link">
            View Details
          </Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
