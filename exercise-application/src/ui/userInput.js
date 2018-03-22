import React, { Component } from 'react';
import { Header, Container, Form, Input, Message, Button, Segment } from 'semantic-ui-react';
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
      expandResult: null,
      storeActive: false,
      storeResult: null
    };
  }

  handleSubmit() {
    const { expression, expandActive, storeActive } = this.state;
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
        if (storeActive) {
          axios.get('/api/store')
            .then((res) => {
              this.setState({
                storeResult: res.data
              });
            })
            .catch((err) => {
              console.log('Failed to GET');
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
      expandResult,
      storeActive,
      storeResult
    } = this.state
    console.log(this.state);
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          WolframBeta
        </Header>
        <Segment>
          <Form onSubmit={() => this.handleSubmit()}>
            <Form.Input
              fluid
              value={this.state.expression}
              onChange={(e, data) => this.handleChange(e, data)}
              action='Submit' placeholder='Submit'
            />
            <Button.Group basic>
              <Button
                toggle
                active={expandActive}
                id="expand"
                onClick={(e, props) => this.handleToggle(e, props.id)}
              >
                Expand
              </Button>
              <Button
                toggle
                active={storeActive}
                id="store"
                onClick={(e, props) => this.handleToggle(e, props.id)}
              >
                Store
              </Button>
            </Button.Group>
            <p>Currently only can take X, Y, Z, 1, 0</p>
            <p>Can not handle expression with extra brackets</p>
          </Form>
          <Message negative hidden={!error}>
            Invalid expression.
          </Message>
        </Segment>
        <div>
          {result &&
            <Result result={result} title="Result" />
          }
          {expandActive && expandResult &&
            <Result result={expandResult} title="Expanded Form" />
          }
          {storeActive && storeResult &&
            <Result result={JSON.stringify(storeResult)} title="Known Results" />
          }
        </div>
      </Container>
    );
  }
}

export default UserInput;
