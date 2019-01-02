import React, { Component } from 'react';
import './styles.scss';
import firebase from 'firebase';

class AddBathroomForm extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.setState({
       [e.target.name]: e.target.value
     });
     console.log(this.state);
   }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    const bathroomRef = firebase.database().ref('bathrooms');
    const bathroom = {
      name: this.state.name,
      address: this.state.address,
      longLat: this.state.longLat,
      needsCode: this.state.needsCode,
      needsKey: this.state.needsKey,
      handicapAccess: this.state.handicapAccess,
      gendered: this.state.gendered,
      code: this.state.code,
      id: this.state.id,
    }

    bathroomRef.push(bathroom);
    this.setState({
      name: '',
      address:  '',
      longLat: '',
      needsCode: '',
      needsKey: '',
      handicapAccess: '',
      gendered: '',
      code: '',
      id: '',
    });
    console.log(this.state);
  }




  render() {
    return (
      <div className="addBathroomContainer">
        <form className="addBathroomForm" onSubmit={this.handleSubmit}>
          <h4>Name:</h4>
          <input id="name" className="newBathroomInputs" type="text" name="newBathroomName" placeholder="Please enter the establishments name..." value={this.props.name} onChange={this.handleChange} />

          <h4>Address:</h4>
          <input id="address" className="newBathroomInputs" type="text" name="newBathroomAddress" placeholder="Please enter the address..." value={this.props.address} onChange={this.handleChange}/>

          <h4>If the Door requires a code please enter it here:</h4>
          <input id="code" className="newBathroomInputs" type="text" name="newBathroomCoded" placeholder="leave blank if no code is needed..." value={this.props.code} onChange={this.handleChange}/>

          <h4>Is the bathroom handicap accessable?</h4>
          <input id="handicapYes" className="newBathroomRadios" type="radio" name="newBathroomHandicap" value="yes" />
          <label>yes</label>
          <input id="handicapNo" className="newBathroomRadios" type="radio" name="newBathroomHandicap" value="no" />
          <label>no</label>

          <h4>Are the bathrooms gendered?</h4>
          <input id="genderedYes" className="newBathroomRadios" type="radio" name="newBathroomGendered" value="yes" />
          <label>yes</label>
          <input id="genderedNo" className="newBathroomRadios" type="radio" name="newBathroomGendered" value="no" />
          <label>no</label>

          <h4>Is a key required for access?</h4>
          <input id="keyTrue" className="newBathroomRadios" type="radio" name="newBathroomKey" value="yes" />
          <label>yes</label>
          <input id="keyFalse" className="newBathroomRadios" type="radio" name="newBathroomKey" value="no" />
          <label>no</label>

          <br></br><button className="searchButton" type="submit">Add</button>
        </form>
      </div>
    )
  }
};

export default AddBathroomForm;
