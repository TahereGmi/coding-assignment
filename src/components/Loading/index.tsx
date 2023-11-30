import React, { FC } from 'react';
import words from 'translation/data_words.json'

const Loading: FC = () => {
    return (
        <div className='loading-spinner'>{words.loading} ....</div>
    );
}

export default Loading;