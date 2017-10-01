// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Wallet, Todo, Balance, Walllist, Wishlist }    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import { Link }       from 'react-router-dom';
import { Grid,Dimmer, Loader, Message } from 'semantic-ui-react'
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
  { path: 'wallet', queryParams: ['orderByChild=-createdAt'] },
  { path: 'money' },
  { path: 'wishlist', queryParams: ['orderByChild=-createdAt'] }
])
@connect(
  ({ firebase }) => ({
    money: dataToJS(firebase, 'money'),
    wallet: dataToJS(firebase, 'wallet'),
    auth: pathToJS(firebase, 'auth'),
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
    const { enterHome,auth,firebase } = this.props;
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

  onWalletSubmit(data){
    const { newWalletData } = this.props;
    const { money } = this.props;
    data.createdAt = this.props.firebase.database.ServerValue.TIMESTAMP
   
    if(data.type === 'income') {
      this.props.firebase.update('/money', { total: parseFloat(money.total)+parseFloat(data.amount)})
    } else {
      this.props.firebase.update('/money', { total: parseFloat(money.total)-parseFloat(data.amount)})
    }
    return this.props.firebase.push('/wallet', data);
    console.log('submitted', data);
  }

  onWishlistSubmit(data){
    const { newWalletData } = this.props;
    data.createdAt = this.props.firebase.database.ServerValue.TIMESTAMP
    return this.props.firebase.push('/wishlist', data);
    console.log('submitted', data);
  }

  deleteWish = id => {
    return this.props.firebase.remove(`/wishlist/${id}`).catch(err => {
      console.error('Error removing wishlist: ', err) // eslint-disable-line no-console
      this.setState({ error: 'Error Removing wishlist' })
      return Promise.reject(err)
    })
  }

  deleteWall = (data,id) => {
    const { money } = this.props;
    console.log(parseFloat(money.total))
    if(data.type === 'income') {
      this.props.firebase.update('/money', { total: parseFloat(money.total)-parseFloat(data.amount)})
    } else {
      this.props.firebase.update('/money', { total: parseFloat(money.total)+parseFloat(data.amount)})
    }
    return this.props.firebase.remove(`/wallet/${id}`).catch(err => {
      console.error('Error removing wallet: ', err) // eslint-disable-line no-console
      this.setState({ error: 'Error Removing wallet' })
      return Promise.reject(err)
    })
  }

  render() {
    const { wallet } = this.props;
    const { money } = this.props;
    const { wishlist } = this.props;
    

    const TotalMoney = !isLoaded(money)
      ? <Dimmer active inverted>
          <Loader size='medium'>Loading</Loader>
        </Dimmer>
      : isEmpty(money)
        ? <Message info>
            <Message.Header>Empty Record.</Message.Header>
          </Message>
        : Object.keys(money).map(
          (key, id) => (
            <Balance key={key} money={money[key]} />
          )
        )

    const walllist = !isLoaded(wallet)
      ? <Dimmer active inverted>
          <Loader size='medium'>Loading</Loader>
        </Dimmer>
      : isEmpty(wallet)
        ? <Message info>
            <Message.Header>Empty Record.</Message.Header>
          </Message>
        : Object.keys(wallet).sort((a,b) => {return wallet[b].createdAt-wallet[a].createdAt}).map(
            (key, id) => (
              <Walllist key={key} id={key} money={money} onDeleteWall={this.deleteWall} wallet={wallet[key]} />
            )
          )
        

    const wishlists = !isLoaded(wishlist)
      ? <Dimmer active inverted>
          <Loader  size='medium'>Loading</Loader>
        </Dimmer>
      : isEmpty(wishlist)
        ? <Message info>
            <Message.Header>Empty Record.</Message.Header>
          </Message>
        : Object.keys(wishlist).sort((a,b) => {return wishlist[b].createdAt-wishlist[a].createdAt}).map(
          (key, id) => (
            <Wishlist key={key} id={key} money={money} onDeleteWish={this.deleteWish}  wish={wishlist[key]} />
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
              <Todo onSubmit={data => this.onWishlistSubmit(data)} wallet={this.props.wallet}  />
              { wishlists }
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Wallet onSubmit={data => this.onWalletSubmit(data)} wallet={this.props.wallet} />
              { walllist }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AnimatedView>
    );
  }
}

export default Home;
