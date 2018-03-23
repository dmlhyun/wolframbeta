import React, { Component } from 'react';
import { Header, Segment, Form, Input, Button, Container } from 'semantic-ui-react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }

  handleSubmit() {
    const { user, password } = this.state
    // authentication post call
    axios.post('/authenticate', {
      user,
      password
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    const { user, password } = this.state
    console.log(this.state);
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
                value={user}
                onChange={(e, { value }) => this.setState({ user: value })}
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
        </Segment>
      </Container>
    );
  }
}

export default Login;
