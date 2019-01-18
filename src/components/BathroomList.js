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
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {


  constructor(props, { dispatch }) {
    super(props);
    console.log(props);
    this.state = {
      bathrooms: [],
      currentLocation: this.findCurrentLocation(),
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
      for (let bathroom in bathrooms) {
        // dispatch(fetchDistanceDuration(bathrooms[bathroom].longLat));
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








  // calculateDistances(longLat) {
  //   const origins = [Object.values(this.state.currentLocation).join()];
  //   const destinations = [Object.values(longLat).join()];
  //   const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';
  //   distance.matrix(origins, destinations, travelMode, (err, distances) => {
  //     let dist = distances.rows[0].elements[0].distance.text;
  //     // console.log(dist);
  //     // return dist
  //     // return distance;
  //       // distDurArray.push(distances.rows[0].elements[0].distance.text);
  //       // distDurArray.push(distances.rows[0].elements[0].duration.text);
  //       // return trial = new Array(distances.rows[0].elements[0].distance.text, distances.rows[0].elements[0].duration.text)
  //   })
  //   // return dist;
  // }

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
// distanceDuration={this.calculateDistances(room.longLat)}

// BathroomList.propTypes = {
//   dispatch: PropTypes.func
// };

export default connect()(GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList))
