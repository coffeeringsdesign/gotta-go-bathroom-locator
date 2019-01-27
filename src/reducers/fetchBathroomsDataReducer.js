import constants from './../constants';
const { initialState, types } = constants;

const fetchBathroomsDataReducer = (state = initialState.initialBathroomData, action) => {
  let newBathroomDataStateSlice;

  switch (action.type) {
    case types.FETCH_BATHROOM_DATA:
    // let coords = action.newCoords;
    // newBathroomDataStateSlice = Object.assign({}, coords);
    return newBathroomDataStateSlice;

  default:
    return state;
  }
}

export default fetchBathroomsDataReducer;
