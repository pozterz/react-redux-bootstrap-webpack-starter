// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import App                    from './App';
import { withRouter }         from 'react-router';
import { firebaseConnect, isLoaded, isEmpty, pathToJS, dataToJS } from 'react-redux-firebase'

const mapStateToProps = (state) => {
  return {
    // views
    currentView:  state.views.currentView,
    auth: pathToJS(state.firebase, 'auth'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      ...viewsActions
    },
    dispatch
  );
};

// IMPORTANT: witRouter is "needed here" to avoid blocking routing:
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
