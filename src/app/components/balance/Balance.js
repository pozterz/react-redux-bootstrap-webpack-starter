// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Segment, Header } from 'semantic-ui-react'

const Balance = (props) => {
  return (
    <div className="Balance">
      <Segment clearing color='blue'>
        <Header size='huge' floated='right'>
          9999999999999
        </Header>
      </Segment>
      {props.children}
    </div>
  );
};

Balance.propTypes = {
  children: PropTypes.node
};

export default Balance;
