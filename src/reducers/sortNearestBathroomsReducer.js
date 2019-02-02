import constants from './../constants';
const { initialState, types } = constants;

const sortNearestBathroomsReducer = (state = initialState.nearestBathrooms, action) => {

  switch (action.type) {
    case types.REORDER_BATHROOMS:

    let newBathroomArray = action.bathrooms;
    console.log(newBathroomArray); //getting the correct array


    let please = newBathroomArray.sort(function(a, b) {
      // console.log(newReorderedBathroomsStateSlice);
      return a.distance.split(" ").shift() - b.distance.split(" ").shift();
    })
    let trial = ['what', 'the', 'fucking', 'hell'];
    console.log(trial);
    console.log(please);
    // function compare(a, b){
    //   let aDistance = a.distance.split(" ").shift();
    //   // console.log(aDistance);
    //   let bDistance= b.distance.split(" ").shift();
    //   // console.log(bDistance);
    //   let comparison = 0;
    //
    //   if (aDistance > bDistance) {
    //     comparison = 1;
    //   } else if (aDistance < bDistance) {
    //     comparison = -1;
    //   }
    //   console.log(comparison);
    //   return comparison;
    // }
    //
    // let newReorderedBathroomsStateSlice = newBathroomArray.sort(compare);

    // console.log(newReorderedBathroomsStateSlice);

    return state;

  default:
    return state;
  }
}

export default sortNearestBathroomsReducer;
