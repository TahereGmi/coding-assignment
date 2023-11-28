export interface ISelectedMovie {
    id: number, 
    overview: string, 
    release_date: string,
    poster_path: string,
    title:string
}

export interface IStarredList {
    starredMovies: ISelectedMovie[];
}

export interface IWatchLaterList {
    watchLaterMovies: ISelectedMovie[];
}

interface IVideoTrailer {
    type: string,
    key: string
}

export interface IMovie extends ISelectedMovie {
    videos?: { results:  IVideoTrailer[] }
}

export interface ISingleMovie {
    movieItem : IMovie,
    fetchStatus: TFetchStatus,
}

export type TFetchStatus = '' | 'success' | 'loading' | 'error';

export interface IMovies {
    movies: {
        page: number,
        results: IMovie[],
        total_pages: number,
        total_results: number
    },
    fetchStatus: TFetchStatus,
}