import React, { FC } from 'react';

type TPosterProps ={
    path: string
}

const Poster: FC<TPosterProps> = ({ path }) => {
    return (
        <img 
            className="center-block" 
            src={`https://image.tmdb.org/t/p/w500/${path}`} 
            alt="Movie poster" 
        />
    );
}

export default Poster;