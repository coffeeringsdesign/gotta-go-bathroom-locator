import React, { Component } from 'react';
import './App.scss';
import BathroomList from './components/BathroomList';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <SearchBar />
        <BathroomList />
      </div>
    );
  }
}

export default App;
