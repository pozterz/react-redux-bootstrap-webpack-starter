// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon, Rating, Label} from 'semantic-ui-react'

export default class Wishlist extends React.Component {
  state = {
    wish: this.props.wish,
    id: this.props.id,
    money: this.props.money
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  componentDidMount() {
  }

  onDataChange(field, name) {
    console.log('field',field,name);
  }

  onRated(field, data) {
    
  }

  render() {
    const { onDeleteWish,id } = this.props;
    return (
      <div className="Wishlist">
        <Card.Group>
          <Card fluid color='red'>
            <Card.Content>
              <Card.Header content={this.state.wish.want} />
              <Label as='a' color='red' corner='top right' icon="close" onClick={() => onDeleteWish(this.state.wish._key || id) }></Label>
            </Card.Content>
            <Card.Content>
              <Icon color='green' name='usd' />{this.state.wish.price}
              <Label basic color='red' pointing='left'><Icon color='green' name='usd' />{parseInt(this.state.money.total) - parseInt(this.state.wish.price)}</Label>
            </Card.Content>
            <Card.Content>
              <Rating name="rating" onRate={(value, data) => this.onRated('rating',data)} icon='heart' defaultRating={this.state.wish.rating ? this.state.wish.rating:0} maxRating={5} />
            </Card.Content>
          </Card>
        </Card.Group>
        {this.props.children}
      </div>
    );
  }
};

Wishlist.propTypes = {
  children: PropTypes.node
};
