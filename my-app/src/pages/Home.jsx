import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
// import ScrollToTop from 'react-scroll-up';
import ogs from 'open-graph-scraper';
import Skeleton from 'react-loading-skeleton';
// import { Sticky, StickyContainer } from 'react-sticky';
import _ from 'lodash'
import './Home.css';
import newsServices from '../config/services';
import NewsItem from '../components/NewsItem';
import Jumbotron from "../components/Jumbotron";
import NewsItemsContainer from "../components/NewsItemsContainer";
// recently added utils | 02-12-2018
import { imageErrorCheck } from "../utils/imageErrorCheck";
import { imageTest, imageBintiCuater, imageSports} from "../utils/imageFunctions";
import { isMobile} from 'react-device-detect';
import AdSense from 'react-adsense';

class Home extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            services: {},
            loaded: false
        }
         this.handleScrollTopClick = this.handleScrollTopClick.bind(this);
}

    handleScrollTopClick() {
        const { scrollbars } = this.refs;
        const scrollHeight = scrollbars.getScrollHeight();
        scrollbars.scrollTop(_.random(scrollHeight));
        scrollbars.scrollTop(scrollHeight);

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
            const options = { 'url': 'https://provider.arubapage.com/' + cla.link }
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
    let noticiaCla = this.state.services.noticiaCla && this.state.services.noticiaCla.map((cla, index) => {
        return (
            <NewsItem key={index} index={index} cla={cla} />
        )
    })
    // e arubiano Crawl for images!
    let eArubianoNews = this.state.services.eArubianoNews && this.state.services.eArubianoNews.map((arubiano, index) => {
        return (
           <NewsItem
                key={index}
                index={index}
                newsSource={arubiano}
                provider="earubianonews.com"
                imgFunction={imageErrorCheck(arubiano)}
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
            <NewsItem key={index} index={index} newsSource={mainta} provider="awemainta.com" imgFunction={imageErrorCheck(mainta)} />
        )
    })
    //boletin extra Crawl for images!
    let boletinExtra =  this.state.services.boletinExtra && this.state.services.boletinExtra.map((boletinExtra, index) => {
        return (
            <NewsItem key={index} index={index} newsSource={boletinExtra} provider="boletinextra.com" imgFunction={imageTest(boletinExtra)} />
        )
    })
    //24ora Crawl for images!

    let bintiCuatroOra = this.state.services._24ora && this.state.services._24ora.map((ora, index) => {
        return (
            <NewsItem
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
            <NewsItem
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
            <NewsItem key={index} index={index} newsSource={diario} provider="diario.aw" imgFunction={imageErrorCheck(diario)} />
        )
    })
    //aruba native
    let arubaNative = this.state.services.arubaNative && this.state.services.arubaNative.map((arubaNative, index) => {
        return (
            <NewsItem key={index} index={index} newsSource={arubaNative} provider="arubanative.com" imgFunction={imageErrorCheck(arubaNative)} />
        )
    })
    //solo di pueblo
    let solo = this.state.services.solo && this.state.services.solo.map((solo, index) => {
        return (
            <NewsItem key={index} index={index} newsSource={solo} provider="solodipueblo.com" imgFunction={imageErrorCheck(solo)} />
        )
    })
    //bon dia aruba
    let bondia = this.state.services.bonDia && this.state.services.bonDia.map((bondia, index) => {
        return (
            <NewsItem key={index} index={index} newsSource={bondia} provider="bondia.com" imgFunction={imageErrorCheck(bondia)} />
        )
    })
    //focus
    let focus = this.state.services.focus && this.state.services.focus.map((focus, index) => {
        return (
            <NewsItem
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
            <NewsItem
                key={index}
                index={index}
                newsSource={visitAruba}
                provider="visitaruba.com"
                imgFunction={(!visitAruba._embedded['wp:featuredmedia'] || visitAruba._embedded['wp:featuredmedia'][0].code) ?
                        require('../images/batiBlekiHD.PNG') : visitAruba._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
            />
        )
    })
    //297sports
    let sports = this.state.services.sports && this.state.services.sports.map((sports, index) => {
        return (
            <NewsItem
                key={index}
                index={index}
                newsSource={sports}
                provider="www.297sports.com"
                imgFunction={imageSports(sports)}
                renderedContent={ReactHtmlParser(sanitizeHtml(sports.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}
            />
        )
    })

        let xclusivo = this.state.services.xclusivo && this.state.services.xclusivo.map((xclusivo, index) => {
        return (
            <NewsItem
                key={index}
                index={index}
                newsSource={xclusivo}
                provider="xclusivomagazine.com"
                imgFunction={imageErrorCheck(xclusivo)}
                renderedContent={ReactHtmlParser(sanitizeHtml(xclusivo.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}
            />
        )
    })
    // could be mapped over for NewsItemsContainer rendering
    // const newsSources = [arubaNative, masNoticia, noticiaCla, bondia, diario, bintiCuatroOra, boletinExtra, eArubianoNews, aweMainta, focus, visitAruba, coolAruba];

    return (
        <div>
                <main role="main" className="container">
                <Jumbotron />
                        {
                            (!isMobile) ?
                         (
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5340644171'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />) : null
                        }
                <div className="container">
                    {this.state.loaded || <Skeleton count={10} />}
                    <section id='MasNoticia'><NewsItemsContainer id='MasNoticia' newsSource='MasNoticia.com' newsItems={masNoticia} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='9924285810'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='ArubaNative'><NewsItemsContainer id='ArubaNative' newsSource='ArubaNative.com' newsItems={arubaNative} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='8522153357'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='NoticiaCla'><NewsItemsContainer id='NoticiaCla' newsSource='NoticiaCla.com' newsItems={noticiaCla} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='6279843837'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='Diario'><NewsItemsContainer id='Diario' newsSource='Diario.aw' newsItems={diario} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='7209782125'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='SoloDiPueblo'><NewsItemsContainer id='SoloDiPueblo' newsSource='SoloDiPueblo.com' newsItems={solo} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='1191168688'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='BonDia'><NewsItemsContainer id='BonDia' newsSource='BonDia.com' newsItems={bondia} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5177804717'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='dosCuatorOra'><NewsItemsContainer id='24ora' newsSource='24ora.com' newsItems={bintiCuatroOra} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='9153419185'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='AweMainta'><NewsItemsContainer id='AweMainta' newsSource='AweMainta.com' newsItems={aweMainta} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='4467358277'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='BoletinExtra'><NewsItemsContainer id='BoletinExtra' newsSource='BoletinExtra.com' newsItems={boletinExtra} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='7457194139'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='EarubianoNews'><NewsItemsContainer id='EarubianoNews' newsSource='EarubianoNews.com' newsItems={eArubianoNews} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='6163583321'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='Focus'><NewsItemsContainer id='Focus' newsSource='Focus.aw' newsItems={focus} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='3134805748'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='VisitAruba'><NewsItemsContainer id='VisitAruba' newsSource='VisitAruba.com' newsItems={visitAruba} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5205724870'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='dosNuebeSheteSports'><NewsItemsContainer id='297Sports' newsSource='297Sports.com' newsItems={sports} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5944091472'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <section id='xClusivoMag'><NewsItemsContainer id='xClusivo' newsSource='XclusivoMagazine.com' newsItems={xclusivo} /></section>
                    <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5944091472'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />
                    <div className="bottomText">
                        <p className="lead font-weight-normal">
                        It is with great pleasure that we proudly present to you our solution for the island of <b>Aruba</b> regarding online news.<br /><br />
                        This web app allows you to see all the latest news from all online news providers from the island.
                        Instead of going on news sites one by one or finding out about the news on Facebook or other social media platforms,
                        we created a one page website that gathers all news from all news providers.
                            We are currently displaying the latest 10 news articles from each news provider. <i className="text-muted">#stayinformed</i></p>
                            <div className="text-center text-muted"><p>© 2018 made by:</p><a href="https://robingiel.com" target="_blank" rel="noopener noreferrer">RG</a></div>
                    </div>
                </div>
                </main>
        </div>
    );
}
}
export default Home;