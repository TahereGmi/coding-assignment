import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ENDPOINT, API_KEY } from '../../constants'
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
    async (id: number) => {
        const apiUrl = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
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
