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

  determineModalValues(){
    let needsKeyValue;
    let needsCodeValue;
    let handicapAcessValue;
    let isGenderedValue;
    if (this.state.selectedPlace.needsKey === true) {
      let needsKeyValue = <h5>Requires Key: Yes</h5>;
    };
    if (this.state.selectedPlace.needsCode === true) {
      let needsCodeValue = <h5>Requires Code: {this.state.selectedPlace.code}</h5>;
    };
    if (this.state.selectedPlace.handicapAccess === true) {
      let handicapAcessValue = <h5>Handicap Accessable: Yes</h5>;
    };
    if (this.state.selectedPlace.handicapAcess === false) {
      let handicapAcessValue = <h5>Handicap Accessable: No</h5>;
    };
    if (this.state.selectedPlace.gendered === true) {
      let isGenderedValue = <h5>Gender Neutral: No</h5>;
    };
  }


  render() {
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
              {this.determineModalValues}
              <h3>{this.state.selectedPlace.name}</h3>
              <h4>{this.state.selectedPlace.address}</h4>
              <h5>{this.isGenderedValue}</h5>
              <h5>{this.needsKeyValue}</h5>
              <h5>{this.needsCodeValue}</h5>
              <h5>{this.handicapAcessValue}</h5>
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
