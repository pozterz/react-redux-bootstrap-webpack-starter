// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  BackToTop
}                             from '../../components';
import navigationModel        from '../../config/navigation.json';
import MainRoutes             from '../../routes/MainRoutes';
import { Container } from 'semantic-ui-react'

class App extends Component {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView: PropTypes.string

  };
  
  state = {
    navModel : navigationModel,
  };

  render() {

    return (
      <div id="appContainer">
        <Container textAlign='justified' >
          <MainRoutes />
        </Container>
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }

}

export default App;
