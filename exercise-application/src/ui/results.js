import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: props.result
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      result: nextProps.result
    });
  }

  render() {
    const { result } = this.state
    return (
      <Container>
        <Header as='h1'>Result</Header>
        <p>{result}</p>
      </Container>
    );
  }
}

export default Result;
