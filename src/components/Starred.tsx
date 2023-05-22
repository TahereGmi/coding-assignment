import React , { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Movie from './Movie'
import starredSlice from '../data/reducers/starredSlice'
import { IMovie } from '../data/types'
import Icon from './Icon'
import words from '../translation/data_words.json'
import '../styles/starred.scss'

const Starred: FC = () => {

    const { starredMovies } = useSelector((state: any) => state.starred)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="wrapper">
        {starredMovies.map((movie: IMovie) => (
          <Movie 
            movie={movie}
            key={movie.id}
          />
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>{words.removeAllStarred}</button>
        </footer>
      </div>)}

      {starredMovies.length === 0 && (<div className="text-center empty-cart">
        <Icon classList="bi bi-star" />
        <p>{words.noStarredMovie}</p>
        <p>{words.goTo}<Link to='/'>{words.home}</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
