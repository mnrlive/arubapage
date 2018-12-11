import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import Analytics from 'react-router-ga';
import ico from './images/aruba.ico';
import ogs from 'open-graph-scraper';
import _ from 'lodash'
// components
import LandingPage from './components/LandingPage/LandingPage';
import AboutContainer from './components/AboutPage/AboutContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NewsItemsContainer from "./components/common/NewsItem/NewsItemsContainer";
// util functions
import { fetchDataFromServices } from "./utils/fetchDataFromServices";
import { formatNewsSources } from './utils/formatNewsSources';
// css
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            services: {},
            loaded: false
        }
    }

    addServiceData = (key, data) => {
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

    componentDidMount() {
        fetchDataFromServices(this.addServiceData);
    }

    // TODO: Refactor out of here
    mapOpenGraphImageResults = function () {
        const { services } = this.state;
        if (services.noticiaCla && services.noticiaCla.length > 0) {
            let noticiaCla = _.cloneDeep(services.noticiaCla);
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
    const { services } = this.state;
    const newsSources = formatNewsSources(services)
      return (
        <Router>
          <Analytics id="UA-115970603-1" debug>
            <Header />
              <Favicon url={[ico]} />
              <Route exact path="/" component={LandingPage}/>
              <Route path="/home" component={LandingPage}/>
              <Route path="/about" component={AboutContainer} />
              {/* <Route path="/all" component={() => (<AllNews newsSources={newsSources} loaded={loaded} />)} /> */}
              {
                newsSources && newsSources.map((newsItems, index) => {
                    if(newsItems){
                        const anchor =  newsItems[0].props.provider ?
                            newsItems[0].props.provider.charAt(0).toUpperCase() + newsItems[0].props.provider.slice(1, newsItems[0].props.provider.indexOf('.')) :
                            "Noticiacla"
                        return  (
                            <Route key={index} path={newsItems[0].props.cla ? "/noticiacla.com" : `/${newsItems[0].props.provider}`} component={() => (
                                <NewsItemsContainer
                                    key={index}
                                    id={anchor}
                                    newsSource={newsItems[0].props.provider}
                                    newsItems={newsItems}
                                /> )}
                            />
                        )
                    }
                    return null
                })
            }
            <Footer />
          </Analytics>
        </Router>
      );
  }
}


export default App;
