import React from 'react';
import Navbar from '../Navbars/Navbar';
import SecondNavbar from '../Navbars/SecondNavbar';

const Header = ({ loaded }) => {
  return (
    <div>
      <Navbar loaded={loaded} />
      <div className="navZ" >
        <SecondNavbar />
      </div>
    </div>
  );
};

export default Header;