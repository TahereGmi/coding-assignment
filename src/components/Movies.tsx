import React, { FC, useEffect } from 'react'
import Movie from './Movie'
import { IMovies } from '../data/types'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch } from "../data/store"
import { fetchMoviesByPage } from 'data/reducers/moviesSlice'
import useInfiniteScroll from '../helpers/UseInfinitScroll'
import { fetchMovies } from '../data/reducers/moviesSlice'
import { movieList } from '../data/reducers/moviesSlice'
import { ENDPOINT_DISCOVER } from '../constants'
import words from '../translation/english_words.json'
import '../styles/movies.scss'

const Movies: FC = () => {
    const { movies, fetchStatus } = useSelector(movieList) as IMovies
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        (() => {
            dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=1`))
        })()
    }, [dispatch])

    const loadMoreMovies = (page: number) => {
        dispatch(fetchMoviesByPage(page))
    }
    useInfiniteScroll(loadMoreMovies)

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
            {fetchStatus === 'loading' && <div className='loading'>{words.loading_more}</div>}
        </div>
    )
}

export default Movies
