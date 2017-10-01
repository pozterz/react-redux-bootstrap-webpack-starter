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
  apiKey: "AIzaSyDFclyGdzlJY48r-X3_0xMAPz0iYXrxI6g",
  authDomain: "todowallet.firebaseapp.com",
  databaseURL: "https://todowallet.firebaseio.com",
  projectId: "todowallet",
  storageBucket: "",
  messagingSenderId: "1062641768371"
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
