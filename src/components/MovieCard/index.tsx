import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import watchLaterMovieSlice from 'data/reducers/watchLaterMovieSlice'
import starredSlice from 'data/reducers/starredSlice'
import { IMovie, ISelectedMovie, FetchStatus } from 'data/types'
import { fetchSingleMovie } from 'data/api/singleMovieApi'
import type { AppDispatch, RootState } from "data/store"
import Typography from 'components/Typography'
import TrailerModal from 'components/TrailerModal'
import words from 'translation/data_words.json'
import Star from 'components/Star'
import Favourite from 'components/Favourite'
import useMediaQuery from '../../utils/useMediaQuery'
import Poster from 'components/Poster'
import Button from 'components/Button'
import './movieCard.scss';

type TMovieProps = {
    movie: IMovie
}

const MovieCard: FC<TMovieProps> = ({ movie }) => {
    const dispatch = useDispatch<AppDispatch>()
    const isMobile = useMediaQuery('(max-width: 480px)')
    const findInList = (list: ISelectedMovie[] , movieId: number) => list?.map((movie: { id: number }) => movie.id).includes(movieId);

    const movieData = useSelector((state: RootState) => ({
        starredMovies: state.starred.starredMovies,
        watchLaterMovies: state.watchLaterMovie.watchLaterMovies,
        movieItem: state.singleMovie.movieItem,
        fetchStatus: state.singleMovie.fetchStatus
    }));

    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterMovieSlice.actions
    const [videoKey, setVideoKey] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [cardOpened, setCardOpened] = useState<boolean>(false)

    const isInWatchList = useMemo(() => findInList(movieData.watchLaterMovies, movie.id), [movieData.watchLaterMovies, movie.id]);
    const isInStarList = useMemo(() => findInList(movieData.starredMovies, movie.id), [movieData.starredMovies, movie.id]);

    const getMovie = useCallback(async (id: number) => {
        await dispatch(fetchSingleMovie(id));
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

    const handleCloseOverlay = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if(e) e.stopPropagation()
        setCardOpened(false)
        document.body.classList.remove('modal-open')
    }


    useEffect(() => {
        if (movieData.fetchStatus === FetchStatus.SUCCESS) {
            const trailer = movieData.movieItem.videos?.results.find((vid) => vid.type === 'Trailer');
            setVideoKey((trailer?.key ?? movieData.movieItem.videos?.results[0].key) || '');
        }
    }, [movieData.fetchStatus, movieData.movieItem.videos?.results]);

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
                        <Typography.Body size='1' className="overview">
                            {movie.overview}
                        </Typography.Body>
                        <Typography.Body size='2' className="year">
                            {movie.release_date?.substring(0, 4)}
                        </Typography.Body>
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
                <Typography.Heading 
                    size='h3' 
                    className={`title ${isMobile ? 'mobile-card' : ''}`}
                >
                    {movie.title}
                </Typography.Heading>
                <Button
                    classList='movie-btn close'
                    onClick={handleCloseOverlay}
                    icon='bi-x'
                />

            </div>
            {isModalOpen && videoKey && <TrailerModal
                videoKey={videoKey}
                onClose={closeTrailer} 
                fetchStatus={movieData.fetchStatus}
            />}
        </>
    )
}

export default MovieCard