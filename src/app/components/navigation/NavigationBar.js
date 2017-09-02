// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import Humburger          from './humburger/Humburger';
import LeftNav            from './leftNav/LeftNav';
import RightNav           from './rightNav/RightNav';

const NavigationBar = ({
  brand,
  navModel,
  handleLeftNavItemClick,
  handleRightNavItemClick
}) => {
  return (
    <div className="container ui tiny menu">
      <a className="active item">
        Home
      </a>
      <a className="item">
        Messages
      </a>
      <div className="right menu">
        <div className="ui dropdown item">
          Language <i className="dropdown icon"></i>
          <div className="menu">
            <a className="item">English</a>
            <a className="item">Russian</a>
            <a className="item">Spanish</a>
          </div>
        </div>
        <div className="item">
            <div className="ui primary button">Sign Up</div>
        </div>
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  brand:                    PropTypes.string,
  handleLeftNavItemClick:   PropTypes.func,
  handleRightNavItemClick:  PropTypes.func,
  navModel:                 PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  })
};

NavigationBar.defaultProps  = {
  brand  : 'brand'
};

export default NavigationBar;
