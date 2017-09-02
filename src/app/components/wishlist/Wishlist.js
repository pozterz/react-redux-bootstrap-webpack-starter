// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon} from 'semantic-ui-react'

export default class Wishlist extends React.Component {
  state = {
    wish: this.props.wish
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  componentDidMount() {
    console.log('xD', this.state);    
  }

  onDataChange(field, name) {
    console.log('field',field,name);
  }

  render() {
    return (
      <div className="Wishlist">
        <Card.Group>
          <Card fluid color='red'>
            <Card.Content>
              <Card.Header content={this.state.wish.name} />
              <Card.Content description={this.state.wish.description} />
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
