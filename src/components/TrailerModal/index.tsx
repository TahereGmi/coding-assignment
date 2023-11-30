import React, { FC } from 'react';
import VideoPlayer from 'components/VideoPlayer';

import words from 'translation/data_words.json';
import { FetchStatus } from 'data/types';
import Button from 'components/Button';
import Loading from 'components/Loading';
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
                {fetchStatus === FetchStatus.LOADING && <Loading />}
                {fetchStatus === FetchStatus.SUCCESS && <div className='trailer-modal__player'>
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
