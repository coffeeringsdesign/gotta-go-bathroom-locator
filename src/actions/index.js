import constants from './../constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');

export function fetchDistanceDuration(indivBathroomInfo, props) {
  // console.log(indivBathroomInfo); is bringing in each bathroom entry individually
  // console.log(props); contains bathroom array, currentLocation YAY and travelMode as empty string
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
    const travelMode = props.travelMode.length ? this.state.travelMode : 'WALKING';
    fetchDistance(origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId);
  }
}

export function fetchDistance(dispatch, origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId) {
  return fetch(distance.matrix([origins], [destinations], [travelMode], (err, distances) => {

    let dist = distances.rows[0].elements[0].distance.text;
    let dur = distances.rows[0].elements[0].duration.text;
    let distDurArray = [dist, dur];
    dispatch(findDistDur(distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId));
  }));
}

//all bathroom specs are reaching correctly below!!! need to get LongLat to work
export const findDistDur = (distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId) => { /// this is getting called correctly 
  return ({
    type: types.FETCH_DISTANCE_DURATIONS,
    distDurArray,
    bathName,
    bathAddress,
    bathNeedsCode,
    bathNeedsKey,
    bathHandicapAccess,
    bathGendered,
    bathCode,
    bathId,
  })
}

  // calculateDistances(longLat) {
  //   const origins = [Object.values(this.state.currentLocation).join()];
  //   const destinations = [Object.values(longLat).join()];
  //   const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';
  //   distance.matrix(origins, destinations, travelMode, (err, distances) => {
  //     let dist = distances.rows[0].elements[0].distance.text;
  //      let dur = distances.rows[0].elements[0].duration.text;
  //   })
  //   // return dist;
  // }
