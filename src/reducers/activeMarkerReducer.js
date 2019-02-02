import constants from './../constants';
const { initialState, types } = constants;

const activeMarkerReducer = (state = initialState.activeMarker, action) => {

  switch (action.type) {
    case types.ACTIVE_MARKER:
    return state;

  default:
    return state;
  }
}

export default activeMarkerReducer;
