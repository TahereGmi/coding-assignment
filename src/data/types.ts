export interface IStarrMovie {
    id: number, 
    overview: string, 
    release_date: string,
    poster_path: string,
    title:string
}

export interface IStarredList {
    starredMovies: IStarrMovie[];
}

export interface IWatchLaterList {
    watchLaterMovies: IStarrMovie[];
}

interface IVideoTrailer {
    type: string,
    key: string
}

export interface IMovie extends IStarrMovie {
    videos?: { results:  IVideoTrailer[] }
}

export interface ISingleMovie {
    movieItem : IMovie,
    fetchStatus: 'success' | 'loading' | 'error' | ''
}

export interface IMovies {
    movies: {
        page: number,
        results: IMovie[],
        total_pages: number,
        total_results: number
    },
    fetchStatus: 'success' | 'loading' | 'error' | ''
}