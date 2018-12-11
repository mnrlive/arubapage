import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import { configureAnchors } from 'react-scrollable-anchor';
// import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor';

class NewsItemsContainer extends Component {
  componentDidMount() {
    configureAnchors({offset: -65, scrollDuration: 200});
}
  render() {
    const { newsSource, newsItems } = this.props
    return (
      <main role="main" className="container content">
        <ScrollToTop style={{ "zIndex": '1', bottom: '85px'}} showUnder={160}>
            <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
        </ScrollToTop>
        {/* <ScrollableAnchor id={id || ""}> */}
          <h3 className="pb-3 mb-4 font-italic border-bottom">
              {newsSource ? newsSource.charAt(0).toUpperCase() + newsSource.slice(1, newsSource.indexOf('.')) : "NotciaCla"}
          </h3>
        {/* </ScrollableAnchor> */}
        <div className="row">
            {newsItems}
        </div>
    </main>
    );
  }
}

export default NewsItemsContainer;