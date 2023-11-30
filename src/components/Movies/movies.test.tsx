import React from 'react'
import { screen } from '@testing-library/react'
import Movies from './index'
import { moviesMock } from '../../tests/mock_data'
import { renderWithProviders } from '../../tests'

// Mock the infinite scroll hook
jest.mock('../../helpers/UseInfinitScroll', () => jest.fn())

test('renders Movies component with movie list', () => {
  renderWithProviders(<Movies />);

  const movieElements = screen.getAllByRole('article')
  expect(movieElements).toHaveLength(moviesMock.results.length)
  moviesMock.results.forEach((movie, index) => {
    expect(movieElements[index]).toHaveTextContent(movie.title)
  })
})