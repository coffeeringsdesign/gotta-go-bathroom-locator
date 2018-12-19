import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.scss';
import CurrentLocation from './CurrentLocation';
const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

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



  render() {
    // console.log(this.props);
    const markerLoop = <Marker
      onClick={this.onMarkerClick}
      name={this.props.name}
      code={this.props.code}
      position={this.props.longLat}/>


    return (
      <div>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          newProps={this.props}>

          <Marker onClick={this.onMarkerClick} name={'you are here'}
            icon={{
              url: "https://vignette.wikia.nocookie.net/run1438/images/a/a5/X.png/revision/latest?cb=20180419021039",
              anchor: new this.props.google.maps.Point(32,32),
              scaledSize: new this.props.google.maps.Size(30,30)}} />
          {markerLoop}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>

            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <h3>Code: {this.state.selectedPlace.code}</h3>
            </div>

          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)
