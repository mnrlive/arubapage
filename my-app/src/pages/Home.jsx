import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
import moment from 'moment';
import ScrollToTop from 'react-scroll-up';
import Navbar from '../components/Navbar.jsx';
import videojs from 'video.js';
import ogs from 'open-graph-scraper';
import Skeleton from 'react-loading-skeleton';
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
    isMobile,
    isChromium,
    isAndroid,
    isIOS,
    browserName,
    MobileView
} from 'react-device-detect';

  const Browser = browserName;
const renderContent = () => {
    if (isMobile || isChromium || isAndroid || isIOS || MobileView) {
        return 'http://cdn.setar.aw:1935/Telearuba/smil:telearuba.smil/playlist.m3u8';
    } else if (isChrome || browserName === 'Chrome Webview' || browserName === 'Facebook') {
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
            fetch(newsServices[key], fetchConfig).then((response) => response.json()).then((responseJson) => {this.addServiceData(key, responseJson.items)})
           
        }else{
            fetch(newsServices[key], fetchConfig).then((response) => response.json()).then((responseJson) => { this.addServiceData(key, responseJson)})
        }
    })
}

componentDidMount() {
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
// Cathing erros and showing default
imageErrorCheck(provider) {

    const regEx = /[-a-zA-Z0-9@:%_.~#?&=]{2,256}\.[a-z]{2,4}/;
    const link = (regEx.exec(provider.link));

    if ( link[0] === 'arubanative.com'){
         try {
             return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
         } catch (e) {
             return require('../images/arubaNative.PNG');
         }
        } else if (link[0] === 'www.bondia.com'){
         try {
             return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
         } catch (e) {
             return require('../images/bondia.PNG');
         }
        } else if (link[0] === 'focus.aw'){
            try {
                return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
            } catch (e) {
             return require('../images/focus.PNG');
            }
        } else if (link[0] === 'awemainta.com') {
         try {
             return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
         } catch (e) {
             return require('../images/aweMainta.PNG');
            }
        } else if (link[0] === 'coolaruba.com') {
            try {
                return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
            } catch (e) {
                return require('../images/coolFm.png');
            }
        } else if (link[0] === 'www.diario.aw') {
                try {
                    return (provider._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url);
                } catch (e) {
                    return require('../images/diario.PNG');
                }
        } else if (link[0] === 'masnoticia.com') {

                return require('../images/masnoticia.PNG');
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
        function imageRuba() {
            try {
                // only 900 x 425 format
                return (require('../webimages/' + (regex.exec(arubiano._embedded['wp:featuredmedia'][0].source_url)[2]) + '-900x425.jpg'));
            } catch (e) {
                try {
                    return ((require('../webimages/' + (regex.exec(arubiano._embedded['wp:featuredmedia'][0].source_url)[2]) + '-900x425.jpeg')));
                }catch(e){

                }
                return require('../images/eArubiano.PNG');
            }
        }
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={imageRuba()} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(arubiano.title.rendered)}</h3>
                        <p className="card-text">{moment(arubiano.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: arubiano.excerpt.rendered.substring(0, 250) + "..." }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + arubiano.id}>read more</button>
                        <div className="text-muted">provider: earubianonews.com</div>
                    </div>
                </div>
                <div className="modal fade" id={arubiano.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={imageRuba()} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(arubiano.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(arubiano.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(arubiano.content.rendered))}
                                <a href="https://earubianonews.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> earubianonews.com</a>
                                <a href={arubiano.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={arubiano.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={arubiano.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={arubiano.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //awe mainta
    let maintas = this.state.services.aweMainta && this.state.services.aweMainta.map((mainta, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(mainta)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(mainta.title.rendered.substring(0, 170))}</h3>
                        <p className="card-text">{moment(mainta.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: mainta.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + mainta.id}>read more</button>
                        <div className="text-muted">provider: awemainta.com</div>
                    </div>
                </div>
                <div className="modal fade" id={mainta.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(mainta)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(mainta.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(mainta.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(mainta.content.rendered))}
                                <a href="https://awemainta.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> awemainta.com</a>
                                <a href={mainta.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={mainta.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={mainta.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={mainta.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //boletin extra Crawl for images!
    let boletins =  this.state.services.boletinExtra && this.state.services.boletinExtra.map((boletin, index) => {
        function imageTest() {
            try {
                return ((require('../webimages/' + (regex.exec(boletin._embedded['wp:featuredmedia'][0].source_url)[2]) + '-620x330.jpg')));
            } catch (e) {
                return require('../images/boletinHD.jpg');
            }
        }
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={imageTest()} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(boletin.title.rendered)}</h3>
                        <p className="card-text">{moment(boletin.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: boletin.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + boletin.id}>read more</button>
                        <div className="text-muted">provider: boletinextra.com</div>
                    </div>
                </div>
                <div className="modal fade" id={boletin.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={imageTest()} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(boletin.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(boletin.date).format('L')}</p>
                                <div>{ReactHtmlParser(sanitizeHtml(boletin.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}</div>
                                <a href="https://boletinextra.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> boletinextra.com</a>
                                <a href={boletin.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={boletin.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={boletin.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={boletin.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //24ora Crawl for images!
    let oras = this.state.services._24ora && this.state.services._24ora.map((ora, index) => {
        function imageOra() {
            try {
                return ((require('../webimages/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.jpg')));
            } catch (e) {

                try {
                    return ((require('../webimages/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.jpeg')));
                } catch (e) {
                    try {
                        return ((require('../webimages/' + (regex.exec(ora._embedded['wp:featuredmedia'][0].source_url)[2]) + '.png')));
                    } catch (e) {

                    }
                }
                return require('../images/24ora.jpg');
            }
        }
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={imageOra()} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(ora.title.rendered)}</h3>
                        <p className="card-text">{moment(ora.date).format('L')}</p>
                        <div>{(ora.excerpt.rendered === "<p>00</p>\n") ? 'Video' : ReactHtmlParser(ora.excerpt.rendered)}</div>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + ora.id}>read more</button>
                        <div className="text-muted">provider: 24ora.com</div>
                    </div>
                </div>
                <div className="modal fade" id={ora.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={imageOra()} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(ora.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(ora.date).format('L')}</p>
                                <div>{ReactHtmlParser(sanitizeHtml(ora.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i', 'span'],
                                    transformTags: {
                                        'span': function (tagName, attribs) {
                                            return {
                                                tagName: 'span',
                                                text: ' '
                                            };
                                        }
                                    }
                                }))}</div>
                                <a href="https://24ora.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> 24ora.com</a>
                                <a href={ora.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={ora.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={ora.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={ora.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //masnoticia
    let posts = this.state.services.masNoticia && this.state.services.masNoticia.map((post, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(post)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(post.title.rendered)}</h3>
                        <p className="card-text">{moment(post.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + post.id}>read more</button>
                        <div className="text-muted">provider: masnoticia.com</div>
                    </div>
                </div>
                <div className="modal fade" id={post.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(post)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(post.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(post.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(post.content.rendered))}
                                <a href="https://masnoticia.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> masnoticia.com</a>
                                <a href={post.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={post.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={post.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={post.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //diario
    let news = this.state.services.diario && this.state.services.diario.map((noticia, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(noticia)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(noticia.title.rendered)}</h3>
                        <p className="card-text">{moment(noticia.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: noticia.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + noticia.id}>read more</button>
                        <div className="text-muted">provider: diario.aw</div>
                    </div>
                </div>
                <div className="modal fade" id={noticia.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(noticia)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(noticia.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(noticia.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(noticia.content.rendered))}
                                <a href="https://diario.aw" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> diario.aw</a>
                                <a href={noticia.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={noticia.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={noticia.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={noticia.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //aruba native
    let natifes = this.state.services.arubaNative && this.state.services.arubaNative.map((native, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(native)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(native.title.rendered)}</h3>
                        <p className="card-text">{moment(native.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: native.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + native.id}>read more</button>
                        <div className="text-muted">provider: arubanative.com</div>
                    </div>
                </div>
                <div className="modal fade" id={native.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(native)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(native.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(native.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(native.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}
                                <a href="https://arubanative.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> arubanative.com</a>
                                <a href={native.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={native.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={native.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={native.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //bon dia aruba
    let bondias = this.state.services.bonDia && this.state.services.bonDia.map((bondia, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(bondia)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(bondia.title.rendered)}</h3>
                        <p className="card-text">{moment(bondia.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: bondia.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + bondia.id}>read more</button>
                        <div className="text-muted">provider: bondia.com</div>
                    </div>
                </div>
                <div className="modal fade" id={bondia.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(bondia)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(bondia.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(bondia.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(bondia.content.rendered))}
                                <a href="https://www.bondia.com/" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> bondia.com</a>
                                <a href={bondia.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={bondia.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={bondia.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={bondia.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //focus
    let focuses = this.state.services.focus && this.state.services.focus.map((focus, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(focus)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(focus.title.rendered)}</h3>
                        <p className="card-text">{moment(focus.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: focus.excerpt.rendered }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + focus.id}>read more</button>
                        <div className="text-muted">provider: focus.aw</div>
                    </div>
                </div>
                <div className="modal fade" id={focus.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(focus)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(focus.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(focus.date).format('L')}</p>
                                <div>{ReactHtmlParser(sanitizeHtml(focus.content.rendered, {
                                    allowedTags: ['p', 'li', 'iframe', 'i', 'strong', 'blockquote'],
                                    allowedAttributes: { 'iframe': ['src'] },
                                    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
                                }))}</div>
                                <a href="https://focus.aw" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> focus.aw</a>
                                <a href={focus.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={focus.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={focus.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={focus.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //bati bleki    
    let blekis = this.state.services.batiBleki && this.state.services.batiBleki.map((bleki, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={(!bleki._embedded['wp:featuredmedia'] || bleki._embedded['wp:featuredmedia'][0].code) ? require('../images/batiBlekiHD.PNG') : bleki._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(bleki.title.rendered)}</h3>
                        <p className="card-text">{moment(bleki.date).format('L')}</p>
                        <p dangerouslySetInnerHTML={{ __html: bleki.excerpt.rendered.substring(0, 250) + "..." }}></p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + bleki.id}>read more</button>
                        <div className="text-muted">provider: www.visitaruba.com/blog</div>
                    </div>
                </div>
                <div className="modal fade" id={bleki.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={(!bleki._embedded['wp:featuredmedia'] || bleki._embedded['wp:featuredmedia'][0].code) ? require('../images/batiBlekiHD.PNG') : bleki._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(bleki.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(bleki.date).format('L')}</p>
                                {ReactHtmlParser(sanitizeHtml(bleki.content.rendered))}
                                <a href="https://batibleki.visitaruba.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> batibleki.visitaruba.com</a>
                                <a href={bleki.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={bleki.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={bleki.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={bleki.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //coolaruba
    let radios = this.state.services.coolAruba && this.state.services.coolAruba.map((radio, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" src={this.imageErrorCheck(radio)} alt="Thumbnail [100%x225]" />
                    <div className="card-body">
                        <h3>{ReactHtmlParser(radio.title.rendered)}</h3>
                        <p className="card-text">{moment(radio.date).format('L')}</p>
                        <button type="button" className="btn btn-lg btn-primary" data-toggle="modal" data-target={"#" + radio.id}>read more</button>
                        <div className="text-muted">provider: coolaruba.com</div>
                    </div>
                </div>
                <div className="modal fade" id={radio.id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <img className="modal-header" src={this.imageErrorCheck(radio)} alt="Thumbnail [100%x225]" />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h3 className="modal-title" id="exampleModalCenterTitle">{ReactHtmlParser(radio.title.rendered)}</h3>
                            </div>
                            <div className="modal-body" >
                                <p className="card-text">{moment(radio.date).format('L')}</p>
                                <div>{ReactHtmlParser(sanitizeHtml(radio.content.rendered, {
                                    allowedTags: ['p', 'em', 'strong', 'b', 'i']
                                }))}</div>
                                <a href="https://coolaruba.com" target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-globe" aria-hidden="true"></i> coolaruba.com</a>
                                <a href={radio.link} target="_blank" rel="noopener noreferrer"><i style={{ color: "black" }} className="fa fa-link" aria-hidden="true"></i> link to article</a>
                                <div className="modal-footer">
                                    <div className="sharebuttons">
                                        <FacebookShareButton url={radio.link}>
                                            <FacebookIcon size={32} round={true} />
                                        </FacebookShareButton>
                                        <TwitterShareButton url={radio.link}>
                                            <TwitterIcon size={32} round={true} />
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={radio.link}>
                                            <WhatsappIcon size={32} round={true} />
                                        </WhatsappShareButton>
                                    </div>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    const data = [
        natifes,
        posts,
        clas,
        boletins,
        bondias,
        news,
        arubianos,
        maintas,
        focuses,
        oras,
        blekis,
        radios
    ]
    return (
        <div>
            <Navbar />
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
                    <div id="browsercheck">Your browser is: {Browser}, Aruba page works well on Chrome, Firefox and Edge</div>
                </section>
            </div>
            <ScrollToTop style={{ "zIndex": '1' }} showUnder={160}>
                <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
            </ScrollToTop>
            <div className="container">
            {this.state.loaded || <Skeleton count={10} />}
                    <div className="row">
                        {data}
                    </div>
                <p style={{ "marginTop": "60px", "padding": "10%" }} className="lead font-weight-normal">
                    It is with great pleasure that we proudly present to you our solution for the island of <b>Aruba</b> regarding online news.<br /><br />
                    This web app allows you to see all the latest news from all online news providers from the island.
                    Instead of going on news sites one by one or finding out about the news on Facebook or other social media,
                    we created a one page website that gathers all news from all news providers.
                        We are currently displaying the latest 10 news articles from each news provider. <i className="text-muted">#stayinformed</i>
                </p>
            </div>
            </main>
            <footer className="container">
                <div className="text-center text-muted"><p>© 2018 made by</p><a href="https://sitelift.nl" target="_blank" rel="noopener noreferrer">Site Lift NL</a></div>
            </footer>
            </div>
    );
}
}
export default Home;