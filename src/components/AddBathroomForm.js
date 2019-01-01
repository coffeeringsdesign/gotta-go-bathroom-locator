import React from 'react';
import './styles.scss';

function AddBathroomForm() {
  return (
    <div className="addBathroomContainer">
      <form className="addBathroomForm">
        <h4>Name:</h4>
        <input className="newBathroomInputs" type="text" name="newBathroomName" placeholder="Please enter the establishments name..." />

        <h4>Address:</h4>
        <input className="newBathroomInputs" type="text" name="newBathroomAddress" placeholder="Please enter the address..." />

        <h4>If the Door requires a code please enter it here:</h4>
        <input className="newBathroomInputs" type="text" name="newBathroomCoded" placeholder="leave blank if no code is needed..." />

        <h4>Is the bathroom handicap accessable?</h4>
        <input className="newBathroomRadios" type="radio" name="newBathroomHandicap" value="yes" />
        <label>yes</label>
        <input className="newBathroomRadios" type="radio" name="newBathroomHandicap" value="no" />
        <label>no</label>

        <h4>Are the bathrooms gendered?</h4>
        <input className="newBathroomRadios" type="radio" name="newBathroomGendered" value="yes" />
        <label>yes</label>
        <input className="newBathroomRadios" type="radio" name="newBathroomGendered" value="no" />
        <label>no</label>

        <h4>Is a key required for access?</h4>
        <input className="newBathroomRadios" type="radio" name="newBathroomKey" value="yes" />
        <label>yes</label>
        <input className="newBathroomRadios" type="radio" name="newBathroomKey" value="no" />
        <label>no</label>

        <br></br><button className="searchButton" type="submit">Add</button>
      </form>
    </div>
  )
};

export default AddBathroomForm;
