// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Wallet, Todo, Balance }    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import { Link }       from 'react-router-dom';
import { Grid } from 'semantic-ui-react'

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,
    
    // views:
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    return(
      <AnimatedView>
        <Grid className="mt-3">
          <Grid.Row>
            <Grid.Column>
              <Balance  />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Todo />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Wallet />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AnimatedView>
    );
  }
}

export default Home;
