import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import logo from '../assets/images/GottaGoLogo.png';

function EntranceButton() {
  return (
    <div className="entrancePage">
      <div className="entranceGraphic">
        <h5>WELCOME TO...</h5>
        <img className="logoImage" alt="Gotta Go Logo" src={logo} />
        <h5 className="bottomLine">Currently, a CORS plugin is required to view the app.</h5>
        <p>If using Chrome please install & enable this <a href="https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US"><button className="goToAddaBathroom">Plugin</button></a></p>
        <p>If using Firefox please install & enable this <a href="https://addons.mozilla.org/en-US/firefox/addon/moesif-origin-cors-changer1/"><button className="goToAddaBathroom">Plugin</button></a></p>
        <h5 className="topLine">Once enabled, please refresh the browser and enjoy the site. </h5>
        <Link to="/BathroomList"><button className="goToAddaBathroom" type="submit">See the app!</button></Link>
      </div>
    </div>
  )
};

export default EntranceButton;
