import React, { FC } from 'react';
import VideoPlayer from 'components/VideoPlayer';

import words from 'translation/data_words.json';
import Button from 'components/Button';
import './trailerModal.scss';

type TTrailerModal = {
    onClose: () => void,
    fetchStatus: string,
    videoKey: string | null
};

const TrailerModal: FC<TTrailerModal> = ({ 
    onClose, 
    fetchStatus, 
    videoKey 
}) => {
    return (
        <div className='trailer-modal'>
            <div className='trailer-modal__content'>
                {fetchStatus === 'loading' && <div>Loading...</div>}
                {fetchStatus === 'success' && <div className='trailer-modal__player'>
                    {videoKey ? (
                        <VideoPlayer
                            videoKey={videoKey}
                        />
                    ) : (
                        <div className='trailer-modal__text'>{words.noTrailer}</div>
                    )}
                </div>}
                <Button
                    classList='trailer-modal__close-btn'
                    icon='bi-x'
                    onClick={onClose}
                />
            </div>
        </div>
    );
}

export default TrailerModal;
