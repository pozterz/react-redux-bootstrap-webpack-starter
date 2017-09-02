// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon, Label} from 'semantic-ui-react'

export default class Walllist extends React.Component {
  state = {
    wallet: this.props.wallet,
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

  render() {
    const { onDeleteWall,id } = this.props;
    return (
      <div className="Walllist">
        <Card.Group>
          <Card fluid color='red'>
            <Card.Content>
              <Card.Header content={this.state.wallet.description} />
              <Label as='a' color='red' corner='top right' icon="close" onClick={() => onDeleteWall(this.state.wallet, this.state.wallet._key || id) }></Label>
            </Card.Content>
            <Card.Content>
              <Label color={(this.state.wallet.type === 'income')?'green':'red'} ribbon>{this.state.wallet.type}</Label>
              <span><Icon color='green' name='usd' />{this.state.wallet.amount}</span>
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
