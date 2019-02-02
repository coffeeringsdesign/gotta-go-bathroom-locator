import constants from './../constants';
const { initialState, types } = constants;

const sortNearestBathroomsReducer = (state = initialState.nearestBathrooms, action) => {
  let newReorderedBathroomsStateSlice = [];

  switch (action.type) {
    case types.REORDER_BATHROOMS:
    console.log(state);



    return newReorderedBathroomsStateSlice;

  default:
    return state;
  }
}

export default sortNearestBathroomsReducer;
