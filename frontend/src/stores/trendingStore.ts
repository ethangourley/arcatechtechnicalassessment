import { create } from 'zustand'
import Movie  from '../types/Movie'
import { fetchMovies } from '../services/MovieService'

interface TrendingStore {
    movies: Movie[],
    loadTrending: () => void,
}

export const useTrendingStore = create<TrendingStore>((set) => ({
    movies: [],

    loadTrending: async () => {
        const trendingMovies = await fetchMovies()
        set(() => ({
            movies: trendingMovies
        }))
    }
}))