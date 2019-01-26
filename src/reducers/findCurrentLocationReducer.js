import constants from './../constants';
const { initialState, types } = constants;

const findCurrentLocationReducer = (state = initialState.currentLocation, action) => {
  console.log("yo botch");
  let newCurrentLocationStateSlice;

  switch (action.type) {
    case types.FIND_CURRENT_LOCATION:
    console.log(action);
    newCurrentLocationStateSlice = Object.assign({}, state);


    return newCurrentLocationStateSlice;



  default:
    return state;
  }
}

export default findCurrentLocationReducer;

// findCurrentLocation() {
//   navigator.geolocation.getCurrentPosition(pos => {
//     const coords = pos.coords;
//     this.setState({
//       currentLocation: {
//         lat: coords.latitude,
//         lng: coords.longitude
//       }
//     });
//     console.log(this.state.currentLocation);
//   });
// }
