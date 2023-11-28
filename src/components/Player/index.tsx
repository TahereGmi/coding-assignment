import React, { FC } from 'react'
import ReactPlayer from 'react-player'
import { VIDEOURL } from '../../constants'

type TPlayerProps = {
  videoKey: string
}

const Player: FC<TPlayerProps> = ({ videoKey }) => {
  return (<ReactPlayer 
    className="video-player" 
    url={`${VIDEOURL}${videoKey}`} 
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />)};

export default Player;