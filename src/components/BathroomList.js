import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
import Map from './Map';
import './styles.scss';
import SearchBar from './SearchBar';
import AddBathroomForm from './AddBathroomForm';
import Logo from './Logo';
import CurrentLocation from './CurrentLocation';
import {GoogleApiWrapper} from 'google-maps-react';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bathrooms: [],
      currentLocation: null,
      travelMode: ''
    }
  }

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      this.setState({
        currentLocation: {
          lat: coords.latitude,
          lng: coords.longitude
        }
      });
    });
  }

    //grabbing bathrooms from firebase and setting them as state
    componentDidMount() {
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val();
      let newState = [];
      let bathDistance;
      for (let bathroom in bathrooms) {
        newState.push({
          name: bathrooms[bathroom].name,
          address: bathrooms[bathroom].address,
          longLat: bathrooms[bathroom].longLat,
          distance: bathrooms[bathroom].distance,
          needsCode: bathrooms[bathroom].needsCode,
          needsKey: bathrooms[bathroom].needsKey,
          handicapAccess: bathrooms[bathroom].handicapAccess,
          gendered: bathrooms[bathroom].gendered,
          code: bathrooms[bathroom].code,
          id: bathrooms[bathroom].id
        })
      }
      this.setState({
        bathrooms: newState
      });
    });
  }

  calculateDistances(longLat) {
    const origins = [Object.values(this.state.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';
    let newMeasure = [];
    var distanceFinal = distance.matrix(origins, destinations, travelMode, (err, distances) => {
        newMeasure.push({
          distance: distances.rows[0].elements[0].distance.text,
          duration: distances.rows[0].elements[0].duration.text,
        })
    })
    console.log(newMeasure);
    return newMeasure;
  }


  // grabCurrentLocationInfo(longLat) {
  //   const origins = [Object.values(this.state.currentLocation).join()];
  //   const destinations = [Object.values(longLat).join()];
  //   console.log(destinations);
  //   const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';
  //   return this.calculateDistances(origins, destinations, travelMode);
  // }
  //
  // calculateDistances(origins, destinations, travelMode) {
  //     distance.matrix(origins, destinations, travelMode, (err, distances) => {
  //
  //     // console.log(this.sendNewCaculatedLocationInfo(distances));
  //     let bathDistance = distances.rows[0].elements[0].distance.text;
  //     return bathDistance;
  //     //the above console log is getting back the exact object we want including the breakdown of the distance and duration
  //
  //       // this.sendNewCaculatedLocationInfo(distances); // here distances are each one!!!!!! not just a single one!!!!
  //   })
  // }
  //
  // sendNewCaculatedLocationInfo(distances) {
  //   // console.log(distances); getting to this point
  //   // console.log(distances.rows[0].elements[0].distance.text); working perfectly... now just to get it sent to bathroom
  //
  //   return distances.rows[0].elements[0].distance.text
  // }

// duration: distances.rows[0].elements[0].duration.text,

//   {this.findCurrentLocation()} // this was being called near the top of the return = currently moved into componentDidMount
    render() {
      return (
        <div className="resultsMapContainer">
                {this.findCurrentLocation()}
          <div className="listResultsContainer">
            <Logo />
            <SearchBar />

              {Object.keys(this.state.bathrooms).map((i) => {
                let room = this.state.bathrooms[i];
                return <Bathroom name={room.name}
                  address={room.address}
                  longLat={room.longLat}
                  needsCode={room.needsCode}
                  needsKey={room.needsKey}
                  distanceDuration={this.calculateDistances(room.longLat)}
                  handicapAccess={room.handicapAccess}
                  gendered={room.gendered}
                  code={room.code}
                  id={room.id} />
              })},
            <AddBathroomForm />
          </div>
          <div className="mapResultsContainer">
          {Object.keys(this.state.bathrooms).map((i) => {
            let rooms = this.state.bathrooms;
            return <Map bathroom={rooms} />
          })},
          </div>
        </div>
      );
    }
}
// let indivRoom = this.calculateDistances(room.longLat)
// distance={this.newProps.distance}
// duration={this.newProps.duration}

//goes right below the <SearchBar>
// {Object.keys(this.state.bathrooms).map((i) => {
//   let room = this.state.bathrooms[i];
//   return <Bathroom name={room.name}
//     address={room.address}
//     longLat={room.longLat}
//     needsCode={room.needsCode}
//     distanceDuration={this.calculateDistances(room.longLat)}
//     needsKey={room.needsKey}
//     handicapAccess={room.handicapAccess}
//     gendered={room.gendered}
//     code={room.code}
//     id={room.id} />
// })},

// distance={this.calculateDistances(room.longLat)}

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList)
