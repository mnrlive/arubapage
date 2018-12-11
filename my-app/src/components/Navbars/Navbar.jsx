import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loaded }) =>  (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark">
                    <div className="container">
                        <NavLink className="navbar-brand nav-link" to="/">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                width="45" height="45" viewBox="0 0 171.000000 171.000000"
                                preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,171.000000) scale(0.100000,-0.100000)"
                                    fill="#ef2f3e" stroke="white" strokeWidth="65">
                                    <path d="M775 1328 c-48 -133 -93 -252 -100 -264 -9 -14 -89 -48 -274 -114
                                        -143 -52 -257 -97 -253 -100 4 -3 120 -43 257 -89 138 -46 256 -89 263 -96 7
                                        -6 53 -128 102 -270 49 -141 91 -259 92 -260 2 -2 47 120 101 270 88 245 101
                                        274 125 284 15 6 130 45 255 87 l229 77 -251 92 c-139 51 -254 94 -256 97 -3
                                        2 -49 123 -103 267 l-99 263 -88 -244z"/>
                                        </g>
                            </svg>
                            <span id="brandname">ArubaPage.com</span>
                        </NavLink>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
                 <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="nav nav-masthead justify-content-center">
                    <li className="nav-item">
                            <div><NavLink className="nav-link" activeClassName={"active"} to="/home">Home</NavLink></div>
                    </li>
                    <li className="nav-item">
                        <div><NavLink className="nav-link" activeClassName={"active"} to="/about">About</NavLink></div>
                    </li>
                    <li className="nav-item">
                        { !loaded ? <img id='spinner' src='../../images/spinner.gif' alt='Loading news..' /> : null }
                    </li>
                    </ul>
                    <div className="social nav nav-masthead ml-md-auto">

                        <li className="nav-item">
                                <div className="social"><a href="https://www.facebook.com/ArubaPage/" target="_blank" rel="noopener noreferrer" ><i className="fa fa-facebook-square fa-lg"></i></a></div>
                        </li>
                        <li className="nav-item">
                                <div className="social"><a href="https://www.instagram.com/arubapage/" target="_blank" rel="noopener noreferrer" ><i className="fa fa-instagram fa-lg"></i></a></div>
                        </li>
                        <li className="nav-item">
                                <div className="social"><a href="https://www.twitter.com/arubapage/" target="_blank" rel="noopener noreferrer" ><i className="fa fa-twitter fa-lg"></i></a></div>
                        </li>
                    </div>
                  </div>
                </div>
            </nav>
     </div>
);

export default Navbar;