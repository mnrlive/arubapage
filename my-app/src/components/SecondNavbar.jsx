import React, { Component } from 'react';
import './Navbar.css';

class SecondNavbar extends Component {
    render() {
        return (
    <div className="nav-scroller bg-white shadow-sm box-shadow">
      <nav className="nav nav-underline">
        <a className="nav-link" href="#ArubaNative">ArubaNative</a>
        <a className="nav-link" href="#MasNoticia">MasNoticia</a>
        <a className="nav-link" href="#NoticiaCla">NoticiaCla</a>
        <a className="nav-link" href="#BonDia">BonDia</a>
        <a className="nav-link" href="#Diario">Diario</a>
        <a className="nav-link" href="#24ora">24ora</a>
        <a className="nav-link" href="#BoletinExtra">BoletinExtra</a>
        <a className="nav-link" href="#EarubianoNews">EarubianoNews</a>
        <a className="nav-link" href="#AweMainta">AweMainta</a>
        <a className="nav-link" href="#Focus">Focus</a>
        <a className="nav-link" href="#VisitAruba">VisitAruba</a>
        <a className="nav-link" href="#CoolAruba">CoolAruba</a>
      </nav>
      </div>

        );
    }
}

export default SecondNavbar;