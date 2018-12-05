import React, { Component } from 'react';
import ScrollableAnchor, {configureAnchors} from 'react-scrollable-anchor';

class NewsItemsContainer extends Component {

  componentDidMount() {
    configureAnchors({offset: -150, scrollDuration: 200});
}
  render() {
    return (
      <div>
        <ScrollableAnchor id={this.props.id}>
          <h3 className="pb-3 mb-4 font-italic border-bottom">
              {this.props.newsSource}
          </h3>
        </ScrollableAnchor>
        <div className="row">
            {this.props.newsItems}
        </div>
    </div>
    );
  }
}

export default NewsItemsContainer;