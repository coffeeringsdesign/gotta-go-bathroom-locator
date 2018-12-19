import React, { Component } from 'react';
import './App.scss';
import BathroomList from './components/BathroomList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="searchAndReturnContainer">
          <BathroomList />
        </div>
      </div>
    );
  }
};

export default App;
