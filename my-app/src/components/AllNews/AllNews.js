import React from 'react';
import NewsItemsContainer from "../NewsItemsContainer";

const AllNews = ({ newsSources, loaded }) => (
    <div>
            {loaded ||  <div id='spinner'> <img src='../images/spinner.gif' alt="Loading spinner" /> </div> }
            {
                newsSources && newsSources.map((newsItems, index) => {
                    if(newsItems){
                        const anchor =  newsItems[0].props.provider ?
                            newsItems[0].props.provider.charAt(0).toUpperCase() + newsItems[0].props.provider.slice(1, newsItems[0].props.provider.indexOf('.')) :
                            "Noticiacla"
                        return  (
                            <NewsItemsContainer
                                key={index}
                                id={anchor}
                                newsSource={newsItems[0].props.provider}
                                newsItems={newsItems}
                            />
                        )
                    }
                    return null
                })
            }
    </div>
);

export default AllNews;