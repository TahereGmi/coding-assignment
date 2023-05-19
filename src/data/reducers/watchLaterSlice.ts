import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IWatchLaterList } from "../types"

const initialState: IWatchLaterList = {
    watchLaterMovies: []
}

const watchLaterSlice = createSlice({
    name: 'watch-later',
    initialState,
    reducers: {
        addToWatchLater: (state, action) => {
            state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
        },
        removeFromWatchLater: (state, action) => {
            const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)
            state.watchLaterMovies.splice(indexOfId, 1)
        },
        remveAllWatchLater: (state) => {
            state.watchLaterMovies = []
        },
    },
})

export const watchLaterList = (state: RootState) => state.watchLater

export default watchLaterSlice
