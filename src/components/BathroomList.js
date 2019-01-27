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
import { fetchCurrentLocation } from './../actions';
import { fetchInitialBathroomInformation } from './../actions';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {


  constructor(props, state) {
    super(props, state);
    console.log(state);
    // this.state = {
    //   bathrooms: []
    // }
  }

  // findCurrentLocation() {
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     const coords = pos.coords;
  //     this.setState({
  //       currentLocation: {
  //         lat: coords.latitude,
  //         lng: coords.longitude
  //       }
  //     });
  //     console.log(this.state.currentLocation);
  //   });
  // }

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      this.props.dispatch(fetchCurrentLocation(coords, this.props));
    });
  }

  fetchBathroomData(){
    this.props.dispatch(fetchInitialBathroomInformation());
  }

    //grabbing bathrooms from firebase and setting them as state
  //   findBathroomData() {
  //   const bathroomsRef = firebase.database().ref('bathrooms');
  //   bathroomsRef.on('value', (snapshot) => {
  //     let bathrooms = snapshot.val();
  //     let newState = [];
  //     console.log('shiiiit');
  //     for (let bathroom in bathrooms) {
  //       if(this.state.currentLocation){
  //         this.props.dispatch(fetchDistanceDuration(bathrooms[bathroom], this.state));
  //     } else {
  //       return this.state;
  //     }
  //     // console.log(indivBathlocation);
  //     //   newState.push({
  //     //     name: bathrooms[bathroom].name,
  //     //     address: bathrooms[bathroom].address,
  //     //     longLat: bathrooms[bathroom].longLat,
  //     //     distance: bathrooms[bathroom].distance,
  //     //
  //     //     needsCode: bathrooms[bathroom].needsCode,
  //     //     needsKey: bathrooms[bathroom].needsKey,
  //     //     handicapAccess: bathrooms[bathroom].handicapAccess,
  //     //     gendered: bathrooms[bathroom].gendered,
  //     //     code: bathrooms[bathroom].code,
  //     //     id: bathrooms[bathroom].id
  //     //   })
  //     }
  //     // console.log(this.state);
  //     // this.setState({
  //     //   bathrooms: newState
  //     // });
  //   });
  // }

    render() {
      // console.log("bathroom list state:" + this.state);
      this.findCurrentLocation();
      this.fetchBathroomData();
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


// const mapStateToProps = state => {
//   console.log(state);
//   return {
//     currentLocation: state.currentLocation,
//     individualBathroom: state.individualBathroom
//   }
// }

// BathroomList.propTypes = {
//   dispatch: PropTypes.func
// };

export default connect()(GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList))
