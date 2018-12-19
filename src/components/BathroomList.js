import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
import Map from './Map';
import './styles.scss';
import SearchBar from './SearchBar';
import Logo from './Logo';
import CurrentLocation from './CurrentLocation';
import {GoogleApiWrapper} from 'google-maps-react';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {
  constructor() {
    // console.log(props);
    super();
    this.state = {
      bathrooms: [],
      currentLocation: null
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
      // console.log(newState);
      this.setState({
        bathrooms: newState
      });
      console.log(this.state);
    });
  }

  calculateDistances(longLat) {
    console.log(longLat);
    let origins = [this.state.currentLocation];
    let destinations = [longLat];

    distance.matrix(origins, destinations, function (err, distances) {
      if (!err)
      console.log(distances);
    })
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
            {this.calculateDistances(room.longLat)}
            return <Bathroom name={room.name}
              address={room.address}
              longLat={room.longLat}
              distance={room.distance}
              needsCode={room.needsCode}
              needsKey={room.needsKey}
              handicapAccess={room.handicapAccess}
              gendered={room.gendered}
              code={room.code}
              id={room.id} />
          })},
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

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList)
