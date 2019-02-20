import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

function GoToAddaBathroomForm() {
  return (
    <div className="buttonContainer">
      <p>Help expand the database?</p>
      <Link to="/addBathroom"><button className="goToAddaBathroom" type="submit">Enter a bathroom here!</button></Link>
    </div>
  )
};

export default GoToAddaBathroomForm;
