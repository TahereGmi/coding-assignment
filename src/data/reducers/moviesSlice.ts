import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from '../api/moviesApi';
import { FetchStatus } from 'data/types';
import { IMovies } from '../types';

const initialState: IMovies = {
  movies: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  fetchStatus: FetchStatus.LOADING,
}

const moviesSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        return {
          ...state,
          movies: {
            ...state.movies,
            ...action.payload,
            results: [...state.movies.results, ...action.payload.results],
          },
          fetchStatus: FetchStatus.SUCCESS,
        };
      })
      .addCase(fetchMovies.pending, (state) => {
        return { ...state, fetchStatus: FetchStatus.LOADING };
      })
      .addCase(fetchMovies.rejected, (state) => {
        return { ...state, fetchStatus: FetchStatus.ERROR };
      });
  },
});

export default moviesSlice;