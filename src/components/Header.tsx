import React, { FC, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from "../data/store"
import { IStarredList } from "../data/types"
import { fetchMovies } from '../data/reducers/moviesSlice'
import { starredList } from '../data/reducers/starredSlice'
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import '../styles/header.scss'

const Header: FC = () => {
  const { starredMovies } = useSelector(starredList) as IStarredList
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') as string
  

  useEffect(() => {
    (() => {
      if (searchQuery?.length > 2) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=`+searchQuery))
      }
    })()
  }, [dispatch, searchQuery])

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

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={() => searchMovies('')} className="search-link" >
          <input type="search" data-testid="search-movies"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => searchMovies(e.currentTarget.value)}
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header

