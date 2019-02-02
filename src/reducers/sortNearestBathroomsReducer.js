import constants from './../constants';
const { initialState, types } = constants;

const sortNearestBathroomsReducer = (state = initialState.nearestBathrooms, action) => {

  switch (action.type) {
    case types.REORDER_BATHROOMS:

    let newBathroomArray = action.bathrooms;
    console.log(newBathroomArray); //getting the correct array
    function compare(a, b){

      let aDistance = a.distance;
      console.log(aDistance);
      let bDistance= b.distance;
      let comparison = 0;

      if (aDistance > bDistance) {
        comparison = 1;
      } else if (aDistance < bDistance) {
        comparison = -1;
      }
      return comparison;
    }

    let newReorderedBathroomsStateSlice = newBathroomArray.sort(compare);
    console.log(newReorderedBathroomsStateSlice);

    return newReorderedBathroomsStateSlice;

  default:
    return state;
  }
}

export default sortNearestBathroomsReducer;
