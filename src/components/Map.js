import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.scss';
import CurrentLocation from './CurrentLocation';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  // state = {
  //   showingInfoWindow: false,
  //   activeMarker: {},
  //   selectedPlace: {}
  // };


  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // JUST THE CONDITIONAL RENDER OF BATHROOMS
  keyedModalValues() {
    if (this.state.selectedPlace.needsKey === true) {
      return <h5>Requires Key: Yes</h5>;
    } else {
      return <h5>Requires Key: No</h5>;
    }
  };
  codedModalValues() {
    if (this.state.selectedPlace.needsCode === true) {
      return <h5>Requires Code: {this.state.selectedPlace.code}</h5>;
    } else {
      return <h5>Requires Code: No</h5>;
    }
  };
  handicapModalValues() {
    if (this.state.selectedPlace.handicapAccess === true) {
      return <h5>Handicap Accessable: Yes</h5>;
    } else {
      return <h5>Handicap Accessable: No</h5>
    }
  };
  genderedModalValues() {
    if (this.state.selectedPlace.gendered === true) {
      return <h5>Gender Neutral: No</h5>;
    } else {
      return <h5>Gender Neutral: Yes</h5>;
    }
  };


  render() {
    console.log(this.props);
    const markerLoop = Object.keys(this.props.bathroom).map((i) => {
      let room = this.props.bathroom[i];
      return <Marker name={room.name}
        onClick={this.onMarkerClick}
        address={room.address}
        position={room.longLat}
        distance={room.distance}
        needsCode={room.needsCode}
        needsKey={room.needsKey}
        handicapAccess={room.handicapAccess}
        gendered={room.gendered}
        code={room.code}
        id={room.id}
        icon={{
          url: "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c1bc09dcd83669fc0dd58e9/1545322656436/filled.png?format=100w",
          anchor: new this.props.google.maps.Point(32,32),
          scaledSize: new this.props.google.maps.Size(25,35)}} />
    });

    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          newProps={this.props}>

          <Marker onClick={this.onMarkerClick} name={'you are here'}
            icon={{
              url: "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c1bbf92032be44a0209449f/1545322390351/X.png?format=300w",
              anchor: new this.props.google.maps.Point(32,32),
              scaledSize: new this.props.google.maps.Size(40,40)}} />
          {markerLoop}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>

            <div className="mapModalStyles">
              <h3>{this.state.selectedPlace.name}</h3>
              <h4>{this.state.selectedPlace.address}</h4>
              <h5>{this.keyedModalValues()}</h5>
              <h5>{this.codedModalValues()}</h5>
              <h5>{this.handicapModalValues()}</h5>
              <h5>{this.genderedModalValues()}</h5>
            </div>

          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // currentLocation: state.currentLocation,
    // bathrooms: state.bathrooms,
    // nearestBathrooms: state.nearestBathrooms
    activeMarker: state.activeMarker,
    showingInfoWindow: state.showingInfoWindow,
    selectedPlace: state.selectedPlace
  };
};

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer))
