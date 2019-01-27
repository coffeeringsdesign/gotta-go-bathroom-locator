import constants from './../../src/constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');
const firebase = require('firebase/app');


export function fetchDistanceDuration(indivBathroomInfo, props) {
  // indivBathroomInfo is bringing in each bathroom entry individually
  // props contains bathroom array, currentLocation YAY and travelMode as empty string
  return function (dispatch) {
    const localLocation = v4();
    const bathName = indivBathroomInfo.name;
    const bathAddress = indivBathroomInfo.address;
    const bathNeedsCode = indivBathroomInfo.needsCode;
    const bathNeedsKey = indivBathroomInfo.needsKey;
    const bathHandicapAccess = indivBathroomInfo.handicapAccess;
    const bathGendered = indivBathroomInfo.gendered;
    const bathCode = indivBathroomInfo.code;
    const bathId = indivBathroomInfo.id;
    const origins = [Object.values(props.currentLocation).join()];
    const destinations = [Object.values(indivBathroomInfo.longLat).join()];
    const travelMode = 'WALKING';
    fetchDistance(origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId, dispatch);
  }
}

export function fetchDistance(origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId, dispatch) {
  return fetch(distance.matrix([origins], [destinations], travelMode, (err, distances) => {
    let dist = distances.rows[0].elements[0].distance.text;
    let dur = distances.rows[0].elements[0].duration.text;
    let distDurArray = [dist, dur];
    dispatch(findDistDur(distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId));
  }));
}

export const findDistDur = (distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId) => {
  return ({
    type: types.DISTANCE_DURATIONS,
    distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId
  });
}

export function fetchCurrentLocation(coords, props) {
  return function (dispatch) {
    let newCoords = {lat: coords.latitude, lng: coords.longitude};
    fetch(findCurLocation(newCoords)).then(
      dispatch(fetchInitialBathroomInformation())
    );
  }
}

export const findCurLocation = newCoords => ({
  type: types.FIND_CURRENT_LOCATION,
  newCoords
})

export function fetchInitialBathroomInformation() {
  return function (dispatch) {
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val();
      let newState = [];
      console.log('shiiiit');
      for (let bathroom in bathrooms) {
        this.props.dispatch(fetchDistanceDuration(bathrooms[bathroom], this.state));
      }
    })
  }
}

// export const findCurLocation = newCoords => ({
//   type: types.FIND_CURRENT_LOCATION,
//   newCoords
// })
