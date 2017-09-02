// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Wallet, Todo, Balance, Walllist, Wishlist }    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import { Link }       from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  helpers,
  pathToJS,
  dataToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

@firebaseConnect([
  { type: 'once', path: 'wallet' },
  { type: 'once', path: 'money' },
  { type: 'once', path: 'wishlist' }
])
@connect(
  ({ firebase }) => ({
    money: dataToJS(firebase, 'money'),
    wallet: dataToJS(firebase, 'wallet'),
    wishlist: dataToJS(firebase, 'wishlist'),
  })
)

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

  
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.wallet,
    });
  }
  

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    const { wallet } = this.props;
    const { money } = this.props;
    const { wishlist } = this.props;

    const TotalMoney = !isLoaded(money)
      ? 'Loading'
      : isEmpty(money)
        ? 'Empty'
        : Object.keys(money).map(
          (key, id) => (
            <Balance key={key} money={money[key]} />
          )
        )

    const walllist = !isLoaded(wallet)
      ? 'Loading'
      : isEmpty(wallet)
        ? 'Empty'
        : Object.keys(wallet).map(
          (key, id) => (
            <Walllist key={key} id={id} wallet={wallet[key]} />
          )
        )

    const wishlists = !isLoaded(wishlist)
      ? 'Loading'
      : isEmpty(wishlist)
        ? 'Empty'
        : Object.keys(wishlist).map(
          (key, id) => (
            <Wishlist key={key} id={id} wish={wishlist[key]} />
          )
        )

    return(
      <AnimatedView>
        <Grid className="mt-3">
          <Grid.Row>
            <Grid.Column>
              { TotalMoney }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Todo />
              { wishlists }
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Wallet wallet={this.props.wallet} />
              { walllist }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AnimatedView>
    );
  }
}

export default Home;
