import React from 'react';
import logo from '../assets/images/GottaGoLogo.png';
import './styles.scss';


function Logo(){
  return (
    <div>
      <img className="logoImage" src={logo} />
    </div>
  )
};

export default Logo;
