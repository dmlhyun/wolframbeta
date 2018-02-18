import React, { Component } from 'react';
import { Header, Container, Form, Input, Label } from 'semantic-ui-react';
import { validateExpression } from '../common/utilities';
import axios from 'axios';
import Result from './results';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      result: null,
      error: false,
      errorMessage: null
    };
  }

  handleSubmit() {
    const { expression } = this.state;
      if (!expression || !validateExpression(expression)) {
        this.setState({
          error: true
        });
      } else {
        axios.post('/results', {
          expression
        })
        .then((response) => {
          console.log(response);
          this.setState({
            result: response.data
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: true,
            errorMessage: error
          });
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
    const { error, result } = this.state
    return (
      <Container>
        <Header as='h1'>WolframBeta</Header>
        <Form onSubmit={() => this.handleSubmit()}>
          <Input
            fluid
            value={this.state.expression}
            onChange={(e, data) => this.handleChange(e, data)}
          />
          {error &&
            <Label pointing color='red'>Invalid expression</Label>
          }
          <p>Currently only can take A, B, C, 1, 0</p>
          <p>Currently only has functionality for + and .</p>
        </Form>
        {result &&
          <Result result={result} />
        }
      </Container>
    );
  }
}

export default UserInput;
