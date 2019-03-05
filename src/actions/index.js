// import constants from './../../src/constants';
// import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
import Geocode from 'react-geocode';
const distance = require('google-distance-matrix');
const firebase = require('firebase/app');
const API_KEY = process.env.REACT_APP_API_KEY;
Geocode.setApiKey(API_KEY);

// FETCHING CURRENT LOCATION
export function fetchCurrentLocation(coords, props) {
  return function(dispatch) {
    let newCoords = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    dispatch(findCurLocation(newCoords));
  }
};
export const findCurLocation = (newCoords) => ({
  type: types.FIND_CURRENT_LOCATION,
  newCoords
});



// FETCHING BATHROOMS FROM DATABASE
export function fetchInitialBathroomInformation(currentLocationCoords, dispatch) {
  return function(dispatch) {
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
  return function(dispatch) {
    const bathroomPropArray = [];
    const bathName = indivBathroomInfo.name;
    const bathAddress = indivBathroomInfo.address;
    const bathLongLat = indivBathroomInfo.longLat;
    const bathNeedsCode = indivBathroomInfo.needsCode;
    const bathNeedsKey = indivBathroomInfo.needsKey;
    const bathHandicapAccess = indivBathroomInfo.handicapAccess;
    const bathGendered = indivBathroomInfo.gendered;
    const bathCode = indivBathroomInfo.code;
    const bathId = indivBathroomInfo.id;
    const origins = [Object.values(currentLocationCoords).join()];
    const destinations = [Object.values(indivBathroomInfo.longLat).join()];
    bathroomPropArray.push(bathName, bathAddress, bathLongLat, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId);
    fetchDistance(origins, destinations, bathroomPropArray, dispatch);
  }
}
export function fetchDistance(origins, destinations, bathroomPropArray, dispatch) {
  distance.mode('walking');
  return fetch(distance.matrix(origins, destinations, (err, distances) => {
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
export function reorderNearestBathrooms(bathrooms, dispatch) {
  return function(dispatch) {
    dispatch(reorderBathrooms(bathrooms));
  }
}

export const reorderBathrooms = bathrooms => {
  return ({
    type: types.REORDER_BATHROOMS,
    bathrooms
  })
}


// ACTIVE Marker
export function activeMarker(dispatch) {
  return function(dispatch) {
    dispatch(setActiveMarker());
  }
}
export const setActiveMarker = () => {
  return ({
    type: types.ACTIVE_MARKER
  })
}




// SHOWING INFO WINDOW
export function showInfoWindowToTrue(dispatch) {
  return function(dispatch) {
    dispatch(letsShowInfoWindow());
  }
}
export const letsShowInfoWindow = () => {
  return ({
    type: types.SHOW_INFO_WINDOW
  })
}



// SELECTED A PLACE
export function selectAPlace(dispatch) {
  return function(dispatch) {
    dispatch(selectedAPlace());
  }
}
export const selectedAPlace = () => {
  return ({
    type: types.SELECT_A_PLACE
  })
}



// GETTING LONGITUDE AND LATITUDE OF NEW SUBMITTED BATHROOM ADDRESS
export function fetchNewLongLat(submittedAddress, dispatch) {
  return function(dispatch) {
    Geocode.fromAddress(submittedAddress).then(
      response => {
        const {
          lat,
          lng
        } = response.results[0].geometry.location;
        // console.log("lat" + lat, "long" + lng);
        dispatch(findNewLongLat(lat, lng));
      },
      error => {
        console.error(error);
      }
    );
  }
}
export const findNewLongLat = (lat, lng) => {
  return ({
    type: types.ADD_NEW_BATHROOM_LAT_LNG,
    lat,
    lng
  });
}
