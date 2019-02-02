import constants from './../../src/constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');
const firebase = require('firebase/app');

// FETCHING CURRENT LOCATION
export function fetchCurrentLocation(coords, props) {
  return function (dispatch) {
    let newCoords = {lat: coords.latitude, lng: coords.longitude};
    dispatch(findCurLocation(newCoords));
  }
};
export const findCurLocation = (newCoords) => ({
  type: types.FIND_CURRENT_LOCATION,
  newCoords
});



// FETCHING BATHROOMS FROM DATABASE
export function fetchInitialBathroomInformation(currentLocationCoords, dispatch) {
  return function (dispatch) {
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val(); //bathrooms is array of indiv bathrooms
      for (let bathroom in bathrooms) {
        //above is looping through recieved bathrooms
        dispatch(fetchDistanceDuration(bathrooms[bathroom], currentLocationCoords));
      }
    })
  }
};



// FETCHING DISTANCE & DURATION
export function fetchDistanceDuration(indivBathroomInfo, currentLocationCoords) {
  return function (dispatch) {
    const bathroomPropArray = [];
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
    bathroomPropArray.push(bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId);
    fetchDistance(origins, destinations, travelMode, bathroomPropArray, dispatch);
  }
}
export function fetchDistance(origins, destinations, travelMode, bathroomPropArray, dispatch) {
  return fetch(distance.matrix([origins], [destinations], travelMode, (err, distances) => {
    let dist = distances.rows[0].elements[0].distance.text;
    let dur = distances.rows[0].elements[0].duration.text;
    let distDurArray = [dist, dur];
    dispatch(findDistDur(distDurArray, bathroomPropArray));
  }));
}
export const findDistDur = (distDurArray, bathroom) => {
  return ({
    type: types.DISTANCE_DURATIONS,
    distDurArray,
    bathroom
  });
}

// REORERING THE BATHROOMS NEAREST USER
export function reorderNearestBathrooms(bathrooms, dispatch){
  return function (dispatch) {
    dispatch(reorderBathrooms(bathrooms));
  }
}

export const reorderBathrooms = bathrooms => {
  return({
    type: types.REORDER_BATHROOMS,
    bathrooms
  })
}
