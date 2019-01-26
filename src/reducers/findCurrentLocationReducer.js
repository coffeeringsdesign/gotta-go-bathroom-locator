import constants from './../constants';
const { initialState, types } = constants;

const findCurrentLocationReducer = (state = initialState.currentLocation, action) => {
  let newCurrentLocationStateSlice;

  switch (action.type) {
    case types.FIND_CURRENT_LOCATION:
    let coords = action.newCoords;
    newCurrentLocationStateSlice = Object.assign({}, coords);
    return newCurrentLocationStateSlice;

  default:
    return state;
  }
}

export default findCurrentLocationReducer;
