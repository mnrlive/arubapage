import React, { Component } from 'react';
import AdSense from 'react-adsense';

class AdBanner extends Component {

    render() {
        const style = {
			display: 'block',
		};
        return (
            <AdSense.Google
            client='ca-pub-8107944427019798'
            slot={this.props.slot}
            style={style}
            format='auto'
            responsive='true'
        />
        );
    }
}

export default AdBanner;