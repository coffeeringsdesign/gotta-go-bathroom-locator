import constants from './../constants';
const { initialState, types } = constants;

const findCurrentLocationReducer = (state = initialState.currentLocation, action) => {
  let newCurrentLocationStateSlice;

  switch (action.type) {
    case types.FIND_CURRENT_LOCATION:
    console.log(action);
    newCurrentLocationStateSlice = Object.assign({}, state);


    //so step 1: create an object of indiv bathroom properties. push it to an empty array,
    //step 2: there is an empty array meant for all bathrooms in state.
    //step 3: make a copy of that state bathroom array.

    // allBathroomArray.push(indivBathroomArray);

    // console.log(newBathroomArrayStateSlice);
    // newBathroomArraySlice = Object.assign({}, theArray);

    return newCurrentLocationStateSlice;



  default:
    return state;
  }
}

export default findCurrentLocationReducer;













findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const coords = pos.coords;
    this.setState({
      currentLocation: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
    console.log(this.state.currentLocation);
  });
}
