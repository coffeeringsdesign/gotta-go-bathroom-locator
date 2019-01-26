
import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDurationReducer = (state = initialState.individualBathroom, action) => {
  let newBathroomArrayStateSlice;

  switch (action.type) {
    case types.DISTANCE_DURATIONS:
    const newBathroom = ({
      name: action.bathName,
      address: action.bathAddress,
      distance: action.distDurArray[0],
      duration: action.distDurArray[1],
      needsCode: action.bathNeedsCode,
      needsKey: action.bathNeedsKey,
      handicapAccess: action.bathHandicapAccess,
      gendered: action.bathGendered,
      code: action.bathCode,
      id: action.bathId
    })
    console.log(newBathroom);
    newBathroomArrayStateSlice = Object.assign({}, state, newBathroom);

    //so step 1: create an object of indiv bathroom properties. push it to an empty array,
    //step 2: there is an empty array meant for all bathrooms in state.
    //step 3: make a copy of that state bathroom array.

    // allBathroomArray.push(indivBathroomArray);

    // console.log(newBathroomArrayStateSlice);
    // newBathroomArraySlice = Object.assign({}, theArray);

    return newBathroomArrayStateSlice;



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
