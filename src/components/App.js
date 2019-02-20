import React, { Component } from 'react';
import './../App.scss';
import BathroomList from './BathroomList';
import { connect } from 'react-redux';
import { fetchCurrentLocation } from './../actions';
import { Switch, Route } from 'react-router-dom';
import Logo from './Logo';
import GoToAddaBathroomForm from './GoToAddaBathroomForm';
import AddBathroomForm from './AddBathroomForm';

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
          <Logo />
          <Switch>
            <Route exact path='/' component={BathroomList} />
            <AddBathroomForm />
            <Route path='/addBathroom' compnent={AddBathroomForm} />
          </Switch>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(App);
