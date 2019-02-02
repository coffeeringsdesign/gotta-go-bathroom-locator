import constants from './../constants';
const { initialState, types } = constants;

const sortNearestBathroomsReducer = (state = initialState.nearestBathrooms, action) => {

  switch (action.type) {
    case types.REORDER_BATHROOMS:
    let newBathroomArray = action.bathrooms;

    function compare(a, b) {
      let aDistance = (a.distance.split(' ').shift()) * 1000;
      let bDistance = (b.distance.split(' ').shift()) * 1000;
      return aDistance - bDistance;
    }

    return newBathroomArray.sort(compare);

  default:
    return state;
  }
}

export default sortNearestBathroomsReducer;
