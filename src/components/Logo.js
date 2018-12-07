import React from 'react';
import logo from '../assets/images/GottaGoLogo.png';
import './styles.scss';


function Logo(){
  return (
    <div>
      <img className="logoImage" alt="Gotta Go Logo" src={logo} />
    </div>
  )
};

export default Logo;
