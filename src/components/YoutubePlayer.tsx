import React, { FC } from 'react';
import ReactPlayer from 'react-player'

interface IYouTubePlayerProps {
  videoKey: string
}

const YoutubePlayer: FC<IYouTubePlayerProps> = ({ videoKey }) => (<ReactPlayer 
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;