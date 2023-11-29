import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, EnhancedStore, combineReducers, CombinedState } from '@reduxjs/toolkit';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { IMovies, ISingleMovie, IStarredList, IWatchLaterList } from '../data/types';
import moviesSlice from '../data/reducers/moviesSlice';
import watchLaterMovieSlice from '../data/reducers/watchLaterMovieSlice';
import starredSlice from '../data/reducers/starredSlice';
import singleMovieSlice from '../data/reducers/singleMovieSlice';
import { moviesMock, starredListMock, watchedLaterMock } from './mock_data';

const moviesData: IMovies = {
  movies: moviesMock,
  fetchStatus: '',
};

const singleMovieMock: ISingleMovie = {
  movieItem: starredListMock[0],
  fetchStatus: '',
};

const rootReducer = combineReducers({
  movieList: moviesSlice.reducer,
  watchLaterMovie: watchLaterMovieSlice.reducer,
  singleMovie: singleMovieSlice.reducer,
  starred: starredSlice.reducer,
});

export type RootState = CombinedState<{
  movieList: IMovies;
  watchLaterMovie: IWatchLaterList;
  singleMovie: ISingleMovie;
  starred: IStarredList;
}>;

const initialState: RootState = {
  movieList: moviesData,
  starred: { starredMovies: starredListMock },
  watchLaterMovie: { watchLaterMovies: watchedLaterMock },
  singleMovie: singleMovieMock,
};

const store: EnhancedStore<RootState> = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
  initialRoute = '/',
): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        {ui}
      </MemoryRouter>
    </Provider>,
    options,
);

export { store, renderWithProviders };
