import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './styles.scss';
import CurrentLocation from './CurrentLocation';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    //props is activeMarker: null, bathroom array (unordered), dispatch, google: maps object, loaded: true, selectedplace which is an empty object, showingWindow: false
    this.onMarkerClick =this.onMarkerClick.bind(this);
  }

  // CONDITIONAL RENDER OF BATHROOMS BOOLEAN VALUES
  keyedModalValues() {
    if (this.props.selectedPlace.needsKey === true) {
      return <h5>Requires Key: Yes</h5>;
    } else {
      return <h5>Requires Key: No</h5>;
    }
  };
  codedModalValues() {
    if (this.props.selectedPlace.needsCode === true) {
      return <h5>Requires Code: {this.props.selectedPlace.code}</h5>;
    } else {
      return <h5>Requires Code: No</h5>;
    }
  };
  handicapModalValues() {
    if (this.props.selectedPlace.handicapAccess === true) {
      return <h5>Handicap Accessable: Yes</h5>;
    } else {
      return <h5>Handicap Accessable: No</h5>
    }
  };
  genderedModalValues() {
    if (this.props.selectedPlace.gendered === true) {
      return <h5>Gender Neutral: No</h5>;
    } else {
      return <h5>Gender Neutral: Yes</h5>;
    }
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //current refactor need to move to reducers:
    // this.props.dispatch(showInfoWindowToTrue());
    // this.props.dispatch(selectAPlace(props)); //what props am i sending
    // this.props.dispatch(activeMarker(marker));

  onMarkerClick = function(props, marker, e) { //getting triggered on click
    this.setState({
      selectedPlace: props, //setting the clicked on place object as selectedPlace
      activeMarker: marker, //actual representation of the place object plus google maps info
      showingInfoWindow: true
    })
  };

  render() {
    const markerLoop = Object.keys(this.props.bathroom).map((i) => {
      let room = this.props.bathroom[i];
      return <Marker name={room.name}
        onClick={this.onMarkerClick}
        address={room.address}
        position={room.longLat}
        distance={room.distance}
        duration={room.duration}
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

    let condRenderedModal;
    if (this.state) {
      condRenderedModal =
      <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}>
              <div className="mapModalStyles">
                <h3>{this.state.selectedPlace.name}</h3>
                <h4>{this.state.selectedPlace.address}</h4>
                <h5>Distance away: {this.state.selectedPlace.distance}</h5>
                <h5>Walking duration: {this.state.selectedPlace.duration}</h5>
                <h5>{this.keyedModalValues()}</h5>
                <h5>{this.codedModalValues()}</h5>
                <h5>{this.handicapModalValues()}</h5>
                <h5>{this.genderedModalValues()}</h5>
              </div>
        </InfoWindow>
    } else {
      condRenderedModal = null;
    }


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
            {condRenderedModal}
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
    activeMarker: {},
    showingInfoWindow: false,
    selectedPlace: {}
    // activeMarker: state.activeMarker,
    // showingInfoWindow: state.showingInfoWindow,
    // selectedPlace: state.selectedPlace
  };
};


export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer))
