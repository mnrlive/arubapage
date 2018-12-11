import React, { Component } from 'react';
import moment from 'moment';
import AboutJumbotron from './AboutJumbotron';
import AboutContent from './AboutContent';
import NewsCard from '../common/NewsItem/NewsCard';
import './about.css'
// TODO: Finish this refactor
// import { fetchDataFromSocialMedia } from './fetchDataFromSocialMedia';

class About extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            boletins: [],
            instagrams: [],
            twitters:[],
        }
    }

    componentDidMount() {
        // TODO: Finish this refactor
       // fetchDataFromSocialMedia()
       Promise.all([
        fetch('https://sitelift.nl/wp-json/wp/v2/posts?_embed')
            .then((response) => response.json())
            .then(response => {
                this.setState({
                    boletins: response,
                    loaded: true
                })
            }),
        fetch('https://wordpressmade.com/https://publish.twitter.com/oembed?url=https://twitter.com/arubapage/status/977901243275403265')
            .then((response) => response.json())
            .then(response => {
                this.setState({
                    twitters: [response],
                    loaded: true
                })
            }),
        fetch('https://api.instagram.com/oembed/?url=http://instagr.am/p/Bgoyxryg-eD/')
            .then((response) => response.json())
            .then(response => {
                this.setState({
                    instagrams: [response],
                    loaded: true
                })
            })
        ]);
    }

    render() {
        let boletins = this.state.boletins.map((boletin, index) => {
            return (
                <div className="col-md-4" key={index}>
                    <NewsCard
                        image={boletin._embedded['wp:featuredmedia'][0].source_url}
                        title={boletin.title.rendered}
                        date={moment(boletin.date).format('L')}
                        excerpt={{__html: 'It’s finally here, Aruba page dot com! It is with great pleasure that we proudly present to you our solution for the island of Aruba regarding online news. This web app allows you to see all the latest news.'}}
                        target={boletin.link}
                        provider='sitelift.nl'
                        type={'socialMedia'}
                    />
                </div>
            )
        })
        let instagrams = this.state.instagrams.map((instagram, index) => {
            return (
                <div className="col-md-4" key={index}>
                    <NewsCard
                        image={instagram.thumbnail_url}
                        excerpt={{__html: instagram.title}}
                        target={instagram.author_url}
                        provider='@arubapage'
                        type={'socialMedia'}
                    />
                </div>
            )
        })
        let twitters = this.state.twitters.map((twitter, index) => {
            return (
                <div className="col-md-4" key={index}>
                    <NewsCard
                        image={require('../../images/twitterPage.PNG')}
                        excerpt={{ __html: twitter.html }}
                        target={twitter.author_url}
                        provider='@arubapage'
                        type={'socialMedia'}
                    />
                </div>
            )
        })
        return (
            <div>
                <AboutJumbotron />
                <AboutContent
                    loaded={this.state.loaded}
                    boletins={boletins}
                    instagrams={instagrams}
                    twitters={twitters}
                />
            </div>
        );
    }
}

export default About;