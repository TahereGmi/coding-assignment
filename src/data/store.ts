import { configureStore } from "@reduxjs/toolkit"
import moviesSlice from './reducers/moviesSlice'
import watchLaterMovieSlice from './reducers/watchLaterMovieSlice'
import starredSlice from './reducers/starredSlice'
import singleMovieSlice from "./reducers/singleMovieSlice"

const store = configureStore({
    reducer: {
        movieList: moviesSlice.reducer,
        singleMovie: singleMovieSlice.reducer,
        starred: starredSlice.reducer,
        watchLaterMovie: watchLaterMovieSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
