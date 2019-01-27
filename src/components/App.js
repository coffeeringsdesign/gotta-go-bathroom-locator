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


  render() {
    this.findCurrentLocation();
    // console.log(this.props);  current location is getting to this fucking point
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
