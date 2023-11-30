import { createAsyncThunk } from "@reduxjs/toolkit"
import { ENDPOINT, API_KEY } from '../../constants'

const fetchApi = async (id: number) => {
    const apiUrl = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    const res = await fetch(apiUrl)
    if (!res.ok) {
      const errorMsg = res.status === 404 ? "Movie not found" : "Failed to fetch movie"
      throw new Error(errorMsg)
    }
    return res.json()
}

export const fetchSingleMovie = createAsyncThunk(
    "single-movie/fetchMovie",
    fetchApi
)