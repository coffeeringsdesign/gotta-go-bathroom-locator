import React, { Component } from 'react';
import './App.scss';
import BathroomList from './components/BathroomList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BathroomList/>
      </div>
    );
  }
}

export default App;
