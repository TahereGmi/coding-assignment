import React , { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Movie from './Movie'
import starredSlice from '../data/reducers/starredSlice'
import { IMovie } from '../data/types'
import '../styles/starred.scss'

interface StarredProps {
  viewTrailer: (movie: IMovie) => void,
}
const Starred: FC<StarredProps> = ({viewTrailer}) => {

    const { starredMovies } = useSelector((state: any) => state.starred)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="starred">
      {starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="row">
        {starredMovies.map((movie: IMovie) => (
          <Movie 
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer} 
            closeCard={() => console.log('')}/>
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </footer>
      </div>)}

      {starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default Starred
