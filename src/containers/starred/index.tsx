import React , { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Movie from 'components/Movie'
import starredSlice from 'data/reducers/starredSlice'
import ListFooter from 'components/ListFooter'
import { IMovie } from 'data/types'
import words from 'translation/data_words.json'
import EmptyState from 'components/EmptyState'

const Starred: FC = () => {

    const { starredMovies } = useSelector((state: any) => state.starred)
    const { clearAllStarred } = starredSlice.actions
    const dispatch = useDispatch()

    const hanleClearAllStarrs = () => {
      dispatch(clearAllStarred())
    }

  return (
    <div data-testid="starred" className="starred">
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
        <ListFooter 
          onClick={hanleClearAllStarrs}
          buttonText={words.removeAllStarred}
        />
      </div>)}
      <EmptyState
        show={starredMovies.length === 0}
        iconName='star'
        emptyText={words.noStarredMovie}
      />
    </div>
  )
}

export default Starred
