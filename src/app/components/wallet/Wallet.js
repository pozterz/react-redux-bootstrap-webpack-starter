// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon} from 'semantic-ui-react'

export default class Wallet extends React.Component {

  onDataChange(field, name) {
    console.log('field',field,name);
  }

  render() {
    return (
      <div className="Wallet">
        <Card.Group>
          <Card fluid color='blue'>
            <Card.Content>
              <Card.Header content="< Money Logs />" />
              <Divider section/>
              <Form>
                <Form.Field>
                  <TextBox
                    icon="quote right"
                    iconpos="left"
                    type="text"
                    name="money"
                    value=""
                    placeholder="Description"
                    size="tiny"
                    onChange={value => this.onDataChange('money', value)}/>
                </Form.Field>
                <Form.Field>
                  <TextBox
                    icon="usd"
                    iconpos="left"
                    type="text"
                    name="amount"
                    value=""
                    placeholder="How Much ?"
                    size="tiny"
                    onChange={value => this.onDataChange('amount', value)}/>
                </Form.Field>
                <Button.Group floated="right">
                  <Button
                    primary
                  >
                  <Icon name="checkmark" />
                  Save</Button>
                </Button.Group>
              </Form>
            </Card.Content>
          </Card>
        </Card.Group>
        {this.props.children}
      </div>
    );
  }
};

Wallet.propTypes = {
  children: PropTypes.node
};
