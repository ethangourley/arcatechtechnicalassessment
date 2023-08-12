import { useEffect, useState } from "react";
import Movie from "./movie";

export interface Movies {
    id?: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

const my_api_key = import.meta.env.VITE_API_KEY;

function App() {
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movies[]>([]);
    const [page, setPage] = useState<number>(1);

    const FeaturedApi = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${my_api_key}&page=${page}`;

    const getMovies = (API: string) => {
        setLoading(true);
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
                setLoading(false);
            });
    };

    useEffect(() => {
        getMovies(FeaturedApi);
    }, [FeaturedApi]);

    return (
        <div className="movie_app">
            <h1 className="header">
                Simple Movie App with React Query and TypeScript
            </h1>

            <div className="movie-container">
                {loading ? (
                    <h1 className="loading">Loading...</h1>
                ) : (
                    <>
                        {movies.length > 0 &&
                            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
                    </>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1 ? true : false}
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === 100 ? true : false}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;