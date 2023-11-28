import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../../constants'
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

type TAPIParams = {
  query?: string,
  page?: number,
  type: 'list' | 'search'
};

export const fetchMovies = createAsyncThunk(
  "movie-list",
  async (params: TAPIParams) => {
    const { query = '', page = 1, type } = params;
    let apiUrl
    if (type === 'list') {
      apiUrl = `${ENDPOINT_DISCOVER}&page=${page}`
    } else {
      apiUrl = `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
    }
    const res = await fetch(apiUrl)
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