import constants from './../constants';
import v4 from 'uuid/v4';
const distance = require('google-distance-matrix');

export function fetchDistanceDuration(longLat) {
  return function (dispatch) {
    const localLocation = v4();
    const origins = [Object.values(this.state.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';

    return fetch(destinations).then(
      response => response.json(),
      error => console.log('an error occured.', error)
    ).then(function(json) {
      console.log('here is the api response', json);
    });
  };
}

  // let dist = distances.rows[0].elements[0].distance.text;

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
