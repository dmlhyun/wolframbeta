import React, { Component } from 'react';
import { Container, Form, Input } from 'semantic-ui-react';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ''
    };
  }
  handleSubmit(e, val) {
      alert(this.state.expression);
      // take expression and validate
      // -> if true set simplified result
      // -> if false send error
  }
  handleChange(e, data) {
    e.preventDefault();
    this.setState({ expression: data.value })
  }
  render() {
    return (
      <Container>
        <Form onSubmit={(e, value) => this.handleSubmit(e, value)}>
          <Input
            fluid
            value={this.state.expression}
            onChange={(e, data) => this.handleChange(e, data)}
          />
        </Form>
      </Container>
    );
  }
}

export default UserInput;
