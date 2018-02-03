import React, { Component } from 'react';
import { Header, Container, Form, Input, Label } from 'semantic-ui-react';
import { validateExpression, simplifyExpression } from '../common/utilities';

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
    const { expression } = this.state;
      if (!expression || validateExpression(expression)) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          result: simplifyExpression(expression)
        });
      }
  }
  handleChange(e, data) {
    e.preventDefault();
    this.setState({
      expression: data.value.toUpperCase(),
      error: false
    })
  }
  render() {
    console.log(this.state)
    const { error, result } = this.state
    return (
      <Container>
        <Form onSubmit={() => this.handleSubmit()}>
          <Input
            fluid
            value={this.state.expression}
            onChange={(e, data) => this.handleChange(e, data)}
          />
          {error &&
            <Label pointing color='red'>Invalid expression</Label>
          }
        </Form>
        {result &&
          <div>
            <Header as='h2'>Result</Header>
            <p>{this.state.result}</p>
          </div>
        }
      </Container>
    );
  }
}

export default UserInput;
