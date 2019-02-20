import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

function GoToBathroomList() {
  return (
    <div className="buttonContainer">

      <Link to="/"><button className="goToAddaBathroom" type="submit">Back to Bathrooms</button></Link>
    </div>
  )
};

export default GoToBathroomList;
