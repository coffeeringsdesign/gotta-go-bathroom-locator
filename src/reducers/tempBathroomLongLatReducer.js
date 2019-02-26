import constants from './../constants';
const { initialState, types } = constants;

const tempBathroomLongLatReducer = (state = initialState.tempBathroomLongLat, action) => {

  switch (action.type) {
    case types.ADD_NEW_BATHROOM_LAT_LNG:
    return [
        ...state,
        {
          name: action.bathroom[0],
          address: action.bathroom[1],
          longLat: action.bathroom[2],
          distance: action.distDurArray[0],
          duration: action.distDurArray[1],
          needsCode: action.bathroom[3],
          needsKey: action.bathroom[4],
          handicapAccess: action.bathroom[5],
          gendered: action.bathroom[6],
          code: action.bathroom[7],
          id: action.bathroom[8]
        }
    ]

  default:
    return state;
  }
}

export default tempBathroomLongLatReducer;
