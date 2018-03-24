import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: props.result,
      title: props.title
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    this.setState({
      result: nextProps.result
    });
  }

  render() {
    const { result, title } = this.state
    console.log(this.state);
    return (
      <Segment vertical>
        <Header as='h2'>{title}</Header>
        <p>{result}</p>
      </Segment>
    );
  }
}

export default Result;
