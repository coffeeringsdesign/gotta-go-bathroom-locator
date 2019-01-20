import constants from './../constants';
const { initialState, c } = constants;

const findIndivDistanceDuration = (state = initialState.bathrooms, action) => {
  let newBathroomArraySlice; // getting called
  const { distDurArray, bathName, bathAddress, bathNeedsCode, bathNeedsKey, bathHandicapAccess, bathGendered, bathCode, bathId } = action;

  switch (action.type) {
    case c.FETCH_DISTANCE_DURATIONS:
    console.log("bitch");
    const duration = action.duration;
    const distance = action.distance;
    newBathroomArraySlice = Object.assign({}, duration, distance);
      return newBathroomArraySlice;

// ALWAYS have a default case in a reducer
  default:
    return state;
  }
}


export default findIndivDistanceDuration;
