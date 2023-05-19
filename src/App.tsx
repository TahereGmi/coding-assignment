import React, { FC } from 'react'
import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from "./data/store";
import 'reactjs-popup/dist/index.css'
import { fetchMovies, movieList } from './data/reducers/moviesSlice'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import { IMovie, IMovies } from './data/types'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import './app.scss'

const App: FC = () => {

  const { movies, fetchStatus } = useSelector(movieList) as IMovies
  const dispatch = useDispatch<AppDispatch>()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState<number | null>(null)
  const [isOpen, setOpen] = useState(false)
  const navigate = useNavigate()

useEffect(() => {
  (() => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  })()
}, [dispatch])
  
  // const closeModal = () => setOpen(false)
  
  const closeCard = () => {

  }

  const getSearchResults = (query: string) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  }

  const searchMovies = (query: string) => {
    navigate('/')
    getSearchResults(query)
  }

  // const getMovies = () => {
  //   if (searchQuery) {
  //       dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
  //   } else {
  //       dispatch(fetchMovies(ENDPOINT_DISCOVER))
  //   }
  // }

  const viewTrailer = (movie: IMovie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id: number) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid: any) => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          <div style={{padding: "30px"}}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          <Route path="/" element={<Movies movies={{ movies, fetchStatus }} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

