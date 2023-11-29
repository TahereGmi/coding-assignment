import { createSlice } from '@reduxjs/toolkit'
import { fetchSingleMovie } from '../api/singleMovieApi'
import { FetchStatus } from 'data/types'
import { ISingleMovie } from '../types'

const initialState: ISingleMovie = {
    movieItem: {
        id: 0,
        overview: '',
        poster_path: '',
        release_date: '',
        title: '',
    },
    fetchStatus: FetchStatus.LOADING,
}

const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
            state.movieItem = action.payload
            state.fetchStatus = FetchStatus.SUCCESS
        }).addCase(fetchSingleMovie.pending, (state) => {
            state.fetchStatus = FetchStatus.LOADING
        }).addCase(fetchSingleMovie.rejected, (state) => {
            state.fetchStatus = FetchStatus.ERROR
        })
    }
})

export default singleMovieSlice
