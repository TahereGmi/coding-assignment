import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Movies from './index'
import moviesReducer from '../../data/reducers/moviesSlice'
import watchLaterReducer from '../../data/reducers/watchLaterSlice'
import starredReducer from '../../data/reducers/starredSlice'
import singleMovieReducer from '../../data/reducers/singleMovieSlice'
import { moviesMock } from '../../tests/movies.mock'
import { IMovies } from '../../data/types'

// Mock the infinite scroll hook
jest.mock('../../helpers/UseInfinitScroll', () => jest.fn())

const moviesData : IMovies = {
    movies: moviesMock,
    fetchStatus: '',
}
const initialState = {
    movieList: moviesData,
}

const store = configureStore({
    reducer: {
        movieList: moviesReducer.reducer,
        singleMovie: singleMovieReducer.reducer,
        starred: starredReducer.reducer,
        watchLater: watchLaterReducer.reducer,
    },
    preloadedState: initialState,
})

test('renders Movies component with movie list', () => {
    render(
        <Provider store={store}>
        <Movies />
        </Provider>
    )

    const movieElements = screen.getAllByRole('article')
    expect(movieElements).toHaveLength(moviesMock.results.length)
    moviesMock.results.forEach((movie, index) => {
        expect(movieElements[index]).toHaveTextContent(movie.title)
    })
})