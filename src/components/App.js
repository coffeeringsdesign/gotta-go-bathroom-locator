import React, { Component } from 'react';
import './../App.scss';
import BathroomList from './BathroomList';
import { connect } from 'react-redux';
import { fetchCurrentLocation } from './../actions';

class App extends Component {
  constructor(props) {
    super(props);
    // current location is now in props
  }

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      this.props.dispatch(fetchCurrentLocation(coords, this.props));
    });
  }

  render(props) {
    if (!this.props.currentLocation) {
      this.findCurrentLocation();
    }
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
  return {
    individualBathroom: state.individualBathroom,
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(App);
