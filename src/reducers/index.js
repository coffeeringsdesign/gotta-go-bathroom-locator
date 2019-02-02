import { combineReducers } from 'redux';
import findCurrentLocationReducer from './findCurrentLocationReducer';
import findDistanceDurationReducer from './findDistanceDurationReducer';
import sortNearestBathroomsReducer from './sortNearestBathroomsReducer';
import activeMarkerReducer from './activeMarkerReducer';
import showingInfoWindowReducer from './showingInfoWindowReducer';
import selectedPlaceReducer from './selectedPlaceReducer';

const rootReducer = combineReducers({
  currentLocation: findCurrentLocationReducer,
  bathrooms: findDistanceDurationReducer,
  nearestBathrooms: sortNearestBathroomsReducer,
  activeMarker: activeMarkerReducer,
  showingInfoWindow: showingInfoWindowReducer,
  selectedPlace: selectedPlaceReducer
});

export default rootReducer;
