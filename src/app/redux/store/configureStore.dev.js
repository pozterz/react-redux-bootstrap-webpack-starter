// @flow weak

import {
  createStore,
  applyMiddleware
}                               from 'redux';
import { createLogger }         from 'redux-logger';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from '../modules/reducers';
import fetchMiddleware          from '../middleware/fetchMiddleware';
import { composeWithDevTools }  from 'redux-devtools-extension';
import { reactReduxFirebase } from 'react-redux-firebase'

const loggerMiddleware = createLogger({
  level     : 'info',
  collapsed : true
});

const firebaseConfig = {
  apiKey: "AIzaSyC3kzyX5c0Uixav-E6Q9ZkPOWV2blAvHsg",
  authDomain: "vue-firebase-5bfd6.firebaseapp.com",
  databaseURL: "https://vue-firebase-5bfd6.firebaseio.com",
  projectId: "vue-firebase-5bfd6",
  storageBucket: "vue-firebase-5bfd6.appspot.com",
  messagingSenderId: "1043717277183"
}

const reduxFirebaseConfig = { userProfile: 'users' }

// createStore : enhancer
const enhancer = composeWithDevTools(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
  applyMiddleware(
    thunkMiddleware,
    fetchMiddleware,
    loggerMiddleware // logger at the end
  )
);

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../modules/reducers', () =>
      store.replaceReducer(require('../modules/reducers').default)
    );
  }
  return store;
}
