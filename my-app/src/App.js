import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import Analytics from 'react-router-ga';
import ico from './images/aruba.ico';
import './App.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
      return (
        <Router>
          <Analytics id="UA-115970603-1" debug>
          <div>
            <Favicon url={[ico]} />
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About} />
          </div>
          <Footer />
          </Analytics>
        </Router>
      );
  }
}


export default App;
