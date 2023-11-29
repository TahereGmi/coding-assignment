import React, { FC, useCallback } from 'react';
import Movie from 'components/MovieCard';
import { useSelector, useDispatch } from 'react-redux';

import type { AppDispatch, RootState } from "data/store";
import { fetchMovies } from 'data/api/moviesApi';
import useInfiniteScroll from '../../utils/useInfinitScroll';
import { useEffectOnce } from '../../utils/useEffectOnce';
import words from 'translation/data_words.json';
import './movies.scss';

const Movies: FC = () => {
    const { movies, fetchStatus } = useSelector((state: RootState) => state.movieList);
    const dispatch = useDispatch<AppDispatch>();

    const loadMoreMovies = useCallback((page: number) => {
        dispatch(fetchMovies({ page, type: 'list' }));
    }, [dispatch]);

    useInfiniteScroll(loadMoreMovies);

    useEffectOnce(() => {
        dispatch(fetchMovies({ type: 'list' }));
    });

    const renderMovies = () => (
        movies?.results?.map(movie => (
            <Movie 
                movie={movie} 
                key={movie.id}
            />
        ))
    );

    return (
        <div data-testid="movies" className='wrapper'>
            {renderMovies()}
            {fetchStatus === 'loading' && <div className='loading'>{words.loading}</div>}
        </div>
    );
};

export default Movies;
