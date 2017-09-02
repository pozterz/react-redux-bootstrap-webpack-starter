// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon} from 'semantic-ui-react'

export default class Wallet extends React.Component {

  state = {
    data: this.props.data,
  }

  componentDidMount() {
    this.defaultState();
  }

  defaultState(){
    this.setState({
      data: {
        description: '',
        amount: 0,
        type: 'income'
      },
      income: true,
      outcome: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  handleClickIncome = () => this.setState({ income: !this.state.income, outcome: false, data: {...this.state.data,type: 'income' } })
  handleClickOutcome = () => this.setState({ outcome: !this.state.outcome, income: false , data: {...this.state.data,type: 'outcome' }  })

  onDataChange(field, name) {
    this.setState({
      data: {
        ...this.state.data,
        [field]: name,
      },
    });
  }
  
  onSubmit(event){
    event.preventDefault();
    if(this.props.onSubmit && this.state.data.description != ''){
      this.props.onSubmit(this.state.data);
    }
    this.defaultState();
  }

  render() {
    const { income } = this.state
    const { outcome } = this.state
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
                    name="description"
                    value={this.state.data? this.state.data.description : null}
                    placeholder="Description"
                    size="tiny"
                    onChange={value => this.onDataChange('description', value)}/>
                </Form.Field>
                <Form.Field>
                  <TextBox
                    icon="usd"
                    iconpos="left"
                    type="number"
                    name="amount"
                    value={this.state.data? this.state.data.amount : null}
                    placeholder="How Much ?"
                    size="tiny"
                    onChange={value => this.onDataChange('amount', value)}/>
                </Form.Field>
                <Button.Group>
                  <Button toggle active={income} onClick={this.handleClickIncome}>
                    Income
                  </Button>
                  <Button.Or />
                  <Button toggle active={outcome} onClick={this.handleClickOutcome}>
                    Outcome
                  </Button>
                </Button.Group>
                <Button.Group floated="right">
                  <Button
                    primary
                    onClick={e => this.onSubmit(e)}
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
