import { combineReducers } from 'redux';
import findCurrentLocationReducer from './findCurrentLocationReducer';
import findDistanceDurationReducer from './findDistanceDurationReducer';
import sortNearestBathroomsReducer from './sortNearestBathroomsReducer';

const rootReducer = combineReducers({
  currentLocation: findCurrentLocationReducer,
  bathrooms: findDistanceDurationReducer,
  nearestBathrooms: sortNearestBathroomsReducer
});

export default rootReducer;
