
import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDurationReducer = (state = initialState.bathrooms, action) => {
  let indivBathroomArray = [];
  let newBathroomArraySlice;

  switch (action.type) {
    case types.DISTANCE_DURATIONS:
    const bDistance = action.distDurArray[0];
    const bDuration = action.distDurArray[1];
    const bName = action.bathName;
    const bAddress = action.bathAddress;
    const bNeedsCode = action.bathNeedsCode;
    const bNeedsKey = action.bathNeedsKey;
    const bHandicapAccess = action.bathHandicapAccess;
    const bGendered = action.bathGendered;
    const bCode = action.bathCode;
    const bId = action.bathId;
    indivBathroomArray.push(bDistance, bDuration, bName, bAddress, bNeedsCode, bNeedsKey, bHandicapAccess, bGendered, bCode, bId);

    console.log(indivBathroomArray);
    // newBathroomArraySlice = Object.assign({}, theArray);

    return newBathroomArraySlice;



  default:
    return state;
  }
}

export default findIndivDistanceDurationReducer;






// import constants from './../constants';
// const { initialState, types } = constants;
//
// const findIndivDistanceDurationReducer = (state = initialState.bathrooms, action) => {
//   let newBathroomArraySlice;
//
//   switch (action.types) {
//     case type.FETCH_DISTANCE_DURATIONS:
//     console.log('YAYYYYYYYYY');
//     const bathroomArray = [];
//     bathroomArray.push(action.bathName, action.bathAddress, action.bathNeedsKey)
//
//     const distance = action.distance;
//     newBathroomArraySlice = Object.assign({}, state, bathroomArray);
//     return newBathroomArraySlice;
//   default:
//     console.log('BOOOOOOOOOO');
//     return state;
//   }
// }
//
// export default findIndivDistanceDurationReducer;
