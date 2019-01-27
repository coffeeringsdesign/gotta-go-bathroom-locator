import React, { Component } from 'react';
import './App.scss';
import BathroomList from './components/BathroomList';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    console.log(this.props);  //current location is getting to this fucking poin
    return (
      <div className="App">
        <div className="searchAndReturnContainer">
          <BathroomList props={this.props}/>
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    individualBathroom: state.individualBathroom,
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(App);
