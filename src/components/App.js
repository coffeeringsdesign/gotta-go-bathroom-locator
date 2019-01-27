import React, { Component } from 'react';
import './../App.scss';
import BathroomList from './BathroomList';
import { connect } from 'react-redux';
import { fetchCurrentLocation } from './../actions';

class App extends Component {

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      this.props.dispatch(fetchCurrentLocation(coords, this.props));
    });
  }

  render(props) {
    /////props is including Current Location
    this.findCurrentLocation();
    console.log(this.props);
    return (
      <div className="App">
        <div className="searchAndReturnContainer">
          <BathroomList />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  // currentLocation is coming thru
  return {
    individualBathroom: state.individualBathroom,
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(App);
