// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon} from 'semantic-ui-react'

export default class Walllist extends React.Component {
  state = {
    wallet: this.props.wallet
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
      <div className="Walllist">
        <Card.Group>
          <Card fluid color='red'>
            <Card.Content>
              <Card.Header content={this.state.wallet.name} />
              <Card.Content description={this.state.wallet.description} />
              <Card.Content description={this.state.wallet.amount} />
              <Card.Content description={this.state.wallet.type} />
            </Card.Content>
          </Card>
        </Card.Group>
        {this.props.children}
      </div>
    );
  }
};

Walllist.propTypes = {
  children: PropTypes.node
};
