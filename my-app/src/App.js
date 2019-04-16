import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import Analytics from 'react-router-ga';
import ico from './images/aruba.ico';
import ogs from 'open-graph-scraper';
import './App.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer/Footer';
import _ from 'lodash';
import NewsItemsContainer from "./components/common/NewsItem/NewsItemsContainer";
// util functions
import { fetchDataFromServices } from "./utils/fetchDataFromServices";
import { formatNewsSources } from './utils/formatNewsSources';
import Header from './components/Header/Header';
import ScrollToTop from 'react-scroll-up';
// import AddToHomescreen from 'react-add-to-homescreen';


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
        const { services } = this.state;
        const newsSources = formatNewsSources(services)
        let loaded = _.compact(newsSources).length === 14
    return (
      <Router>
      <Analytics id="UA-115970603-1" debug>
      <Header loaded = {loaded}/>

        <ScrollToTop style={{ "zIndex": '1', bottom: '85px'}} showUnder={160}>
            <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
        </ScrollToTop>
             <div>
                 <Favicon url={[ico]} />
                 <Route exact path="/" component={Home}/>
                 <Route exact path="/about" component={About} />
                 { newsSources && newsSources.map((newsItems, index) => {
                    if(newsItems){
                        let anchor;
                            if( newsItems[0].props.provider){
                                const {provider} = newsItems[0].props
                                anchor = provider.replace('www.', '').charAt(0).toUpperCase() + provider.replace('www.', '').slice(1)
                            } else {
                                anchor = "noticiacla.com"
                            }

                        return  (
                            <Route key={index} path={ '/' +  anchor } component={() => (
                                <NewsItemsContainer
                                    key={index}
                                    id={anchor}
                                    newsSource={anchor}
                                    newsItems={newsItems}
                                /> )}
                            />
                        )
                    }
                    return null
                   })
                 }
            </div>
          <Footer />
       </Analytics>
      </Router>
      );
  }
}


export default App;
