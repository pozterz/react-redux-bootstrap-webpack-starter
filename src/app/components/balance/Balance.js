// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Segment, Header,Statistic } from 'semantic-ui-react'

export default class Balance extends React.Component {
  render() {
    return (
      <div className="Balance">
        <Segment clearing color='blue'>
          <Header size='huge' floated='right'>
            <Statistic horizontal>
              <Statistic.Value>5,550</Statistic.Value>
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
