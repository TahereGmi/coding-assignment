import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENDPOINT_DISCOVER } from '../../constants'
import { RootState } from "../store";
import { IMovies } from "../types";

const initialState: IMovies = {
  movies: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  fetchStatus: "",
};

export const fetchMoviesByPage = createAsyncThunk(
  "movie-list",
  async (page: number) => {
    const res = await fetch(`${ENDPOINT_DISCOVER}&page=${page}`);
    return res.json();
  }
);

export const fetchMovies = createAsyncThunk(
  "movie-list/all",
  async (apiUrl: string) => {
    const res = await fetch(apiUrl);
    return res.json();
  }
);

const moviesSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByPage.fulfilled, (state, action) => {
        state.movies = {
          ...state.movies,
          ...action.payload,
          results: [...state.movies.results, ...action.payload.results],
        };
        state.fetchStatus = "success";
      })
      .addCase(fetchMoviesByPage.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMoviesByPage.rejected, (state) => {
        state.fetchStatus = "error";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const movieList = (state: RootState) => state.movieList;
export default moviesSlice;
