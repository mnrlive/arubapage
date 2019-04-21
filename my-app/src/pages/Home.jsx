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
import uuid from "uuid";

// import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile} from 'react-device-detect';
import AdSense from 'react-adsense';

class Home extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
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

    //     let xclusivo = this.state.services.xclusivo && this.state.services.xclusivo.map((xclusivo, index) => {
    //     return (
    //         <NewsItem
    //             key={index}
    //             index={index}
    //             newsSource={xclusivo}
    //             provider="xclusivomagazine.com"
    //             imgFunction={imageErrorCheck(xclusivo)}
    //             renderedContent={ReactHtmlParser(sanitizeHtml(xclusivo.content.rendered, {
    //                                 allowedTags: ['p', 'em', 'strong', 'b', 'i']
    //                             }))}
    //         />
    //     )
    // })

    let newsSources = [ masNoticia,arubaNative,noticiaCla,bondia,diario,bintiCuatroOra,boletinExtra,eArubianoNews,aweMainta,solo,focus,visitAruba,sports];


       let generate = newsSources.map(item => {
           let anchor;
     if(item){
            if( item[0].props.provider){
                const {provider} = item[0].props
                anchor = provider.replace('www.', '').charAt(0).toUpperCase() + provider.replace('www.', '').slice(1)
            } else {
                anchor = "noticiacla.com"
            }
        }
          return {
              uid: uuid.v4(),
              value: item,
              name: anchor
          };
      });
    // could be mapped over for NewsItemsContainer rendering

    return (
                <main role="main" className="container">
                <Jumbotron />
                {
                    (!isMobile) ?
                         ( <AdSense.Google
                        client='ca-pub-8107944427019798'
                        slot='5340644171'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    />) : null
                    }
                {this.state.loaded || <Skeleton count={newsSources.length} />}

                {generate.map((i) => (
                         <NewsItemsContainer key={i.uid} newsSource={i.name} newsItems={i.value} />
                    ))}
     
                    <div className="bottomText">
                        <p className="lead font-weight-normal">
                        It is with great pleasure that we proudly present to you our solution for the island of <b>Aruba</b> regarding online news.<br /><br />
                        This web app allows you to see all the latest news from all online news providers from the island.
                        Instead of going on news sites one by one or finding out about the news on Facebook or other social media platforms,
                        we created a one page website that gathers all news from all news providers.
                            We are currently displaying the latest 10 news articles from each news provider. <i className="text-muted">#stayinformed</i></p>
                            <div className="text-center text-muted"><p>© 2018 made by:</p><a href="https://robingiel.com" target="_blank" rel="noopener noreferrer">RG</a></div>
                    </div>
            
                </main>
    );
}
}
export default Home;