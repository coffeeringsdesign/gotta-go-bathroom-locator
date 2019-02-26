import React, {Component} from 'react';
import './styles.scss';
import firebase from 'firebase';
import GoToBathroomList from './GoToBathroomList';
import {fetchNewLongLat} from './../actions';
import v4 from 'uuid/v4';
import Geocode from 'react-geocode';
const API_KEY = process.env.REACT_APP_API_KEY;
Geocode.setApiKey(API_KEY);

class AddBathroomForm extends Component {
  constructor(props, {state}) {
    super(props, {state});
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(props);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  determineCodeOrUncoded = code => {
    if (code === undefined) {
      return '';
    } else {
      return code;
    }
  }

  getNewLongLat(address){
    this.props.dispatch(fetchNewLongLat(address, this.props.dispatch));
  }


  handleSubmit(e) {
    e.preventDefault();
    const bathroomRef = firebase.database().ref('bathrooms');
    let codeNeeded = (this.state.needsCode === 'true');
    let keyNeeded = (this.state.needsKey === 'true');
    let handicapAcc = (this.state.handicapAccess === 'true');
    let genderedYes = (this.state.gendered === 'true');
    this.getNewLongLat(this.state.address);

    const bathroom = {
      name: this.state.name,
      address: this.state.address,
      // longLat: this.state.longLat,
      needsCode: codeNeeded,
      needsKey: keyNeeded,
      handicapAccess: handicapAcc,
      gendered: genderedYes,
      code: this.determineCodeOrUncoded(this.state.code),
      id: v4()
    }
    bathroomRef.push(bathroom);
    this.setState({
      name: '',
      address: '',
      longLat: '',
      needsCode: '',
      needsKey: '',
      handicapAccess: '',
      gendered: '',
      code: '',
      id: ''
    });
    // console.log(this.state);
  }

  render() {
    return (<div className="addBathroomContainer">
      <GoToBathroomList/>
      <form className="addBathroomForm" onSubmit={this.handleSubmit}>
        <h4>Name:</h4>
        <input id="name" className="newBathroomInputs" type="text" name="name" placeholder="Please enter the establishments name..." value={this.props.name} onChange={this.handleChange}/>

        <h4>Address:</h4>
        <input id="address" className="newBathroomInputs" type="text" name="address" placeholder="Please enter the address..." value={this.props.address} onChange={this.handleChange}/>

        <h4>Is the bathroom handicap accessible?</h4>
        <input id="handicapYes" className="newBathroomRadios" type="radio" name="handicapAccess" value="true" onChange={this.handleChange}/>
        <label>yes</label>
        <input id="handicapNo" className="newBathroomRadios" type="radio" name="handicapAccess" value="false" onChange={this.handleChange}/>
        <label>no</label>

        <h4>Are the bathrooms gendered?</h4>
        <input id="genderedYes" className="newBathroomRadios" type="radio" name="gendered" value="true" onChange={this.handleChange}/>
        <label>yes</label>
        <input id="genderedNo" className="newBathroomRadios" type="radio" name="gendered" value="false" onChange={this.handleChange}/>
        <label>no</label>

        <h4>Is a key required for access?</h4>
        <input id="keyTrue" className="newBathroomRadios" type="radio" name="needsKey" value="true" onChange={this.handleChange}/>
        <label>yes</label>
        <input id="keyFalse" className="newBathroomRadios" type="radio" name="needsKey" value="false" onChange={this.handleChange}/>
        <label>no</label>

        <h4>Is a code required for access?</h4>
        <input id="codeTrue" className="newBathroomRadios" type="radio" name="needsCode" value="true" onChange={this.handleChange}/>
        <label>yes</label>
        <input id="codeFalse" className="newBathroomRadios" type="radio" name="needsCode" value="false" onChange={this.handleChange}/>
        <label>no</label>

        <h4>Do you know the code? If so, please enter it here:</h4>
        <input id="code" className="newBathroomInputs" type="text" name="code" placeholder="leave blank if no code is needed..." value={this.props.code} onChange={this.handleChange}/>

        <br></br>
        <button className="searchButton" type="submit">Add</button>
      </form>
    </div>)
  }
};

export default AddBathroomForm;
