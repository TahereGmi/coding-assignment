import { createSlice } from "@reduxjs/toolkit"
import { fetchSingleMovie } from '../api/singleMovieApi'
import { ISingleMovie } from "../types"

const initialState: ISingleMovie = {
    movieItem: {
        id: 0,
        overview: '',
        poster_path: '',
        release_date: '',
        title: '',
    },
    fetchStatus: '',
}

const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
            state.movieItem = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchSingleMovie.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchSingleMovie.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default singleMovieSlice
