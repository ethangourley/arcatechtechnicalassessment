import { create } from 'zustand'
import Movie  from '../types/Movie'
import { fetchMovieDetails} from '../services/MovieService'

interface MovieStore {
    movies: Movie[],
    getMovie: (id:number) => Promise<Movie | undefined>,
}

export const useStoreMovies = create<MovieStore>((set,get) => ({
    movies: [],

    getMovie: async (id:number) => {
        const { movies } = get()
        const movie = movies.find((mov) => mov.id === id)

        if(!movie){
            const loadedMovie = await fetchMovieDetails(id.toString())
            if(!loadedMovie){ return undefined }
            set(() => ({
                movies: [...movies,loadedMovie]
            }))
            return loadedMovie
        }
        return movie
    }
}))