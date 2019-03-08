import React, { Component } from 'react';
import './../App.scss';
import BathroomList from './BathroomList';
import { connect } from 'react-redux';
import { fetchCurrentLocation } from './../actions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddBathroomForm from './AddBathroomForm';
const cors = require('cors')({origin: true});

class App extends Component {
  constructor(props) {
    super(props);
  }

  findCurrentLocation() {
    // console.log("2");
    this.props.dispatch(fetchCurrentLocation(this.props));
  }

  render(props) {
    // console.log("1");
    if (!this.props.currentLocation) {
      this.findCurrentLocation();
    }
    return (
      <div className="App">
        <div className="searchAndReturnContainer">
          <Router>
            <Switch>
              <Route exact path='/' component={BathroomList} />
              <Route path='/addBathroom'  render={(props)=><AddBathroomForm dispatch={this.props.dispatch}/>} />
            </Switch>
          </Router>
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
