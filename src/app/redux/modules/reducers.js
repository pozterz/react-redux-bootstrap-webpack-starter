// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views                from './views';
import wallet                from './wallet';
import fakeModuleWithFetch  from './fakeModuleWithFetch';
import userAuth             from './userAuth';
import { firebaseStateReducer } from 'react-redux-firebase'

export const reducers = {
  wallet,
  views,
};

export default combineReducers({
  ...reducers,
  routing: routerReducer,
  firebase: firebaseStateReducer
});
