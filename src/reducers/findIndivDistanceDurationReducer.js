import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDuration = (state = bathrooms, action) => {
  let newDistanceDurationSlice;
  switch (action.type) {

    // Mark the state as "loading" so we can show a spinner or something
    // Also, reset any errors. We're starting fresh.
    case types.FETCH_DISTANCE_DURATIONS:
    const duration = action.duration;
    const distance = action.distance;
    newDistanceDurationSlice = Object.assign({}, duration, distance);
      return newDistanceDurationSlice;

// ALWAYS have a default case in a reducer
  default:
    return state;
  }
}


export default findIndivDistanceDuration;
