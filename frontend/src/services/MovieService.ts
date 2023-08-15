import Movie from "../types/Movie";

const API_BASE_URL = 'http://localhost:3002';

export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/trending`);
    if (!response.ok) {
      throw new Error('Error fetching movies');
    }
    const movies = await response.json();
    return movies.results;
  } catch (error) {
    throw new Error('Error fetching movies');
  }
}

export async function fetchMovieDetails(id: string): Promise<Movie> {
    try {
      const response = await fetch(`${API_BASE_URL}/details?id=${id}`);
      if (!response.ok) {
        throw new Error('Error fetching movie details');
      }
      const movieDetails = await response.json();
      return movieDetails;
    } catch (error) {
      throw new Error('Error fetching movie details');
    }
  }

export async function searchMovieDetails(query: string): Promise<Movie[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/search?search=${query}`);
        if (!response.ok) {
          throw new Error('Error fetching movie details');
        }
        const movieDetails = await response.json();
        return movieDetails;
      } catch (error) {
        throw new Error('Error fetching movie details');

}

}
