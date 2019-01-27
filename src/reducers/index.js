import { combineReducers } from 'redux';

import findCurrentLocationReducer from './findCurrentLocationReducer';
import findIndivDistanceDurationReducer from './findIndivDistanceDurationReducer';
import fetchBathroomsDataReducer from './fetchBathroomsDataReducer';


const rootReducer = combineReducers({
  currentLocation: findCurrentLocationReducer,
  individualBathroom: findIndivDistanceDurationReducer,
  initialBathroomData: fetchBathroomsDataReducer
});

export default rootReducer;
