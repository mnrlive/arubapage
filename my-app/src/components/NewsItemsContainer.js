import React, { Component } from 'react';

class NewsItemsContainer extends Component {

  render() {
    return (
      <div>
          <h3 className="pb-3 mb-4 font-italic border-bottom">
              {this.props.newsSource}
          </h3>
        <div className="row">
            {this.props.newsItems}
        </div>
    </div>
    );
  }
}

export default NewsItemsContainer;