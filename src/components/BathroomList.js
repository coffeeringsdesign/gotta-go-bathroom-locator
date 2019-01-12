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
      // console.log(this.state.currentLocation);
    });
  }

    componentDidMount() {
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val(); //data is getting in from firebase
      // console.log(bathrooms);
      let newState = [];
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

  grabCurrentLocationInfo(longLat, newProps) {
    const origins = [Object.values(this.state.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';
    return this.calculateDistances(origins, destinations, travelMode);
  }

  calculateDistances(origins, destinations, travelMode) {
     return distance.matrix(origins, destinations, travelMode, (err, distances) => {

      // console.log(this.sendNewCaculatedLocationInfo(distances));

      //the above console log is getting back the exact object we want including the breakdown of the distance and duration

       return this.sendNewCaculatedLocationInfo(distances); // here distances are each one!!!!!! not just a single one!!!!
    })
  }

  sendNewCaculatedLocationInfo(distances) {
    // console.log(distances); getting to this point
    // console.log(distances.rows[0].elements[0].distance.text); working perfectly... now just to get it sent to bathroom
    return {
      distance: distances.rows[0].elements[0].distance.text,
      duration: distances.rows[0].elements[0].duration.text,
    }
  }




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
                  distanceDuration={this.grabCurrentLocationInfo(room.longLat)}
                  needsKey={room.needsKey}
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
