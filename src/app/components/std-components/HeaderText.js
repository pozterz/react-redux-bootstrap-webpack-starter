// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {Header} from 'semantic-ui-react'

export default class HeaderText extends React.Component {
  state = {
    as: this.props.as,
    content: this.props.content,
    size: this.props.size ? this.props.size: 'medium',
    color: this.props.color,
    icon: this.props.icon,
    align: this.props.align,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  onChange(e) {
    this.setState({value: e.target.value});

    if (this.props.onChange) {
      this
        .props
        .onChange(e.target.value)
    }
  }

  render() {
    return (
      <div className="Header">
        <label>{this.state.label}</label>
        <Header
          as={this.state.as}
          icon={this.state.icon}
          content={this.state.content}
          size={this.state.size}
          color={this.state.color}
          floated={this.state.align}
        />
      </div>
    )
  }

};
