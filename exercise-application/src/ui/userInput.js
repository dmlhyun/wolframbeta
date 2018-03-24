import React, { Component } from 'react';
import { Header, Container, Form, Message, Button, Segment } from 'semantic-ui-react';
import { validateExpression } from '../common/utilities';
import axios from 'axios';
import { connect } from 'react-redux';
import Result from './results';
import UsersTable from './table';

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
      storeResult: null,
      usersResult: null
    };
  }

  handleSubmit() {
    const { expression, expandActive} = this.state;
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

  handleAdminButtons(e, id) {
    if (id === 'store') {
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
    if (id === 'users') {
      axios.get('/api/allusers')
        .then((res) => {
          this.setState({
            usersResult: res.data
          });
        })
        .catch((err) => {
          console.log('Failed to GET');
        });
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
      storeResult,
      usersResult
    } = this.state

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
              {(this.props.user.role === 0 || this.props.user.role === 1) &&
                <Button
                  toggle
                  active={expandActive}
                  id="expand"
                  onClick={(e, props) => this.handleToggle(e, props.id)}
                >
                  Expand
                </Button>
              }
            </Button.Group>
            <p>Currently only can take X, Y, Z, 1, 0</p>
            <p>Can not handle expression with extra brackets</p>
          </Form>
          <Message negative hidden={!error}>
            Invalid expression.
          </Message>
        </Segment>
        {this.props.user.role === 0 &&
          <div>
            <Button
              id="store"
              onClick={(e, props) => this.handleAdminButtons(e, props.id)}
            >
              Store
            </Button>
            <Button
              id="users"
              onClick={(e, props) => this.handleAdminButtons(e, props.id)}
            >
              Users
            </Button>
          </div>
        }
        <div>
          {result &&
            <Result result={result} title="Result" />
          }
          {expandActive && expandResult &&
            <Result result={expandResult} title="Expanded Form" />
          }
          {storeResult &&
            <Result result={JSON.stringify(storeResult)} title="Known Results" />
          }
          {usersResult &&
            <UsersTable users={usersResult}/>
          }
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(UserInput);

// export default UserInput;
