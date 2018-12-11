import React from 'react';
import JumbotronHome from './LandingPageJumbotron';

const LandingPage = () => {
  return (
      <main className="container content">
        <JumbotronHome />
        <p className="container lead font-weight-normal">
          It is with great pleasure that we proudly present to you our solution for the island of <b>Aruba</b> regarding online news.<br /><br />
          This web app allows you to see all the latest news from all online news providers from the island.
          Instead of going on news sites one by one or finding out about the news on Facebook or other social media,
          we created a one page website that gathers all news from all news providers.
              We are currently displaying the latest 10 news articles from each news provider. <i className="text-muted">#stayinformed</i>
        </p>
        <div className="text-center text-muted">
          <p>© 2018 made by:</p>
          <a href="https://sitelift.nl" target="_blank" rel="noopener noreferrer">Site Lift NL</a>
        </div>
      </main>
  );
};

export default LandingPage;