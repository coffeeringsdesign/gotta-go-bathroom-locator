import constants from './../constants';
import v4 from 'uuid/v4';

export function fetchDistanceDuration(longLat) {
  return function (dispatch) {
    const localLocation = v4();
    const origins = [Object.values(this.state.currentLocation).join()];
    const destinations = [Object.values(longLat).join()];
    const travelMode = this.state.travelMode.length ? this.state.travelMode : 'WALKING';

    return fetch(----api url goes here --).then(
      response => response.json(),
      error => console.log('an error occured.', error)
    ).then(function(json) {
      console.log('here is the api response', json);
    });
  };
}

  // let dist = distances.rows[0].elements[0].distance.text;
