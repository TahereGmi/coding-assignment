import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { ISingleMovie } from "../types"

const initialState: ISingleMovie = {
    movieItem: {
        adult: false,
        backdrop_path: '',
        genre_ids:  null,
        id: 0,
        original_language: '',
        original_title: '',
        overview: '',
        poster_path: '',
        release_date: '',
        title: '',
        video: false,
        vote_average: 0,
        vote_count: 0
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

export const singleMovie = (state: RootState) => state.singleMovie
export default singleMovieSlice
