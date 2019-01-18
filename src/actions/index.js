import constants from './../constants';
import v4 from 'uuid/v4';
import * as types from './../constants/ActionTypes';
const distance = require('google-distance-matrix');

export function fetchDistanceDuration(longLat) {
  return function (dispatch) {
    const localLocation = v4();
    const origins = [Object.values(state.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';

    return fetch(distance.matrix(origins, destinations, travelMode, (err, distances) => {
        let dist = distances.rows[0].elements[0].distance.text;
        let dur = distances.rows[0].elements[0].duration.text;}))
    .then(
      response => response.json(),
      error => console.log('an error occured.', error)
    ).then(json => {
      console.log('api results:', json);
      dispatch(findDistDur(json));
      console.log(json);
      return json
    })
  }
}

export const findDistDur = (dontknowwhatgoeshere) => {
  return ({
    type: types.FETCH_DISTANCE_DURATIONS,
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
