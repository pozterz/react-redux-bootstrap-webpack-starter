// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Segment, Header } from 'semantic-ui-react'

const Wallet = (props) => {
  return (
    <div className="Wallet">
      <Segment color='blue'>
        Pellentesque habitant morbi tristique senectus.
      </Segment>
      {props.children}
    </div>
  );
};

Wallet.propTypes = {
  children: PropTypes.node
};

export default Wallet;
