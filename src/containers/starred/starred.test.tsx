import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Starred from './index';
import starredSlice from 'data/reducers/starredSlice';
import { starredListMock } from '../../tests/mock_data';
import { IStarrMovie } from '../../data/types';
import { renderWithProviders, store } from '../../tests/utils';

describe('Starred component', () => {
  const { clearAllStarred } = starredSlice.actions;
  test('renders Starred component with starred movies', () => {
    const starredMovies: IStarrMovie[] = starredListMock;
    renderWithProviders(<Starred />);

    const starredMoviesElement = screen.getByTestId('starred-movies');
    expect(starredMoviesElement).toBeInTheDocument();

    const movieElements = screen.getAllByTestId('movie-thumbnail');
    expect(movieElements.length).toBe(starredMovies.length);
  });

  test('calls dispatch with clearAllStarred action when clear all button is clicked', () => {
    renderWithProviders(<Starred />);
  
    const clearAllButton = screen.getByText('Remove all starred');
    fireEvent.click(clearAllButton);

    store.dispatch = jest.fn();
    store.dispatch(clearAllStarred());
    const state = store.getState();
    expect(state.starred.starredMovies).toEqual([]);
  });
});
