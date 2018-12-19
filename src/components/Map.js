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
  // onClick={this.onMarkerClick}
  // name={this.props.name}
  // code={this.props.code}
  // position={this.props.longLat}/>


  render() {
    console.log(this.props.bathroom); //this is the bathrooms array
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
        id={room.id} />
    });




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
