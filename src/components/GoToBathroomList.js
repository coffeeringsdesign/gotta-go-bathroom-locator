import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

function GoToBathroomList() {
  return (
    <div className="buttonContainer">
      <p>Add a Bathroom Below or...</p>
      <Link to="/"><button className="goToAddaBathroom" type="submit">Go Back to Bathrooms</button></Link>
    </div>
  )
};

export default GoToBathroomList;
