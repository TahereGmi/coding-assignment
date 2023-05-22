import React, { FC, useCallback, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from "../data/store"
import { IStarredList } from "../data/types"
import { fetchMovies } from '../data/reducers/moviesSlice'
import { starredList } from '../data/reducers/starredSlice'
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { ENDPOINT_SEARCH } from '../constants'
import words from '../translation/data_words.json'
import Icon from "./Icon"
import '../styles/header.scss'

const Header: FC = () => {
  const { starredMovies } = useSelector(starredList) as IStarredList
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') as string

  const fetchMoviesSearch = useCallback(() => {
    dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=` + searchQuery, page: 1 }));
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      fetchMoviesSearch();
    }
  }, [fetchMoviesSearch, searchQuery]);

  const getSearchResults = (query: string) => {
    if (query !== '') {
      dispatch(fetchMovies({ apiUrl: `${ENDPOINT_SEARCH}&query=` + query }));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      setSearchParams();
    }
  }

  const searchMovies = (e: React.KeyboardEvent<HTMLInputElement>) => {
    navigate('/')
    getSearchResults(e.currentTarget.value)
  }

  const clearSearch = () => {
    getSearchResults('')
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={clearSearch}>
        <Icon classList="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <Icon classList="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <Icon classList="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          {words.watch_later}
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={clearSearch} className="search-link" >
          <input type="search" data-testid="search-movies"
            onKeyUp={searchMovies}
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

