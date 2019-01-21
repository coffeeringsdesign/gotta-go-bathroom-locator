import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDurationReducer = (state = initialState.bathrooms, action) => {
  let newBathroomArraySlice;

  switch (action.types) {
    case types.FETCH_DISTANCE_DURATIONS:
    console.log('YAYYYYYYYYY');
    const bathroomArray = [];
    bathroomArray.push(action.bathName, action.bathAddress, action.bathNeedsKey)

    const distance = action.distance;
    newBathroomArraySlice = Object.assign({}, state, bathroomArray);
    return newBathroomArraySlice;
  default:
    console.log('BOOOOOOOOOO');
    return state;
  }
}

export default findIndivDistanceDurationReducer;
