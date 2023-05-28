import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../tests/utils';
import App from './App';

test('renders Movies component when on home route', async () => {
  renderWithProviders(<App />);
  const movieElement = await screen.findByTestId('movies');
  expect(movieElement).toBeInTheDocument();
});

test('renders Starred component when on /starred route', async () => {
  renderWithProviders(<App />, {}, '/starred');

  const starredElement = await screen.findByTestId('starred');
  expect(starredElement).toBeInTheDocument();
});

test('renders Watch-later component when on /watch-later route', async () => {
  renderWithProviders(<App />, {}, '/watch-later');

  const watchLaterElement = await screen.findByTestId('watch-later');
  expect(watchLaterElement).toBeInTheDocument();
});
