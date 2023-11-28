import React, { FC } from 'react'
import ReactPlayer from 'react-player'
import { VIDEOURL } from '../../constants'

type TVideoPlayer = {
  videoKey: string
}

const VideoPlayer: FC<TVideoPlayer> = ({ videoKey }) => {
  return (<ReactPlayer 
    className="video-player" 
    url={`${VIDEOURL}${videoKey}`} 
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />)};

export default VideoPlayer;