import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovies } from "../types";

const initialState: IMovies = {
  movies: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  fetchStatus: "",
}

interface IAPIParams {
  apiUrl: string,
  page?: number
}

export const fetchMovies = createAsyncThunk(
  "movie-list",
  async (params: IAPIParams) => {
    const url = params.page ? `${params.apiUrl}&page=${params.page}` : `${params.apiUrl}`
    const res = await fetch(url)
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Movies not found");
      } else {
        throw new Error("Failed to fetch movies");
      }
    }
    return res.json();
}
);

const moviesSlice = createSlice({
name: "movieList",
initialState,
reducers: {},
extraReducers: (builder) => {
  builder
    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = {
        ...state.movies,
        ...action.payload,
        results: [...state.movies.results, ...action.payload.results],
      };
      state.fetchStatus = "success"
    })
    .addCase(fetchMovies.pending, (state) => {
      state.fetchStatus = "loading"
    })
    .addCase(fetchMovies.rejected, (state) => {
      state.fetchStatus = "error"
    })
},
});

export default moviesSlice;