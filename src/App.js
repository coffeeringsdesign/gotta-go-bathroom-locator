import React, { Component } from 'react';
import './App.scss';
import BathroomList from './components/BathroomList';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import Map from './components/Map';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Logo />
          <SearchBar />
          <BathroomList />
        </div>
        <div>
          <Map />
        </div>
      </div>
    );
  }
};

export default App;
