import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
import Map from './Map';
import './styles.scss';
import SearchBar from './SearchBar';
import AddBathroomForm from './AddBathroomForm';
import Logo from './Logo';
import CurrentLocation from './CurrentLocation';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { fetchDistanceDuration } from './../actions';
import { fetchInitialBathroomInformation } from './../actions';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  // componentDidMount() {
  //   // console.log(this.props.individualBathroom);
  //   this.findCurrentLocation();
  //   // this.fetchBathroomData();
  // }



  // fetchBathroomData(){
  //   // console.log(this.props);
  //   this.props.dispatch(fetchInitialBathroomInformation());
  // }

    render() {
      // console.log("bathroom list state:" + this.props);
      // this.findCurrentLocation();
      // this.fetchBathroomData();
      return (
        <div className="resultsMapContainer">
          <div className="listResultsContainer">
            <Logo />
            <SearchBar />


            <AddBathroomForm />
          </div>
          <div className="mapResultsContainer">

          </div>
        </div>
      );
    }
}
//   ----goes between searchbar and addbathroomform------
// {Object.keys(this.state.bathrooms).map((i) => {
//   let room = this.state.bathrooms[i];
//   return <Bathroom name={room.name}
//     address={room.address}
//     longLat={room.longLat}
//     needsCode={room.needsCode}
//     needsKey={room.needsKey}
//     handicapAccess={room.handicapAccess}
//     gendered={room.gendered}
//     code={room.code}
//     id={room.id} />
// })},

//   ----goes in mapResultsContainer------
// {Object.keys(this.state.bathrooms).map((i) => {
//   let rooms = this.state.bathrooms;
//   return <Map bathroom={rooms} />
// })},


const mapStateToProps = state => {
  return {
    individualBathroom: state.individualBathroom,
    currentLocation: state.currentLocation
  };
};

// BathroomList.propTypes = {
//   dispatch: PropTypes.func
// };


export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList))
