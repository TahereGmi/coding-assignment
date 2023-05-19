import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import watchLaterSlice, { watchLaterList } from '../data/reducers/watchLaterSlice'
import starredSlice, { starredList } from '../data/reducers/starredSlice'
import { IMovie, ISingleMovie, IStarredList, IWatchLaterList } from '../data/types'
import { fetchMovie, singleMovie } from '../data/reducers/singleMovieSlice'
import { ENDPOINT, API_KEY } from '../constants'

import type { AppDispatch } from "../data/store"
// import placeholder from '../assets/'

interface IMovieProps {
    movie: IMovie
}

const Movie: FC<IMovieProps> = ({ movie }) => {
    const { starredMovies } = useSelector(starredList) as IStarredList
    const { watchLaterMovies } = useSelector(watchLaterList) as IWatchLaterList
    const dispatch = useDispatch<AppDispatch>()
    const { movieItem, fetchStatus } = useSelector(singleMovie) as ISingleMovie

    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const [videoKey, setVideoKey] = useState<string | null>(null)
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        if (fetchStatus === 'success') {
          setVideoKey(null)
          const trailer = movieItem.videos?.results.find((vid: any) => vid.type === 'Trailer')
          setVideoKey((trailer?.key ?? movieItem.videos?.results[0].key) || '')
        }
      }, [fetchStatus])

    const myClickHandler = (e: any) => {
        // if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
        e.target.parentElement.parentElement.classList.remove('opened')
    }

    const getMovie = async (id: number) => {
        const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        await dispatch(fetchMovie(URL));
    }

    const viewTrailer = (movie: IMovie) => {
        getMovie(movie.id)
        if (!videoKey) setOpen(true)
        setOpen(true)
      }

    return (
        <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
            <div className="card__body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{movie.overview}</div>
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>
                    {!starredMovies.map((movie) => movie.id).includes(movie.id) ? (
                        <span className="btn-star" data-testid="starred-link" onClick={() => 
                            dispatch(starMovie({
                                id: movie.id, 
                                overview: movie.overview, 
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                            })
                        )}>
                            <i className="bi bi-star" />
                        </span>
                    ) : (
                        <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                            <i className="bi bi-star-fill" data-testid="star-fill" />
                        </span>
                    )}
                    {!watchLaterMovies.map((movie) => movie.id).includes(movie.id) ? (
                        <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later" onClick={() => dispatch(addToWatchLater({
                                id: movie.id, 
                                overview: movie.overview, 
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                        }))}>Watch Later</button>
                    ) : (
                        <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}><i className="bi bi-check"></i></button>
                    )}
                    <button type="button" className="btn btn-dark" onClick={() => viewTrailer(movie)}>View Trailer</button>                                                
                </div>
                <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'placeholder'} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{movie.title}</h6>
            <h6 className="title">{movie.title}</h6>
            <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Movie