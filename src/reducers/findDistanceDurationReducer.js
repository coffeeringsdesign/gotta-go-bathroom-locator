import constants from './../constants';
const { initialState, types } = constants;

const findDistanceDurationReducer = (state = initialState.bathrooms, action) => {

  switch (action.type) {
    case types.DISTANCE_DURATIONS:

    return [
        ...state,
        {
          name: action.bathroom[0],
          address: action.bathroom[1],
          distance: action.distDurArray[0],
          duration: action.distDurArray[1],
          needsCode: action.bathroom[2],
          needsKey: action.bathroom[3],
          handicapAccess: action.bathroom[4],
          gendered: action.bathroom[5],
          code: action.bathroom[6],
          id: action.bathroom[7]
        }
    ]

  default:
    return state;
  }
}

export default findDistanceDurationReducer;
