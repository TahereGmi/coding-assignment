import React, { FC } from 'react';
import YoutubePlayer from './YoutubePlayer'
import '../styles/trailerModal.scss'

interface ITrailerModal {
    onClose: () => void,
    fetchStatus: string,
    videoKey: string | null
}

const TrailerModal: FC<ITrailerModal> = ({ 
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
                        <YoutubePlayer
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
