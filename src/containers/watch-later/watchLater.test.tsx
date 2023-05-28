import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import WatchLater from './index';
import { watchedLaterMock } from '../../tests/mock_data';
import watchLaterSlice from '../../data/reducers/watchLaterSlice';
import { renderWithProviders, store } from '../../tests/utils';

describe('WatchLater component', () => {
  const { removeAllWatchLater } = watchLaterSlice.actions;

  test('renders WatchLater component with watch later movies', () => {
    renderWithProviders(<WatchLater />);

    const watchLaterMoviesElement = screen.getByTestId('watch-later-movies');
    expect(watchLaterMoviesElement).toBeInTheDocument();

    const movieElements = screen.getAllByTestId('movie-thumbnail');
    expect(movieElements.length).toBe(watchedLaterMock.length);
  });

  test('calls dispatch with removeAllWatchLater action when clear all button is clicked', () => {
    renderWithProviders(<WatchLater />);

    const clearAllButton = screen.getByText('Empty list');
    fireEvent.click(clearAllButton);

    store.dispatch = jest.fn();
    fireEvent.click(clearAllButton);
    store.dispatch(removeAllWatchLater());
    const state = store.getState();
    expect(state.watchLater.watchLaterMovies).toEqual([]);

  });
});
