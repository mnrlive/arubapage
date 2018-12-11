import React from 'react';
import Skeleton from 'react-loading-skeleton';

const AboutContent = (props) => {
  return (
    <main className="container content">
      <p className="lead font-weight-normal">
        Aruba page dot com was launched on the 18th of March 2018 and was created by Site Lift NL.<br/><br/>
        The idea started when one frustrated and unhappy Aruban had to bookmark all news providers
        and daily opening them one by one to read the latest news. Knowing that Aruba is a one happy Island, this
        Aruban was determined to remove the hassle to get the latest news articles from each news provider and be happy with not having to open
        all those tabs on his browser again.<br/><br/>

        Thus Aruba page was created and launched on Aruba's national anthem and flag day.
        Keeping in mind that Aruba Page is still brand new, there is going to be allot of new features added to the page so we can
        optimize the site for better user experience.<br /><br/>

        So far we had a few really interesting feedback from our users.
        Your feedback is important to us, so feel free to reach us on Facebook, Twitter, Instagram or simply send us an email at: info@arubapage.com
      </p>
      <div className="row">
      {props.loaded || <Skeleton count={10} />}
          {props.boletins}
          {props.instagrams}
          {props.twitters}
      </div>
      <footer>
          <div className="text-center text-muted"><p>© 2018 made by</p><a href="https://sitelift.nl" target="_blank" rel="noopener noreferrer">Site Lift NL</a></div>
      </footer>
    </main>
  );
};

export default AboutContent;