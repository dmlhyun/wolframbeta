import React, { Component } from 'react';
import { Header, Container, Form, Input, Label, Button } from 'semantic-ui-react';
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
      errorMessage: null,
      expandActive: false,
      expandResult: null
    };
  }

  handleSubmit() {
    const { expression, expandActive } = this.state;
      if (!expression || !validateExpression(expression)) {
        this.setState({
          error: true
        });
      } else {
        axios.post('/api/simplified/results', {
          expression
        })
        .then((response) => {
          this.setState({
            result: response.data
          });
        })
        .catch((error) => {
          this.setState({
            error: true,
            errorMessage: error
          });
        });
        if (expandActive) {
          axios.post('/api/simplified/expand', {
            expression
          })
          .then((response) => {
            this.setState({
              expandResult: response.data
            });
          })
          .catch((error) => {
            this.setState({
              error: true,
              errorMessage: error
            });
          });
        }
      }
  }

  handleChange(e, data) {
    e.preventDefault();
    this.setState({
      expression: data.value.toUpperCase().replace(/ /g, ''),
      error: false
    })
  }

  handleToggle(e, id) {
    e.preventDefault();
    this.setState({
      [`${id}Active`]: !this.state[`${id}Active`],
      [`${id}Result`]: null
    });
  }

  render() {
    const {
      error,
      result,
      expandActive,
      expandResult
    } = this.state
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          WolframBeta
        </Header>
        <Form onSubmit={() => this.handleSubmit()}>
          <Input
            fluid
            value={this.state.expression}
            onChange={(e, data) => this.handleChange(e, data)}
            action='Submit' placeholder='Submit'
          />
          {error &&
            <Label pointing color='red'>Invalid expression</Label>
          }
          <p>Currently only can take X, Y, Z, 1, 0</p>
          <p>Currently only has functionality for + and .</p>
        </Form>
        <Button.Group basic>
          <Button
            toggle
            active={expandActive}
            id="expand"
            onClick={(e, props) => this.handleToggle(e, props.id)}
          >
            Expand
          </Button>
        </Button.Group>
        <div>
          {result &&
            <Result result={result} title="Result" />
          }
          {expandActive && expandResult &&
            <Result result={expandResult} title="Expanded Form" />
          }
        </div>
      </Container>
    );
  }
}

export default UserInput;
