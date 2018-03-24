import React, { Component } from 'react';
import { Header, Segment, Form, Input, Button, Container, Message } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from './actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
  }

  handleSubmit() {
    const { username, password } = this.state
    axios.post('/auth', {
      username,
      password
    })
    .then((response) => {
      this.props.setUser(response.data)
    })
    .catch((error) => {
      this.setState({
        error: true
      })
    });
  }

  render() {
    const { username, password, error } = this.state
    return (
      <Container>
        <Header as='h1' align='center'>Welcome to WolframBeta</Header>
        <Header sub align='center'>Please Login</Header>
        <Segment padded inverted>
          <Form inverted onSubmit={() => this.handleSubmit()}>
            <Form.Field>
              <Input
                label='Username' placeholder='username'
                fluid
                value={username}
                onChange={(e, { value }) => this.setState({ username: value })}
              />
            </Form.Field>
            <Form.Field>
              <Input
                label='Password' placeholder='password'
                type='password'
                fluid
                value={password}
                onChange={(e, { value }) => this.setState({ password: value })}
              />
            </Form.Field>
            <Button
              primary
              size='large'
            >
              Login
            </Button>
          </Form>
          <Message negative hidden={!error}>
            Invalid Username or Password.
          </Message>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, { setUser })(Login);
