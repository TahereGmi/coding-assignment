import React , { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/reducers/watchLaterSlice'
import Movie from './Movie'
import { IMovie } from '../data/types'
import '../styles/starred.scss'

interface WatchLaterProps {
  viewTrailer: (movie: IMovie) => void,
}

const WatchLater: FC<WatchLaterProps> = ({viewTrailer}) => {
    const { watchLaterMovies } = useSelector((state: any) => state.watchLater)
    const { remveAllWatchLater } = watchLaterSlice.actions
    const dispatch = useDispatch()

  return (
    <div className="starred" data-testid="watch-later-div">
      {watchLaterMovies.length > 0 && (<div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="row">
        {watchLaterMovies.map((movie: IMovie) => (
          <Movie 
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer} 
            closeCard={() => console.log('')}
          />
        ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(remveAllWatchLater())}>Empty list</button>
        </footer>
      </div>)}

      {watchLaterMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  )
}

export default WatchLater
