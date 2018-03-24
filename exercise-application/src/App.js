import React, { Component } from 'react';
import Login from './ui/login';
import Home from './ui/userInput';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      token: nextProps.token
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.state.token ? Home : Login} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token,
  }
}

export default connect(mapStateToProps, {})(App);