import React, { Component } from 'react';
import './App.css';
import { Header } from 'semantic-ui-react';
import UserInput from './ui/userInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header as='h1'>WolframBeta</Header>
        <UserInput />
      </div>
    );
  }
}

export default App;
