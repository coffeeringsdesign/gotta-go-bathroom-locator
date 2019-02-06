import constants from './../constants';
const { initialState, types } = constants;

const showingInfoWindowReducer = (state = initialState.showingInfoWindow, action) => {

  switch (action.type) {
    case types.SHOW_INFO_WINDOW:

    //// need to copy state and switch it to true
    return state;

  default:
    return state;
  }
}

export default showingInfoWindowReducer;
