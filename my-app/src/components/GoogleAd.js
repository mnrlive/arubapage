import React, { Component } from 'react';
export default class GoogleAd extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className='adsbygoogle'
                style={{ display: "block"}}
                data-ad-client="ca-pub-8107944427019798"
                data-ad-slot="3825049427"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        );
    }
}