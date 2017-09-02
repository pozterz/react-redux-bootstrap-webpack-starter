// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Segment, Header,Statistic } from 'semantic-ui-react'

export default class Balance extends React.Component {
  state = {
    money: this.props.money
  }

  componentDidMount() {
    console.log('xD', this.state);    
  }

  numberWithCommas(x) {
    return x.toLocaleString(undefined,{minimumFractionDigits: 2})
}


  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  render() {
    return (
      <div className="Balance">
        <Segment clearing color='blue'>
          <Header size='huge' floated='right'>
            <Statistic horizontal color='green'>
              <Statistic.Value >{this.numberWithCommas(this.state.money)}</Statistic.Value>
              <Statistic.Label>THB</Statistic.Label>
            </Statistic>
          </Header>
        </Segment>
        {this.props.children}
      </div>
    );
  }
};

Balance.propTypes = {
  children: PropTypes.node
};
