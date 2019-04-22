import React from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';
import NewsCard from "./NewsCard";
import NewsModal from "./NewsModal";
// import LazyLoad from 'react-lazyload';

const NewsItem = ({ newsSource, index, provider, imgFunction, renderedContent, cla }) => {
  //newsSource && console.log(newsSource);
  if (cla) {
    const id = cla.guid.slice(cla.guid.lastIndexOf('/') + 1)
    const excerpt = cla.description.slice(0,247) + "..."
    return (
      <div className="col-md-4">
        <NewsCard
          image={(!cla.imgUrl) ? require('../images/noticiaCLa.PNG') : cla.imgUrl}
          title={cla.title}
          date={cla.pubDate}
          excerpt={excerpt}
          target={"#" + id}
          provider="noticiacla.com"
          cla={true}
        />
        <NewsModal
          id={id}
          image={(!cla.imgUrl) ? require('../images/noticiaCLa.PNG') : cla.imgUrl}
          title={cla.title}
          date={cla.pubDate}
          renderedContent={cla.content}
          source={" https://noticiacla.com"}
          articleUrl={cla.link}
        />
      </div>
    )
  }
  return (
  // <LazyLoad height={200}>
    <div className="col-md-4" key={index}>
        <NewsCard
            image={imgFunction}
            title={ReactHtmlParser(newsSource.title.rendered)}
            date={moment(newsSource.date).format('L')}
            excerpt={ newsSource.description ? { __html: newsSource.description.substring(0, 250) + "..."} :
                { __html: newsSource.excerpt.rendered.substring(0, 250) + "..." }}
            target={"#" + newsSource.id}
            provider={provider}
        />
        <NewsModal
            id={newsSource.id}
            image={imgFunction}
            title={ReactHtmlParser(newsSource.title.rendered)}
            date={moment(newsSource.date).format('L')}
            renderedContent={renderedContent ? renderedContent : ReactHtmlParser(sanitizeHtml(newsSource.content.rendered, {
                allowedTags: ['p', 'li', 'iframe', 'i', 'strong'],
                  allowedAttributes: {
                    'iframe': ['src']
                  },
                  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
            }))}
            source={" https://" + provider}
            articleUrl={newsSource.link}
        />
    </div>
  // </LazyLoad>
)};

export default NewsItem;