import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
import Map from './Map';
import './styles.scss';
import SearchBar from './SearchBar';
import AddBathroomForm from './AddBathroomForm';
import Logo from './Logo';
import CurrentLocation from './CurrentLocation';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import { fetchDistanceDuration } from './../actions';
import { fetchInitialBathroomInformation } from './../actions';
import { reorderNearestBathrooms } from './../actions';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;
require('firebase/database');
const firebase = require('firebase/app');
const distance = require('google-distance-matrix');
distance.key(API_KEY);

class BathroomList extends Component {
  constructor(props) {
    super(props);
  }

  fetchBathroomData(){
    if (this.props.currentLocation && !this.props.bathrooms[0]) {
      this.props.dispatch(fetchInitialBathroomInformation(this.props.currentLocation));
    }
  }

  reorderBathrooms(){
    if (this.props.bathrooms[10]) {
      this.props.dispatch(reorderNearestBathrooms(this.props.bathrooms));
    }
  }


    render() {
      this.fetchBathroomData();
      this.reorderBathrooms();
      return (
        <div className="resultsMapContainer">
          <div className="listResultsContainer">
            <Logo />
              {Object.keys(this.props.bathrooms).map((i) => {
                let count = parseInt(i) + 1;
                let room = this.props.bathrooms[i];
                return <Bathroom name={room.name}
                  address={room.address}
                  longLat={room.longLat}
                  needsCode={room.needsCode}
                  needsKey={room.needsKey}
                  distance={room.distance}
                  duration={room.duration}
                  handicapAccess={room.handicapAccess}
                  gendered={room.gendered}
                  code={room.code}
                  count={count}
                  id={room.id} />
              })},
          </div>
          <div className="mapResultsContainer">
            {Object.keys(this.props.bathrooms).map((i) => {
              let rooms = this.props.bathrooms;
              return <Map bathroom={rooms} />
            })},
          </div>
        </div>
      );
    }
}
  // what I tried and didn't work:
  // {for (i = 0, i <= this.props.bathrooms[5], i++) {
  //   let count = parseInt(i) + 1;
  //   let room = this.props.bathrooms[i];
  //   return <Bathroom name={room.name}
  //     address={room.address}
  //     longLat={room.longLat}
  //     needsCode={room.needsCode}
  //     needsKey={room.needsKey}
  //     distance={room.distance}
  //     duration={room.duration}
  //     handicapAccess={room.handicapAccess}
  //     gendered={room.gendered}
  //     code={room.code}
  //     count={count}
  //     id={room.id} />
  // }},

// WHAT WAS WORKING
// {Object.keys(this.props.bathrooms).map((i) => {
//   let count = parseInt(i) + 1;
//   let room = this.props.bathrooms[i];
//   return <Bathroom name={room.name}
//     address={room.address}
//     longLat={room.longLat}
//     needsCode={room.needsCode}
//     needsKey={room.needsKey}
//     distance={room.distance}
//     duration={room.duration}
//     handicapAccess={room.handicapAccess}
//     gendered={room.gendered}
//     code={room.code}
//     count={count}
//     id={room.id} />
// })},


// temporarily removing searchbar - goes under <Logo /> above: <SearchBar />
// temporarily removing the add bathroom form - goes right under the Object.keys under logo <AddBathroomForm />

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation,
    bathrooms: state.bathrooms,
    nearestBathrooms: state.nearestBathrooms
  };
};

// BathroomList.propTypes = {
//   dispatch: PropTypes.func
// };


export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(BathroomList))
