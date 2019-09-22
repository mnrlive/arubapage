import React, { Component } from 'react';
import AdSense from 'react-adsense';

export default class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <AdSense.Google
            client='ca-pub-8107944427019798'
            slot='5340644171'
            style={{ display: 'block' }}
            format='auto'
            responsive='true'
        />
        );
    }
}