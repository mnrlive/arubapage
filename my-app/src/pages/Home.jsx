import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import ScrollToTop from 'react-scroll-up';
import Navbar from '../components/Navbar.jsx';
import SecondNavbar from '../components/SecondNavbar.jsx';
import videojs from 'video.js';
import ogs from 'open-graph-scraper';
import Skeleton from 'react-loading-skeleton';
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor';
import AudioPlayer from 'react-responsive-audio-player';
import { Sticky, StickyContainer } from 'react-sticky';
import _ from 'lodash'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
} from 'react-share';
import './Home.css';
import newsServices from '../config/services';
import NewsItem from '../components/NewsItem';

import {
    isChrome,
    browserName,
    isAndroid,
    isFirefox
} from 'react-device-detect';
import NewsCard from "../components/NewsCard";
import NewsModal from "../components/NewsModal";
import NewsItem2 from '../components/NewsItem2';
import { imageErrorCheck } from "../utils/imageErrorCheck";
import { playlist } from "../utils/playlist";
import { imageRuba, imageTest } from "../utils/imageFunctions";

  const Browser = browserName;
const renderContent = () => {
  if (((isChrome || isFirefox) && !isAndroid)) {
        return 'https://wordpressmade.com/http://cdn.setar.aw:1935/Telearuba/smil:telearuba.smil/playlist.m3u8';
    }else if((Browser === 'Facebook' && isChrome)){
      return 'https://wordpressmade.com/http://cdn.setar.aw:1935/Telearuba/smil:telearuba.smil/playlist.m3u8';
    }else{
        return 'http://cdn.setar.aw:1935/Telearuba/smil:telearuba.smil/playlist.m3u8';
    }
}

// eslint-disable-next-line
const regex = /^(.*[\\\/])(.*)\.[^.]+$/;
let defaultVolume = 0.2;

