import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
import ScrollToTop from 'react-scroll-up';
import Navbar from '../components/Navbar.jsx';
import SecondNavbar from '../components/SecondNavbar.jsx';
import ogs from 'open-graph-scraper';
import Skeleton from 'react-loading-skeleton';
import { MediaPlayer } from '@cassette/player';
import { Sticky, StickyContainer } from 'react-sticky';
import AudioPlayer from 'react-responsive-audio-player';
import _ from 'lodash'
import './Home.css';
import newsServices from '../config/services';
import NewsItem from '../components/NewsItem';
// recently added components | 02-12-2018
import NewsItem2 from '../components/NewsItem2';
import Jumbotron from "../components/Jumbotron";
import NewsItemsContainer from "../components/NewsItemsContainer";
// recently added utils | 02-12-2018
import { imageErrorCheck } from "../utils/imageErrorCheck";
import { playlist } from "../utils/playlist";
import { imageRuba, imageTest, imageBintiCuater } from "../utils/imageFunctions";
import {isEdge} from 'react-device-detect';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            services: {},
            loaded: false
        }
}

addServiceData(key, data) {
    this.setState((state) => ({
        ...state,
        services: {
            ...state.services,
            [key]: data
        }, loaded: true
    }))
    if(key === 'noticiaCla'){
        this.mapOpenGraphImageResults();
    }
}

fetchDataFromServices(){
    const myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    const fetchConfig = {
        method: 'GET',
        headers: myHeaders,
    };
    Object.keys(newsServices).forEach((key) => {
        if(key === 'noticiaCla'){

            try{
                fetch(newsServices[key], fetchConfig).then((response) => response.json()).then((responseJson) => {this.addServiceData(key, responseJson.items)})
            }
            catch (e) {

            }
        }else{
            try{
                fetch(newsServices[key], fetchConfig).then((response) => response.json()).then((responseJson) => { this.addServiceData(key, responseJson)})
            } catch (e) {

            }
        }
    })
}

componentDidMount() {
    this.fetchDataFromServices();
}

mapOpenGraphImageResults = function (url, index) {
    if (this.state.services.noticiaCla && this.state.services.noticiaCla.length > 0) {
        let noticiaCla = _.cloneDeep(this.state.services.noticiaCla);
        let done = _.after(noticiaCla.length, () => {
            this.setState(state => ({
                ...state,
                services: {
                    ...state.services,
                    noticiaCla
                }
            }));
        })
        // eslint-disable-next-line
        noticiaCla.map((cla, index) => {
            const options = { 'url': 'https://wordpressmade.com/' + cla.link }
            ogs(options)
                .then(function (result) {
                    cla.imgUrl = result.data.ogImage.url;
                    done();
                })
                .catch(function (error) {
                    console.log('error:', error);
                })
        })
    }
}


