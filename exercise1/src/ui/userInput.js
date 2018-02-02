import React, { Component } from 'react';
import { Container, Form, Input, Label } from 'semantic-ui-react';
import { simplifyExpression } from '../common/utilities';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      result: null,
      error: false
    };
  }
  handleSubmit() {
      if (!this.state.expression) {
        this.setState({
          error: true
        });
      }
      simplifyExpression();
      // take expression and validate
      // -> if true set simplified result
      // -> if false send error
  }
  handleChange(e, data) {
    e.preventDefault();
    this.setState({
      expression: data.value,
      error: false
    })
  }
  render() {
    console.log(this.state)
    return (
      <Container>
        <Form onSubmit={() => this.handleSubmit()}>
          <Input
            fluid
            value={this.state.expression}
            onChange={(e, data) => this.handleChange(e, data)}
          />
          {this.state.error &&
            <Label pointing color='red'>Invalid expression</Label>
          }
        </Form>
      </Container>
    );
  }
}

export default UserInput;
