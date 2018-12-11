import React from 'react';
import Skeleton from 'react-loading-skeleton';

const AboutContent = (props) => {
  return (
    <main className="container content">
      <div className="container">
              <div className="row">
              {props.loaded || <Skeleton count={10} />}
                  {props.boletins}
                  {props.instagrams}
                  {props.twitters}
              </div>
      </div>
      <footer className="container">
          <div className="text-center text-muted"><p>© 2018 made by</p><a href="https://sitelift.nl" target="_blank" rel="noopener noreferrer">Site Lift NL</a></div>
      </footer>
    </main>
  );
};

export default AboutContent;