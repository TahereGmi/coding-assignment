import React, { FC } from 'react';
import VideoPlayer from 'components/VideoPlayer'
import './trailerModal.scss'

type TTrailerModal = {
    onClose: () => void,
    fetchStatus: string,
    videoKey: string | null
}

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
                        <div className='trailer-modal__text'>No trailer available. Try another movie</div>
                    )}
                </div>}
                <button className='trailer-modal__close-btn' onClick={onClose}>&times;</button>
            </div>
        </div>
    );
}

export default TrailerModal;
