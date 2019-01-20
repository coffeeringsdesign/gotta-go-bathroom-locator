import { initialState } from './InitialState';
import * as types from './ActionTypes';
import firebaseConfig from './firebaseConfig';

export default {
  firebaseConfig: firebaseConfig,
  initialState: initialState,
  c: types
};
