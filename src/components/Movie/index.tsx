import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import watchLaterMovieSlice from '../../data/reducers/watchLaterMovieSlice'
import starredSlice from '../../data/reducers/starredSlice'
import { IMovie, ISingleMovie, IStarredList, IWatchLaterList } from 'data/types'
import { fetchMovie } from 'data/reducers/singleMovieSlice'
import type { AppDispatch, RootState } from "data/store"
import TrailerModal from 'components/TrailerModal'
import words from 'translation/data_words.json'
import Icon from 'components/Icon'

type TMovieProps = {
    movie: IMovie
}

const Movie: FC<TMovieProps> = ({ movie }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { starredMovies } = useSelector((state: RootState) => state.starred) as IStarredList
    const { watchLaterMovies } = useSelector((state: RootState) => state.watchLaterMovie) as IWatchLaterList
    const { movieItem, fetchStatus } = useSelector((state: RootState) => state.singleMovie) as ISingleMovie
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterMovieSlice.actions
    const [videoKey, setVideoKey] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [cardOpened, setCardOpened] = useState<boolean>(false)
    const isInWatchList = watchLaterMovies?.map((movie) => movie.id).includes(movie.id)
    const isInStarList = starredMovies?.map((movie) => movie.id).includes(movie.id)

    const getMovie = async (id: number) => {
        await dispatch(fetchMovie(id));
    }

    const viewTrailer = async () => {
        await getMovie(movie.id)
        setCardOpened(false)
        setIsModalOpen(true)
        document.body.classList.add('modal-open')
    }

    const closeTrailer = () => {
        setIsModalOpen(false)
        setVideoKey(null)
        document.body.classList.remove('modal-open')
    }

    const handleShowTrailer = () => {
        viewTrailer()
    }

    const handleAddToWatchList = () => {
        dispatch(addToWatchLater({
            id: movie.id, 
            overview: movie.overview, 
            release_date: movie.release_date?.substring(0, 4),
            poster_path: movie.poster_path,
            title: movie.title
        }))
    }

    const handleRemoveFromWatchList = () => {
        dispatch(removeFromWatchLater(movie))
    }

    const handleAddStar = () => {
        dispatch(starMovie({
            id: movie.id, 
            overview: movie.overview, 
            release_date: movie.release_date?.substring(0, 4),
            poster_path: movie.poster_path,
            title: movie.title
        }))
    }

    const handleRemoveStar = () => {
        dispatch(unstarMovie(movie))
    }

    const handleOpenOverlay = () => {
        if(isMobile)  {
            setCardOpened(true)
            document.body.classList.add('modal-open')
        }
    }

    const handleCloseOverlay = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setCardOpened(false)
        document.body.classList.remove('modal-open')
    }


    useEffect(() => {
        if (fetchStatus === 'success') {
          const trailer = movieItem.videos?.results.find((vid: any) => vid.type === 'Trailer')
          setVideoKey((trailer?.key ?? movieItem.videos?.results[0].key) || '')
        }
      }, [fetchStatus, movieItem.videos?.results])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 480px)');
        setIsMobile(mediaQuery.matches);
    
        const handleResize = (event: MediaQueryListEvent) => {
          setIsMobile(event.matches);
        };
    
        mediaQuery.addEventListener('change', handleResize);
        return () => {
          mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <>
            <article 
                className={`card ${cardOpened ? 'opened' : ''}`} 
                onClick={handleOpenOverlay} 
                data-testid="movie-thumbnail"
            >
                <div className="card__body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <div className="overview">
                            {movie.overview}
                        </div>
                        <div className="year">
                            {movie.release_date?.substring(0, 4)}
                        </div>
                        {isInStarList ? (
                            <span 
                                className="btn-star" 
                                data-testid="unstar-link" 
                                onClick={handleRemoveStar}
                            >
                                <Icon classList="bi bi-star-fill" data-testid="star-fill" />
                            </span>
                            
                        ) : (
                            <span 
                                className="btn-star"
                                data-testid="starred-link" 
                                onClick={handleAddStar}
                            >
                                <Icon classList='bi bi-star' />
                            </span>
                        )}
                        {isInWatchList ? (
                           
                             <button 
                             type="button" 
                             data-testid="remove-watch-later" 
                             className="movie-btn btn btn-light btn-watch-later blue" 
                             onClick={handleRemoveFromWatchList}>
                                 <Icon classList="bi bi-check" />
                         </button>
                        ) : (
                            <button 
                                type="button" 
                                data-testid="watch-later"
                                className="movie-btn btn btn-light btn-watch-later" 
                                onClick={handleAddToWatchList}
                            >
                                {words.watch_later}
                            </button>
                        )}
                        <button 
                            type="button" 
                            className="movie-btn btn btn-dark" 
                            onClick={handleShowTrailer}>
                                {words.view_trailer}
                            </button>                                                
                    </div>
                    <img 
                        className="center-block" 
                        src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ''} 
                        alt="Movie poster" />
                </div>
                <h6 className="title mobile-card">{movie.title}</h6>
                <h6 className="title">{movie.title}</h6>
                <button 
                    type="button" 
                    className="movie-btn close" 
                    onClick={handleCloseOverlay} 
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </article>
            {isModalOpen && videoKey && <TrailerModal
                videoKey={videoKey}
                onClose={closeTrailer} 
                fetchStatus={fetchStatus}
            />}
        </>
    )
}

export default Movie