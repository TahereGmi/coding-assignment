import React, { FC, useCallback, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom"

import type { AppDispatch, RootState } from "data/store"
import { fetchMovies } from 'data/api/moviesApi'
import words from 'translation/data_words.json'
import Icon from "components/Icon"
import './header.scss'
import Typography from "components/Typography"

const Header: FC = () => {
  const movieData = useSelector((state: RootState) => ({
    starredMovies: state.starred.starredMovies,
    watchLaterMovies: state.watchLaterMovie.watchLaterMovies,
  }));

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') as string

  const fetchMoviesSearch = useCallback(() => {
    dispatch(fetchMovies({ query: searchQuery, type: 'search'}));
  }, [dispatch, searchQuery]);

  const getSearchResults = (query: string) => {
    if (query !== '') {
      dispatch(fetchMovies({ query, type: 'search' }));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies({ type: 'search' }));
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

  useEffect(() => {
    if (searchQuery?.length > 0) {
      fetchMoviesSearch();
    }
  }, [fetchMoviesSearch, searchQuery])

  return (
    <header data-testid="header">
      <Link to="/" data-testid="home" onClick={clearSearch}>
        <Icon classList="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {movieData.starredMovies.length > 0 ? (
            <>
              <Icon classList="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{movieData.starredMovies.length}</sup>
            </>
          ) : (
            <Icon classList="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-watchLater">
          {movieData.watchLaterMovies.length > 0 ? (
            <>
              <Typography.Body size='1' className='watch-later'>{words.watch_later}</Typography.Body>
              <sup className="watch-number">{movieData.watchLaterMovies.length}</sup>
            </>
          ) : (
            <Typography.Body size='1'>{words.watch_later}</Typography.Body>
          )}
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

