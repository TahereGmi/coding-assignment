import React, { FC } from 'react'
import Movie from '../Movie'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from "../../data/store"
import { fetchMovies } from '../../data/reducers/moviesSlice'
import useInfiniteScroll from '../../helpers/UseInfinitScroll'
import { useEffectOnce } from '../../helpers/useEffectOnce'
import words from '../../translation/data_words.json'
import { ENDPOINT_DISCOVER } from '../../constants'
import './movies.scss'

const Movies: FC = () => {
    const { movies, fetchStatus } = useSelector((state: RootState) => state.movieList)

    const dispatch = useDispatch<AppDispatch>()

    useEffectOnce(() => {
        dispatch(fetchMovies({ apiUrl: `${ENDPOINT_DISCOVER}`, page: 1 }))
    })

    const loadMoreMovies = (page: number) => {
        dispatch(fetchMovies(({ apiUrl: `${ENDPOINT_DISCOVER}`, page })))
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
            {fetchStatus === 'loading' && <div className='loading'>{words.loading}</div>}
        </div>
    )
}

export default Movies

