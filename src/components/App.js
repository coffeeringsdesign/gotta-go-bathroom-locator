import React, { Component } from 'react';
import './../App.scss';
import BathroomList from './BathroomList';
import EntranceButton from './EntranceButton';
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
    this.props.dispatch(fetchCurrentLocation(this.props));
  }

  render(props) {
    if (!this.props.currentLocation) {
      this.findCurrentLocation();
    }
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={EntranceButton} />
            <div className="searchAndReturnContainer">
              <Route path='/BathroomList' component={BathroomList} />
              <Route path='/addBathroom'  render={(props)=><AddBathroomForm dispatch={this.props.dispatch}/>} />
            </div>
          </Switch>
        </Router>
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
