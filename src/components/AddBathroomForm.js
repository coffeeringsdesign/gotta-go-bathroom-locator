import React, { Component } from 'react';
import './styles.scss';
import firebase from 'firebase';
import GoToBathroomList from './GoToBathroomList';

class AddBathroomForm extends Component {
  constructor(props, { state }) {
    super(props, { state });
    // console.log(state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
       [e.target.name]: e.target.value
     });
     console.log(this.state);
   }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const bathroomRef = firebase.database().ref('bathrooms');
    const bathroom = {
      name: this.state.name,
      address: this.state.address,
      // longLat: this.state.longLat,
      // needsCode: this.state.needsCode,
      // needsKey: this.state.needsKey,
      // handicapAccess: this.state.handicapAccess,
      // gendered: this.state.gendered,
      code: this.state.code,
      // id: this.state.id,
    }
    bathroomRef.push(bathroom);
    this.setState({
      // name: '',
      // address:  '',
      // longLat: '',
      // needsCode: '',
      // needsKey: '',
      // handicapAccess: '',
      // gendered: '',
      code: '',
      // id: '',
    });
    console.log(this.state);
  }


  render() {
    return (
      <div className="addBathroomContainer">
        <GoToBathroomList />
        <form className="addBathroomForm" onSubmit={this.handleSubmit}>
          <h4>Name:</h4>
          <input id="name" className="newBathroomInputs" type="text" name="name" placeholder="Please enter the establishments name..." value={this.props.name} onChange={this.handleChange} />

          <h4>Address:</h4>
          <input id="address" className="newBathroomInputs" type="text" name="address" placeholder="Please enter the address..." value={this.props.address} onChange={this.handleChange}/>

          <h4>If the Door requires a code please enter it here:</h4>
          <input id="code" className="newBathroomInputs" type="text" name="code" placeholder="leave blank if no code is needed..." value={this.props.code} onChange={this.handleChange}/>

          <br></br><button className="searchButton" type="submit">Add</button>
        </form>
      </div>
    )
  }
};

// <h4>Is the bathroom handicap accessable?</h4>
// <input id="handicapYes" className="newBathroomRadios" type="radio" name="handicapAccess" value="yes" />
// <label>yes</label>
// <input id="handicapNo" className="newBathroomRadios" type="radio" name="handicapAccess" value="no" />
// <label>no</label>
//
// <h4>Are the bathrooms gendered?</h4>
// <input id="genderedYes" className="newBathroomRadios" type="radio" name="gendered" value="yes" />
// <label>yes</label>
// <input id="genderedNo" className="newBathroomRadios" type="radio" name="gendered" value="no" />
// <label>no</label>
//
// <h4>Is a key required for access?</h4>
// <input id="keyTrue" className="newBathroomRadios" type="radio" name="needsKey" value="yes" />
// <label>yes</label>
// <input id="keyFalse" className="newBathroomRadios" type="radio" name="needsKey" value="no" />
// <label>no</label>

export default AddBathroomForm;
