import React, { FC } from 'react'
import Movie from './Movie'
import { IMovies, IMovie } from '../data/types'
import '../styles/movies.scss'

interface IMoviesProps {
    movies: IMovies,
    viewTrailer: (movie: IMovie) => void,
    closeCard: () => void,
}

const Movies: FC<IMoviesProps> = ({ movies, viewTrailer, closeCard }) => {
    return (
        <div data-testid="movies" className='wrapper'>
            {movies.movies?.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
