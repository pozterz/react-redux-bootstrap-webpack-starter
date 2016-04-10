'use strict';
/* eslint no-process-env:0 */

import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  // hashHistory,
  browserHistory
 }                              from 'react-router';
import { Provider }             from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { App }                  from '../containers';
import { Home, About }          from '../views';
import configureStore           from '../redux/store/configureStore';
import DevTools                 from '../redux/devTools/DevTools.jsx';


const store         = configureStore({views: 'none'});
const syncedHistory = syncHistoryWithStore(browserHistory, store);


export const Routes = () => {
  return (
    <Provider store={store}>
      <div>
        <Router history={syncedHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={Home} />
            <Route path="/about" component={About} />
          </Route>
        </Router>
        { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
      </div>
    </Provider>
  );
};
