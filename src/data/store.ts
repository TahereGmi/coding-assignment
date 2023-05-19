import { configureStore } from "@reduxjs/toolkit"
import moviesSlice from './reducers/moviesSlice'
import watchLaterSlice from './reducers/watchLaterSlice'
import starredSlice from './reducers/starredSlice'

const store = configureStore({
    reducer: {
        movieList: moviesSlice.reducer,
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
