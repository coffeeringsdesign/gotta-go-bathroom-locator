import React, { Component } from 'react';
import './styles.scss';
import firebase from 'firebase';
import GoToBathroomList from './GoToBathroomList';

class AddBathroomForm extends Component {
  constructor(props, { state }) {
    super(props, { state });
    this.state = {
      selectedHandicap: "",
      selectedGendered: "",
      selectedKeyed: "",
      selectedCoded: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
       [e.target.name]: e.target.value,
       selectedHandicap: e.targetvalue,
       selectedGendered: e.targetvalue,
       selectedKeyed: e.targetvalue,
       selectedCoded: e.targetvalue
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
      needsCode: this.state.needsCode,
      needsKey: this.state.needsKey,
      handicapAccess: this.state.handicapAccess,
      gendered: this.state.gendered,
      code: this.state.code,
      // id: this.state.id,
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

          <h4>Is the bathroom handicap accessible?</h4>
          <input id="handicapYes" className="newBathroomRadios" type="radio" name="handicapAccess" value="true" checked={this.state.selectedHandicap === "true"} onChange={this.handleChange}/>
          <label>yes</label>
          <input id="handicapNo" className="newBathroomRadios" type="radio" name="handicapAccess" value="false" checked={this.state.selectedHandicap === "false"} onChange={this.handleChange}/>
          <label>no</label>

          <h4>Are the bathrooms gendered?</h4>
          <input id="genderedYes" className="newBathroomRadios" type="radio" name="gendered" value="true" checked={this.state.selectedGendered === "true"} onChange={this.handleChange}/>
          <label>yes</label>
          <input id="genderedNo" className="newBathroomRadios" type="radio" name="gendered" value="false" checked={this.state.selectedGendered === "false"} onChange={this.handleChange}/>
          <label>no</label>

          <h4>Is a key required for access?</h4>
          <input id="keyTrue" className="newBathroomRadios" type="radio" name="needsKey" value="true" checked={this.state.selectedKeyed === "true"} onChange={this.handleChange}/>
          <label>yes</label>
          <input id="keyFalse" className="newBathroomRadios" type="radio" name="needsKey" value="false" checked={this.state.selectedKeyed === "false"} onChange={this.handleChange}/>
          <label>no</label>

          <h4>Is a code required for access?</h4>
          <input id="codeTrue" className="newBathroomRadios" type="radio" name="needsCode" value="true" checked={this.state.selectedCoded === "true"} onChange={this.handleChange}/>
          <label>yes</label>
          <input id="codeFalse" className="newBathroomRadios" type="radio" name="needsCode" value="false" checked={this.state.selectedCoded === "false"} onChange={this.handleChange}/>
          <label>no</label>

          <h4>Do you know the code? If so, please enter it here:</h4>
          <input id="code" className="newBathroomInputs" type="text" name="code" placeholder="leave blank if no code is needed..." value={this.props.code} onChange={this.handleChange}/>

          <br></br><button className="searchButton" type="submit">Add</button>
        </form>
      </div>
    )
  }
};

export default AddBathroomForm;
