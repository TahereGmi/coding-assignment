import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { render, RenderResult, RenderOptions } from '@testing-library/react';
import { IMovies, ISingleMovie } from '../data/types';
import moviesReducer from '../data/reducers/moviesSlice';
import watchLaterReducer from '../data/reducers/watchLaterSlice';
import starredReducer from '../data/reducers/starredSlice';
import singleMovieReducer from '../data/reducers/singleMovieSlice';
import { RootState } from '../data/store';
import { moviesMock, starredListMock, watchedLaterMock } from '../tests/mock_data';

const moviesData: IMovies = {
  movies: moviesMock,
  fetchStatus: '',
};

const singleMovieMock: ISingleMovie = {
  movieItem: starredListMock[0],
  fetchStatus: '',
};

const initialState: RootState = {
  movieList: moviesData,
  starred: { starredMovies: starredListMock },
  watchLater: { watchLaterMovies: watchedLaterMock },
  singleMovie: singleMovieMock,
};

const store: EnhancedStore<RootState> = configureStore({
  reducer: {
    movieList: moviesReducer.reducer,
    singleMovie: singleMovieReducer.reducer,
    starred: starredReducer.reducer,
    watchLater: watchLaterReducer.reducer,
  },
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
