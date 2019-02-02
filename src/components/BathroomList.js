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
import { reorderNearestBathrooms } from './../actions';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {
  constructor(props) {
    super(props);
    // current location is now in props
  }

  fetchBathroomData(){
    if (this.props.currentLocation && !this.props.bathrooms[0]) {
      this.props.dispatch(fetchInitialBathroomInformation(this.props.currentLocation));
    }
  }

  reorderBathrooms(){
    if (this.props.bathrooms[10]) {
      this.props.dispatch(reorderNearestBathrooms(this.props.bathrooms));
    }
  }

    render() {
      this.fetchBathroomData();
      this.reorderBathrooms();
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
    currentLocation: state.currentLocation,
    bathrooms: state.bathrooms
  };
};

// BathroomList.propTypes = {
//   dispatch: PropTypes.func
// };


export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList))
