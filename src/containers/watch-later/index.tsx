import React , { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import watchLaterMovieReducer from '../../data/reducers/watchLaterMovieSlice'
import Movie from '../../components/MovieCard'
import { IMovie } from '../../data/types'
import words from '../../translation/data_words.json'
import ListFooter from '../../components/ListFooter'
import EmptyState from '../../components/EmptyState'

const WatchLater: FC = () => {
    const { watchLaterMovies } = useSelector((state: any) => state.watchLaterMovie)
    const { removeAllWatchLater } = watchLaterMovieReducer.actions
    const dispatch = useDispatch()

    const hanleClearAllWatchLater = () => {
      dispatch(removeAllWatchLater())
    }

  return (
    <div className="starred" data-testid="watch-later">
      {watchLaterMovies.length > 0 && (
      <div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="wrapper">
        {watchLaterMovies.map((movie: IMovie) => (
          <Movie 
            movie={movie}
            key={movie.id}
          />
        ))}
        </div>
        <ListFooter 
          onClick={hanleClearAllWatchLater}
          buttonText={words.emptyList}
        />
      </div>)}
      <EmptyState
        show={watchLaterMovies.length === 0 }
        iconName='heart'
        emptyText={words.noWatchLaterMovie}
      />
    </div>
  )
}

export default WatchLater
