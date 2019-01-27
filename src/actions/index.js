import constants from './../../src/constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');
const firebase = require('firebase/app');


// FETCHING CURRENT LOCATION BEGINS  ------------ WORKING - setting current location to state
export function fetchCurrentLocation(coords, props) {
  return function (dispatch) {
    let newCoords = {lat: coords.latitude, lng: coords.longitude};
    dispatch(findCurLocation(newCoords));
  }
}
export const findCurLocation = (newCoords) => ({
  type: types.FIND_CURRENT_LOCATION,
  newCoords
})



// FETCHING BATHROOMS FROM DATABASE BEGINS
export function fetchInitialBathroomInformation(currentLocationCoords, dispatch) {
  return function () {
    console.log(currentLocationCoords);
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val();
      // console.log(bathrooms); this is the array of all bathrooms
      for (let bathroom in bathrooms) {
        dispatch(fetchDistanceDuration(bathrooms[bathroom], currentLocationCoords));
      }
    })
  }
}



// FETCHING DISTANCE & DURATION AND MAKING INDIVIDUAL BATHROOM OBJECTS BEGINS
export function fetchDistanceDuration(indivBathroomInfo, currentLocationCoords) {
  // console.log(this.state);
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
    const origins = [Object.values(currentLocationCoords).join()];
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
