import constants from './../constants';
const { initialState, c } = constants;

const findIndivDistanceDuration = (state = initialState.bathrooms, action) => {
  let newBathroomArraySlice; // getting called
  // const action = { distDurArray,
  // bathName,
  // bathAddress,
  // bathNeedsCode,
  // bathNeedsKey,
  // bathHandicapAccess,
  // bathGendered,
  // bathCode,
  // bathId, };

  switch (action.type) {
    case c.FETCH_DISTANCE_DURATIONS:
    console.log(state);
    const bathroomArray = [];
    bathroomArray.push(action.bathName, action.bathAddress, action.bathNeedsKey)
    const distance = action.distance;
    newBathroomArraySlice = Object.assign({}, state, bathroomArray);



      return newBathroomArraySlice;

// ALWAYS have a default case in a reducer
  default:
// console.log(state); state is getting logged currently
    return state;
  }
}


export default findIndivDistanceDuration;
