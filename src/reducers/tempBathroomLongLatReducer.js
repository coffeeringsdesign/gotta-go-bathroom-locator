import constants from './../constants';
const { initialState, types } = constants;

const tempBathroomLongLatReducer = (state = initialState.tempBathroomLongLat, action) => {
  let tempNewLongLatStateSlice;

  switch (action.type) {
    case types.ADD_NEW_BATHROOM_LAT_LNG:
    let lat = action.lat;
    let lng = action.lng;
    let longLat = { lat, lng }
    tempNewLongLatStateSlice = Object.assign(action.bathroom, {longLat});
    return tempNewLongLatStateSlice;

  default:
    return state;
  }
}

export default tempBathroomLongLatReducer;
