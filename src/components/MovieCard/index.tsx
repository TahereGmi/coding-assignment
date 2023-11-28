import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import watchLaterMovieSlice from 'data/reducers/watchLaterMovieSlice'
import starredSlice from 'data/reducers/starredSlice'
import { IMovie, ISingleMovie, IStarredList, IWatchLaterList, ISelectedMovie } from 'data/types'
import { fetchMovie } from 'data/reducers/singleMovieSlice'
import type { AppDispatch, RootState } from "data/store"
import TrailerModal from 'components/TrailerModal'
import words from 'translation/data_words.json'
import Star from 'components/Star'
import Favourite from 'components/Favourite'
import Poster from 'components/Poster'
import useMediaQuery from 'helpers/useMediaQuery'
import Icon from 'components/Icon'
import Button from 'components/Button'

type TMovieProps = {
    movie: IMovie
}

const Movie: FC<TMovieProps> = ({ movie }) => {
    const dispatch = useDispatch<AppDispatch>()
    const findInList = (list: ISelectedMovie[] , movieId: number) => list?.map((movie: { id: number }) => movie.id).includes(movieId);
    const isMobile = useMediaQuery('(max-width: 480px)');

    const { starredMovies } = useSelector((state: RootState) => state.starred) as IStarredList
    const { watchLaterMovies } = useSelector((state: RootState) => state.watchLaterMovie) as IWatchLaterList
    const { movieItem, fetchStatus } = useSelector((state: RootState) => state.singleMovie) as ISingleMovie
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterMovieSlice.actions
    const [videoKey, setVideoKey] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [cardOpened, setCardOpened] = useState<boolean>(false)

    const isInWatchList = useMemo(() => findInList(watchLaterMovies, movie.id), [watchLaterMovies, movie.id]);
    const isInStarList = useMemo(() => findInList(starredMovies, movie.id), [starredMovies, movie.id]);

    const getMovie = useCallback(async (id: number) => {
        await dispatch(fetchMovie(id));
    }, [dispatch]);

    const viewTrailer = useCallback(async () => {
        await getMovie(movie.id);
        setCardOpened(false);
        setIsModalOpen(true);
        document.body.classList.add('modal-open');
    }, [getMovie, movie.id]);

    const closeTrailer = () => {
        setIsModalOpen(false);
        setVideoKey(null);
        document.body.classList.remove('modal-open');
    };

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
            const trailer = movieItem.videos?.results.find((vid) => vid.type === 'Trailer');
            setVideoKey((trailer?.key ?? movieItem.videos?.results[0].key) || '');
        }
    }, [fetchStatus, movieItem.videos?.results]);

    return (
        <>
            <div 
                className={`movie-card ${cardOpened ? 'opened' : ''}`} 
                onClick={handleOpenOverlay} 
                data-testid="movie-thumbnail"
            >
                <div className="card__body text-center">
                    <div className="overlay" />
                    <div className="info_panel">
                        <p className="overview">
                            {movie.overview}
                        </p>
                        <p className="year">
                            {movie.release_date?.substring(0, 4)}
                        </p>
                        <Star 
                            icon={isInStarList ? 'bi-star-fill' : 'bi-star'} 
                            onClick={isInStarList ? handleRemoveStar : handleAddStar} 
                            data-testid={isInStarList ? 'unstar-link' : 'starred-link'} />
                        <Favourite 
                            icon={`${isInWatchList ? 'bi-check' : null}`}
                            text={isInWatchList ? '' : words.watch_later}
                            onClick={isInWatchList ? handleRemoveFromWatchList : handleAddToWatchList}
                            data-testid={isInWatchList ? 'remove-watch-later' : 'watch-later'}
                        />
                        <Button 
                            classList='movie-btn btn btn-dark' 
                            text={words.view_trailer} 
                            onClick={handleShowTrailer}
                        />                                         
                    </div>
                    <Poster path={movie.poster_path} />
                </div>
                <h6 className="title mobile-card">{movie.title}</h6>
                <h6 className="title">{movie.title}</h6>
                <Button
                    classList='movie-btn close'
                    onClose={handleCloseOverlay}
                    icon='bi-x'
                />

            </div>
            {isModalOpen && videoKey && <TrailerModal
                videoKey={videoKey}
                onClose={closeTrailer} 
                fetchStatus={fetchStatus}
            />}
        </>
    )
}

export default Movie