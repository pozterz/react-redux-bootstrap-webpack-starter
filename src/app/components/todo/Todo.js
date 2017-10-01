// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../std-components/TextBox'
import HeaderText from '../std-components/HeaderText'
import {Form, Card, Header, Divider, Button, Icon, Rating} from 'semantic-ui-react'

export default class Todo extends React.Component {

  state = {
    data: this.props.data,
  }

  componentDidMount() {
    this.defaultState();
  }

  defaultState(){
    this.setState({
      data: {
        want: '',
        rating: 1,
        price: 0,
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

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
    if(this.props.onSubmit && this.state.data.want != ''){
      this.props.onSubmit(this.state.data);
    }
    this.defaultState();
  }

  onRated(field,data) {
    this.setState({
      data: {
        ...this.state.data,
        [field]: data.rating,
      },
    });
  }

  render() {
    return (
      <div className="Todo">
        <Card.Group>
          <Card fluid color='blue'>
            <Card.Content>
              <Card.Header content="< Want/Need />" />
              <Divider section/>
              <Form>
                <Form.Field>
                  <TextBox
                    icon="quote right"
                    iconpos="left"
                    type="text"
                    name="want"
                    value={this.state.data? this.state.data.want : null}
                    placeholder="What's that ?"
                    size="tiny"
                    onChange={value => this.onDataChange('want', value)}/>
                </Form.Field>
                <Form.Field>
                  <TextBox
                    icon="usd"
                    iconpos="left"
                    type="text"
                    name="price"
                    value={this.state.data? this.state.data.price : null}
                    placeholder="How Much ?"
                    size="tiny"
                    onChange={value => this.onDataChange('price', parseFloat(value))}/>
                </Form.Field>
                <Rating name="rating" onRate={(value, data) => this.onRated('rating',data)} value={this.state.data? this.state.data.rating : null} icon='heart' defaultRating={1} maxRating={5} />
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

Todo.propTypes = {
  children: PropTypes.node
};
