import constants from './../constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');
const { c } = constants;

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
    const travelMode = props.travelMode.length ? this.state.travelMode : 'WALKING';
    fetchDistance(origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId);
  }
}

export function fetchDistance(origins, destinations, travelMode, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId) {
  return fetch(distance.matrix([origins], [destinations], [travelMode], (err, distances) => {

    let dist = distances.rows[0].elements[0].distance.text;
    let dur = distances.rows[0].elements[0].duration.text;
    let distDurArray = [dist, dur];
    findDistDur(distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId);
  }));
}

//all bathroom specs are reaching correctly below!!!
export const findDistDur = (distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId) => ({
    type: c.FETCH_DISTANCE_DURATIONS,
    bDistance: distDurArray[0],
    bDuration: distDurArray[1],
    bName: bathName,
    bAddress: bathAddress,
    bNeedCode: bathNeedsCode,
    bNeedKey: bathNeedsKey,
    bHandicap: bathHandicapAccess,
    bGendered: bathGendered,
    bCode: bathCode,
    bId: bathId,
  });
