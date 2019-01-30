import constants from './../constants';
const { initialState, types } = constants;

const findIndivDistanceDurationReducer = (state = initialState.bathrooms, action) => {
  let newBathroomStateSlice;

  console.log(state);
  switch (action.type) {
    case types.DISTANCE_DURATIONS:
    const newBathroom = ({
      name: action.bathroom[0],
      address: action.bathroom[1],
      distance: action.distDurArray[0],
      duration: action.distDurArray[1],
      needsCode: action.bathroom[2],
      needsKey: action.bathroom[3],
      handicapAccess: action.bathroom[4],
      gendered: action.bathroom[5],
      code: action.bathroom[6],
      id: action.bathroom[7]
    })

    return [
        ...state,
        arr: [...state.bathrooms, newBathroom]
    ]

  default:
    return state;
  }
}

export default findIndivDistanceDurationReducer;

//
// function insertItem(array, action) {
//   return [
//     ...array.slice(0, action.index),
//     action.item,
//     ...array.slice(action.index)
//   ]
// }
