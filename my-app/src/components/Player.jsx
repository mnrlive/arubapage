import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCustomAudio } from 'react-soundplayer/addons';
import { PlayButton, VolumeControl} from 'react-soundplayer/components';

class AWSSoundPlayer extends Component {

  render() {
    const { trackTitle } = this.props;

    return (
      <div className="p1 mb3 mt1 flex flex-center bg-darken-1 orange">
      <PlayButton
      className="flex-none h4 button button-transparent button-grow rounded mr2"
      {...this.props} />
      <VolumeControl
           className='flex flex-center mr2'
        buttonClassName="flex-none h4 button button-transparent button-grow rounded"
        {...this.props}
      />
        <h2 className="h5 nowrap caps">{trackTitle}</h2>
      </div>
    );
  }
}


AWSSoundPlayer.propTypes = {
    preloadType: PropTypes.string,
    streamUrl: PropTypes.string.isRequired,
    trackTitle: PropTypes.string.isRequired
};

AWSSoundPlayer.defaultProps = {
    preloadType: 'auto'
};


export default withCustomAudio(AWSSoundPlayer);