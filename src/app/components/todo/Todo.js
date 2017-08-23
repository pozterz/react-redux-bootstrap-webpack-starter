// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Segment, Header } from 'semantic-ui-react'

const Todo = (props) => {
  return (
    <div className="Todo">
      <Segment color='blue'>
        Pellentesque habitant morbi tristique senectus.
      </Segment>
      {props.children}
    </div>
  );
};

Todo.propTypes = {
  children: PropTypes.node
};

export default Todo;
