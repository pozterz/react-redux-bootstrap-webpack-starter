// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as walletActions      from '../../redux/modules/wallet';
import Home                   from './Home';
import {
  firebaseConnect,
  helpers,
  pathToJS,
  dataToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

const mapStateToProps = (state) => {
  return {
    auth: pathToJS(state.firebase, 'auth'),
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterHome: viewsActions.enterHome,
      leaveHome: viewsActions.leaveHome,
      newWalletData: walletActions.newWalletData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