render() {
    // TODO: work this into newsitem2;
    let noticiaCla = this.state.services.noticiaCla && this.state.services.noticiaCla.map((cla, index) => {
        return (
            <NewsItem key={index} index={index} cla={cla} />
        )
    })
    // e arubiano Crawl for images!
    let eArubianoNews = this.state.services.eArubianoNews && this.state.services.eArubianoNews.map((arubiano, index) => {
        return (
           <NewsItem2 
                key={index} 
                index={index} 
                newsSource={arubiano} 
                provider="earubianonews.com" 
                imgFunction={imageRuba(arubiano)}
                renderedContent = {
                    ReactHtmlParser(sanitizeHtml(arubiano.content.rendered, {
                        allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                        allowedAttributes: {
                            'iframe': ['src']
                        },
                        allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                    }))
                }

                 />
        )
    })
    //awe mainta
    let aweMainta = this.state.services.aweMainta && this.state.services.aweMainta.map((mainta, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={mainta} provider="awemainta.com" imgFunction={imageErrorCheck(mainta)} />
        )
    })
    //boletin extra Crawl for images!
    let boletinExtra =  this.state.services.boletinExtra && this.state.services.boletinExtra.map((boletinExtra, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={boletinExtra} provider="boletinextra.com" imgFunction={imageTest(boletinExtra)} />
        )
    })
    //24ora Crawl for images!

    let bintiCuatroOra = this.state.services._24ora && this.state.services._24ora.map((ora, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={ora}
                provider="24ora.com"
                imgFunction={imageBintiCuater(ora)}
                renderedContent={ReactHtmlParser(sanitizeHtml(ora.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i', 'span'],
                                    transformTags: {
                                        'span': function (tagName, attribs) {
                                            return {
                                                tagName: 'span',
                                                text: ' '
                                            };
                                        }
                                    }
                                }))}
            />
        )
    })
    //masnoticia
    let masNoticia = this.state.services.masNoticia && this.state.services.masNoticia.map((masNoticia, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={masNoticia}
                provider="masnoticia.com"
                imgFunction={imageErrorCheck(masNoticia)}
                renderedContent={ReactHtmlParser(sanitizeHtml(masNoticia.content.rendered, {
                                    allowedTags: ['p', 'li', 'iframe', 'i', 'strong'],
                                    allowedAttributes: { 'iframe': ['src'] },
                                    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                                }))}
            />
        )
    })
    //diario
    let diario = this.state.services.diario && this.state.services.diario.map((diario, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={diario} provider="diario.aw" imgFunction={imageErrorCheck(diario)} />
        )
    })
    //aruba native
    let arubaNative = this.state.services.arubaNative && this.state.services.arubaNative.map((arubaNative, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={arubaNative} provider="arubanative.com" imgFunction={imageErrorCheck(arubaNative)} />
        )
    })
    //bon dia aruba
    let bondia = this.state.services.bonDia && this.state.services.bonDia.map((bondia, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={bondia} provider="bondia.com" imgFunction={imageErrorCheck(bondia)} />
        )
    })
    //focus
    let focus = this.state.services.focus && this.state.services.focus.map((focus, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={focus}
                provider="focus.aw"
                imgFunction={imageErrorCheck(focus)}
                renderedContent={ReactHtmlParser(sanitizeHtml(focus.content.rendered, {
                                    allowedTags: ['p', 'li', 'iframe', 'i', 'strong'],
                                    allowedAttributes: { 'iframe': ['src'] },
                                    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                                }))}
            />
        )
    })
    //visit aruba
    let visitAruba = this.state.services.batiBleki && this.state.services.batiBleki.map((visitAruba, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={visitAruba}
                provider="visitaruba.com"
                imgFunction={(!visitAruba._embedded['wp:featuredmedia'] || visitAruba._embedded['wp:featuredmedia'][0].code) ?
                        require('../images/batiBlekiHD.PNG') : visitAruba._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
            />
        )
    })
    //coolaruba
    let coolAruba = this.state.services.coolAruba && this.state.services.coolAruba.map((coolAruba, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={coolAruba}
                provider="coolaruba.com"
                imgFunction={imageErrorCheck(coolAruba)}
                renderedContent={ReactHtmlParser(sanitizeHtml(coolAruba.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}
            />
        )
    })
    // could be mapped over for NewsItemsContainer rendering
    // const newsSources = [arubaNative, masNoticia, noticiaCla, bondia, diario, bintiCuatroOra, boletinExtra, eArubianoNews, aweMainta, focus, visitAruba, coolAruba];

    return (
        <div>
            <Navbar />
            <StickyContainer>
                <Sticky>{({ style }) =>
                    <div className="navZ" style={style}>
                        <SecondNavbar/>
                    </div>}
                </Sticky>
                <main role="main" className="container">
                <Jumbotron />
                <ScrollToTop style={{ "zIndex": '1', bottom: '85px'}} showUnder={160}>
                    <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
                </ScrollToTop>
                <div className="container">
                    {this.state.loaded || <Skeleton count={10} />}
                    <NewsItemsContainer id='ArubaNative' newsSource='ArubaNative.com' newsItems={arubaNative} />
                    <NewsItemsContainer id='MasNoticia' newsSource='MasNoticia.com' newsItems={masNoticia} />
                    <NewsItemsContainer id='NoticiaCla' newsSource='NoticiaCla.com' newsItems={noticiaCla} />
                    <NewsItemsContainer id='BonDia' newsSource='BonDia.com' newsItems={bondia} />
                    <NewsItemsContainer id='Diario' newsSource='Diario.aw' newsItems={diario} />
                    <NewsItemsContainer id='24ora' newsSource='24ora.com' newsItems={bintiCuatroOra} />
                    <NewsItemsContainer id='BoletinExtra' newsSource='BoletinExtra.com' newsItems={boletinExtra} />
                    <NewsItemsContainer id='EarubianoNews' newsSource='EarubianoNews.com' newsItems={eArubianoNews} />
                    <NewsItemsContainer id='AweMainta' newsSource='AweMainta.com' newsItems={aweMainta} />
                    <NewsItemsContainer id='Focus' newsSource='Focus.aw' newsItems={focus} />
                    <NewsItemsContainer id='VisitAruba' newsSource='VisitAruba.com' newsItems={visitAruba} />
                    <NewsItemsContainer id='CoolAruba' newsSource='CoolAruba.com' newsItems={coolAruba} />
                    <div className="bottomText">
                        <p className="lead font-weight-normal">
                        It is with great pleasure that we proudly present to you our solution for the island of <b>Aruba</b> regarding online news.<br /><br />
                        This web app allows you to see all the latest news from all online news providers from the island.
                        Instead of going on news sites one by one or finding out about the news on Facebook or other social media,
                        we created a one page website that gathers all news from all news providers.
                            We are currently displaying the latest 10 news articles from each news provider. <i className="text-muted">#stayinformed</i></p>
                            <div className="text-center text-muted"><p>© 2018 made by:</p><a href="https://sitelift.nl" target="_blank" rel="noopener noreferrer">Site Lift NL</a></div>
                    </div>
                </div>
                </main>
                    <div id="radio">
                        {
                            (isEdge) ?
                         ( <AudioPlayer playlist={playlist} />) : (<MediaPlayer playlist={playlist} controls = {['backskip', 'playpause', 'forwardskip', 'volume', 'progress']}/>)
                        }
                    </div>
            </StickyContainer>
        </div>
    );
}
}
export default Home;