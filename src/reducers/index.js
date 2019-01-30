import { combineReducers } from 'redux';
import findCurrentLocationReducer from './findCurrentLocationReducer';
import findIndivDistanceDurationReducer from './findIndivDistanceDurationReducer';

const rootReducer = combineReducers({
  currentLocation: findCurrentLocationReducer,
  individualBathroom: findIndivDistanceDurationReducer
});

export default rootReducer;
