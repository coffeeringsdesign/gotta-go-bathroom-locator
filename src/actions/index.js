import constants from './../../src/constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');


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

export function fetchCurrentLocation(coords, props, dispatch) {
  // props is state
  let newCoords = {lat: coords.latitude, lng: coords.longitude};
  // return newCoords;
  findCurLocation(newCoords);
};

export const findCurLocation = (newCoords) => {
  // coords are getting here
  return ({
    type: types.FIND_CURRENT_LOCATION,
    newCoords
  });
}
