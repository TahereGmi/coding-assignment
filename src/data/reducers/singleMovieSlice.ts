import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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

export const fetchMovie = createAsyncThunk(
    "single-movie",
    async (apiUrl: string) => {
      const res = await fetch(apiUrl);
      return res.json();
    }
);

const singleMovieSlice = createSlice({
    name: 'singleMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovie.fulfilled, (state, action) => {
            state.movieItem = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovie.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovie.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default singleMovieSlice
