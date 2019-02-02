import constants from './../constants';
const { initialState, types } = constants;

const selectedPlaceReducer = (state = initialState.selectedPlace, action) => {

  switch (action.type) {
    case types.SELECT_A_PLACE:
    return state;

  default:
    return state;
  }
}

export default selectedPlaceReducer;
