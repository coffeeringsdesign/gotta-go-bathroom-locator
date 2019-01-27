import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDurationReducer = (state = initialState.individualBathroom, action) => {
  let newBathroomStateSlice;

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
    newBathroomStateSlice = Object.assign({}, newBathroom);
    return newBathroomStateSlice;

  default:
    return state;
  }
}

export default findIndivDistanceDurationReducer;