const videoOptions = {
    autoplay: false,
    controls: true,
    preload: true,
    fluid: true,
    poster: require('../images/TeleArubaGrey.png'),
    overrideNative: true,
    sources: [{
               src: renderContent(),
               type: 'application/x-mpegURL'
          }]
}

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
    configureAnchors({offset: -150, scrollDuration: 200});
    this.fetchDataFromServices();
        this.player = videojs(this.videoNode, videoOptions, function onPlayerReady() {
            console.log('onPlayerReady', this);
            this.volume(defaultVolume);
        });
}


  // destroy player on unmount
  componentWillUnmount() {
      if (this.player) {
          this.player.dispose()
      }
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
    //Noticia cla with example on how to refactor to use a news item component
    let clas = this.state.services.noticiaCla && this.state.services.noticiaCla.map((cla, index) => {
        return (
            <NewsItem key={index} index={index} cla={cla} />
        )
    })
    // e arubiano Crawl for images!
    let arubianos = this.state.services.eArubianoNews && this.state.services.eArubianoNews.map((arubiano, index) => {
        return (
           <NewsItem2 key={index} index={index} newsSource={arubiano} provider="earubianonews.com" imgFunction={imageRuba(arubiano)} />
        )
    })
    //awe mainta
    let maintas = this.state.services.aweMainta && this.state.services.aweMainta.map((mainta, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={mainta} provider="awemainta.com" imgFunction={imageErrorCheck(mainta)} />
        )
    })
    //boletin extra Crawl for images!
    let boletins =  this.state.services.boletinExtra && this.state.services.boletinExtra.map((boletinExtra, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={boletinExtra} provider="boletinextra.com" imgFunction={imageTest(boletinExtra)} />
        )
    })
    //24ora Crawl for images!
    let oras = this.state.services._24ora && this.state.services._24ora.map((ora, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={ora}
                provider="24ora.com"
                imgFunction={imageErrorCheck(ora)}
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
    let posts = this.state.services.masNoticia && this.state.services.masNoticia.map((masNoticia, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={masNoticia}
                provider="masnoticia.com"
                imgFunction={imageErrorCheck(masNoticia)}
                renderedContent={ReactHtmlParser(sanitizeHtml(masNoticia.content.rendered, {
                                    allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                                    allowedAttributes: { 'iframe': ['src'] },
                                    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                                }))}
            />
        )
    })
    //diario
    let news = this.state.services.diario && this.state.services.diario.map((diario, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={diario} provider="diario.aw" imgFunction={imageErrorCheck(diario)} />
        )
    })
    //aruba native
    let natifes = this.state.services.arubaNative && this.state.services.arubaNative.map((arubaNative, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={arubaNative} provider="arubanative.com" imgFunction={imageErrorCheck(arubaNative)} />
        )
    })
    //bon dia aruba
    let bondias = this.state.services.bonDia && this.state.services.bonDia.map((bondia, index) => {
        return (
            <NewsItem2 key={index} index={index} newsSource={bondia} provider="bondia.com" imgFunction={imageErrorCheck(bondia)} />
        )
    })
    //focus
    let focuses = this.state.services.focus && this.state.services.focus.map((focus, index) => {
        return (
            <NewsItem2
                key={index}
                index={index}
                newsSource={focus}
                provider="focus.aw"
                imgFunction={imageErrorCheck(focus)}
                renderedContent={ReactHtmlParser(sanitizeHtml(focus.content.rendered, {
                                    allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                                    allowedAttributes: { 'iframe': ['src'] },
                                    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                                }))}
            />
        )
    })
    //visit aruba
    let blekis = this.state.services.batiBleki && this.state.services.batiBleki.map((visitAruba, index) => {
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
    let radios = this.state.services.coolAruba && this.state.services.coolAruba.map((coolAruba, index) => {
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

    return (
        <div>
            <Navbar />
            <StickyContainer>

            <Sticky>{({ style }) => <div className="navZ" style={style}>
                    <SecondNavbar/>
            </div>}</Sticky>
            <main role="main" className="container">
            <div className="jumbotron">
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">Welcome to Aruba Page</h1>
                        <p className="lead text-muted">One Happy Island, One well informed Aruban</p>
                        <p>
                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Click to watch Tele Aruba live!
                            </button>
                        </p>
                        <div className="collapse" id="collapseExample">
                            <div data-vjs-player>
                                <video ref={node => this.videoNode = node} className="video-js vjs-default-skin vjs-big-play-centered"></video>
                            </div>
                        </div>
                    </div>
                    <div id="browsercheck">Your browser is: {browserName}, Aruba page works well on Chrome, Firefox and Edge</div>
                </section>
            </div>
            <ScrollToTop style={{ "zIndex": '1', bottom: '85px'}} showUnder={160}>
                <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
            </ScrollToTop>
            <div className="container">
            {this.state.loaded || <Skeleton count={10} />}
            <ScrollableAnchor id={'ArubaNative'}>
            <h3 className="pb-3 mb-4 font-italic border-bottom">
                ArubaNative.com
            </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {natifes}
                    </div>
            <ScrollableAnchor id={'MasNoticia'}>
            <h3 className="pb-3 mb-4 font-italic border-bottom">
                MasNoticia.com
            </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {posts}
                    </div>
            <ScrollableAnchor id={'NoticiaCla'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    NoticiaCla.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {clas}
                    </div>
            <ScrollableAnchor id={'BonDia'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    BonDia.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {bondias}
                    </div>
            <ScrollableAnchor id={'Diario'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    Diario.aw
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {news}
                    </div>
            <ScrollableAnchor id={'24ora'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    24ora.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {oras}
                    </div>
            <ScrollableAnchor id={'BoletinExtra'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    BoletinExtra.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {boletins}
                    </div>
            <ScrollableAnchor id={'EarubianoNews'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    EarubianoNews.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {arubianos}
                    </div>
            <ScrollableAnchor id={'AweMainta'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    AweMainta.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {maintas}
                    </div>
            <ScrollableAnchor id={'Focus'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    Focus.aw
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {focuses}
                    </div>
            <ScrollableAnchor id={'VisitAruba'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    VisitAruba.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {blekis}
                    </div>
            <ScrollableAnchor id={'CoolAruba'}>
                <h3 className="pb-3 mb-4 font-italic border-bottom">
                    CoolAruba.com
                </h3>
            </ScrollableAnchor>
                    <div className="row">
                        {radios}
                    </div>
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
                    <AudioPlayer playlist={playlist} />
                </div>
                </StickyContainer>
            </div>
    );
}
}
export default Home;