import React from 'react';
import AudioPlayer from 'react-responsive-audio-player';
import { playlist } from "../../utils/playlist";
import { isEdge } from 'react-device-detect';
import { MediaPlayer } from '@cassette/player';

const Footer = () => {
  return (
    <div id="radio">
      {
          (isEdge) ?
        ( <AudioPlayer playlist={playlist} />) : (<MediaPlayer playlist={playlist} controls = {['backskip', 'playpause', 'forwardskip', 'volume', 'progress']}/>)
      }
    </div>
  );
};

export default Footer;