import { combineReducers } from 'redux';
import findCurrentLocationReducer from './findCurrentLocationReducer';
import findDistanceDurationReducer from './findDistanceDurationReducer';

const rootReducer = combineReducers({
  currentLocation: findCurrentLocationReducer,
  bathrooms: findDistanceDurationReducer
});

export default rootReducer;
