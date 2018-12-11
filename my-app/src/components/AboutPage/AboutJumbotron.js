import React from 'react';
import ScrollToTop from 'react-scroll-up';

const AboutJumbotron = () => {
  return (
    <div className="jumbotron">
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">About ArubaPage.com</h1>
                    <p className="lead text-muted">One Happy Island, One well informed Aruban.</p>
                    <ScrollToTop style={{ "zIndex": '1' }} showUnder={160}>
                        <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
                    </ScrollToTop>
                    <p className="lead font-weight-normal">

                    Aruba page dot com was launched on the 18th of March 2018 and was created by Site Lift NL.<br/><br/>
                    The idea started when one frustrated and unhappy Aruban had to bookmark all news providers
                    and daily opening them one by one to read the latest news. Knowing that Aruba is a one happy Island, this
                    Aruban was determined to remove the hassle to get the latest news articles from each news provider and be happy with not having to open
                    all those tabs on his browser again.<br/><br/>

                    Thus Aruba page was created and launched on Aruba's national anthem and flag day.
                    Keeping in mind that Aruba Page is still brand new, there is going to be allot of new features added to the page so we can
                    optimize the site for better user experience.<br /><br/>

                    So far we had a few really interesting feedback from our users. Your feedback is important to us, so feel free to reach us on Facebook, Twitter, Instagram or simply send us an email at: info@arubapage.com

                    </p>
                </div>
            </section>
        </div>
  );
};

export default AboutJumbotron;