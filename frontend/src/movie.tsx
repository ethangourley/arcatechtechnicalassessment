import { Movies } from "./App";

const Movie = ({ title, poster_path, overview, vote_average }: Movies) => {
    const ImagesApi = "https://image.tmdb.org/t/p/w1280";
    const setVoteClass = (vote: number) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <div className="movie">
            <img
                src={
                    poster_path
                        ? ImagesApi + poster_path
                        : "https://indianfolk.com/wp-content/uploads/2018/10/Movie.jpg"
                }
                alt={title}
            />
            <div className="movie-info">
                <h3>{title}</h3>
                <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
            </div>
            <div className="movie-over">
                <h2>Overview:</h2>
                <p>{overview}</p>
            </div>
        </div>
    );
};

export default Movie;