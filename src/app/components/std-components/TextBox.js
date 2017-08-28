// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'semantic-ui-react'

export default class TextBox extends React.Component {
  state = {
    type: this.props.label,
    label: this.props.label,
    size: this.props.size ? this.props.size: 'medium',
    name: this.props.name,
    icon: this.props.icon,
    iconpos: this.props.iconpos,
    placeholder: this.props.placeholder,
    value: this.props.value
      ? this.props.value
      : ''
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
      <div className="TextBox">
        <label>{this.state.label}</label>
        <Input
          fluid
          icon={this.state.icon}
          iconPosition={this.state.iconpos} 
          type={this.state.type}
          size={this.state.size}
          name={this.state.name}
          placeholder={this.state.placeholder}
          value={this.state.value}
          onChange={e => this.onChange(e)}
        />
      </div>
    )
  }

};
