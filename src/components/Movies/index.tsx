import React, { FC } from 'react'
import Movie from 'components/MovieCard'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from "data/store"
import { fetchMovies } from 'data/api/moviesApi'
import useInfiniteScroll from 'helpers/UseInfinitScroll'
import { useEffectOnce } from 'helpers/useEffectOnce'
import words from 'translation/data_words.json'
import './movies.scss'

const Movies: FC = () => {
    const { movies, fetchStatus } = useSelector((state: RootState) => state.movieList)

    const dispatch = useDispatch<AppDispatch>()

    const loadMoreMovies = (page: number) => {
        dispatch(fetchMovies(({ page, type: 'list' })))
    }

    useInfiniteScroll(loadMoreMovies)

    useEffectOnce(() => {
        dispatch(fetchMovies({
            type: 'list',
        }))
    })

    return (
        <div data-testid="movies" className='wrapper'>
            {movies?.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                    />
                )
            })}
            {fetchStatus === 'loading' && <div className='loading'>{words.loading}</div>}
        </div>
    )
}

export default Movies

