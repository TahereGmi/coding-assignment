import React, { FC } from 'react'
import Movie from './Movie'
import { IMovies } from '../data/types'
import { useSelector } from 'react-redux'
import { movieList } from '../data/reducers/moviesSlice'
import '../styles/movies.scss'

const Movies: FC = () => {
    const { movies, fetchStatus } = useSelector(movieList) as IMovies

    return (
        <div data-testid="movies" className='wrapper'>
            {fetchStatus !== 'success' ? <div>Loading...</div> : 
            movies?.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                    />
                )
            })}
        </div>
    )
}

export default Movies
