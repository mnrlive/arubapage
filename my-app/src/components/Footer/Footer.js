import React from 'react';
import AudioPlayer from 'react-responsive-audio-player';
import { playlist } from "../../utils/playlist";

const Footer = () => {
  return (
    <div id="radio">
      <AudioPlayer playlist={playlist} />
    </div>
  );
};

export default Footer;