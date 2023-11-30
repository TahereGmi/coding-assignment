import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../../constants'

enum APIType {
    List = 'list',
    Search = 'search',
}

type TAPIParams = {
    query?: string,
    page?: number,
    type: 'list' | 'search'
}
  
const fetchApi = async (params: TAPIParams) => {
    const { query = '', page = 1, type } = params
    const apiUrl = type === APIType.List 
                   ? `${ENDPOINT_DISCOVER}&page=${page}` 
                   : `${ENDPOINT_SEARCH}&query=${query}&page=${page}`
    const res = await fetch(apiUrl)
    if (!res.ok) {
      const errorMsg = res.status === 404 ? "Movies not found" : "Failed to fetch movies"
      throw new Error(errorMsg)
    }
    return res.json()
}

export const fetchMovies = createAsyncThunk(
    "movie-list/fetchMovies",
    fetchApi
)