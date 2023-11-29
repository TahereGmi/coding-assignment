import React, { FC } from 'react';
import notFoundImage from '../../../src/assets/images/not-found-500X750-optimized.jpeg';

type TPosterProps ={
    path?: string
}

const Poster: FC<TPosterProps> = ({ path }) => {
    return (
        <img 
            className="center-block" 
            src={`${path ? `https://image.tmdb.org/t/p/w500/${path}` : notFoundImage}`} 
            alt="Movie poster" 
        />
    );
}

export default Poster;