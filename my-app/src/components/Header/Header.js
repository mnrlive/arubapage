import React from 'react';
import Navbar from '../Navbars/Navbar';
import SecondNavbar from '../Navbars/SecondNavbar';
// import { Sticky, StickyContainer } from 'react-sticky';

const Header = ({ loaded }) => {
  return (
    <div>
      <Navbar loaded={loaded}/>
      <SecondNavbar/>
    </div>
  );
};

export default Header;