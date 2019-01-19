import constants from './../constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');

export function fetchDistanceDuration(longLat, props) {
  return function (dispatch) {

    const localLocation = v4();
    const origins = [Object.values(props.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = props.travelMode.length ? this.state.travelMode : 'WALKING';

    return fetch(distance.matrix(origins, destinations, travelMode, (err, distances) => {
      let dist = distances.rows[0].elements[0].distance.text;
      let dur = distances.rows[0].elements[0].duration.text;
      let distDurArray = [dist, dur];
    })).then(distDurArray => {
    dispatch(findDistDur(distDurArray));
    })
  }
}

export const findDistDur = distDurArray => {
  return ({
    type: types.FETCH_DISTANCE_DURATIONS,
    distDurArray
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
