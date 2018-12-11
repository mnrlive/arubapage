import React from 'react';
import ScrollToTop from 'react-scroll-up';


const AboutJumbotron = () => {
    return (

            <section className="jumbotron">
                <div className="container">
                    <h1 className="jumbotron-heading">ArubaPage.com</h1>
                    <h5 className="text-muted">One Happy Island, One well informed Aruban.</h5>
                    <ScrollToTop style={{ "zIndex": '1' }} showUnder={160}>
                        <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
                    </ScrollToTop>
                </div>
            </section>

    );
};

export default AboutJumbotron;