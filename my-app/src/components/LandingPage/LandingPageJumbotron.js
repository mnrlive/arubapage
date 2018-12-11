import React from 'react';
import { browserName } from 'react-device-detect'
import VideoPlayer from "../VideoPlayer";
import ScrollToTop from 'react-scroll-up';

const JumbotronHome = () => {
    return (

            <section className="jumbotron">
                <div className="container">
                    <h1 className="jumbotron-heading">Welcome to Aruba Page</h1>
                    <h5 className="text-muted">One Happy Island, One well informed Aruban</h5>
                    <ScrollToTop style={{ "zIndex": '1' }} showUnder={160}>
                        <span><i className="arrow fa fa-arrow-circle-up fa-3x"></i></span>
                    </ScrollToTop>
                    <p>
                        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Click to watch Tele Aruba live!
                        </button>
                    </p>
                    <div className="collapse" id="collapseExample">
                        <VideoPlayer />
                    </div>
                    <div id="browsercheck">Your browser is: {browserName}, Aruba page works well on Chrome, Firefox and Edge</div>
                </div>
            </section>

    );
};

export default JumbotronHome;