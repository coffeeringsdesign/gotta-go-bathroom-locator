import React, { Component } from 'react';
import { InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './styles.scss';
import CurrentLocation from './CurrentLocation';
import { connect } from 'react-redux';
const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick =this.onMarkerClick.bind(this);
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMarkerClick = function(props, marker, e) {
    console.log(props);
    this.setState({
      selectedPlace: props,
      selectedPlaceGendered: props.gendered,
      selectedPlaceKeyed: props.needsKey,
      selectedPlaceCoded: props.needsCode,
      selectedPlaceHandicap: props.handicapAccess,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  // CHANGES THE MARKER ON THE MAP TO MATCH THE COUNT OF NEAREST BATHROOM
  determineNumberedMarker(count) {
    if (count === 1) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edca29140b7803eced2c7/1551817895447/?format=100w"
    } else if (count === 2) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edcaeee6eb068a4ef5155/1551817908369/?format=100w"
    } else if (count === 3) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edcb8f4e1fc40150bd87a/1551817919172/?format=100w"
    } else if (count === 4) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edcc04e17b6391319301e/1551817926131/?format=100w"
    } else if (count === 5) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edcc815fcc01c68a36a05/1551817934464/?format=100w"
    } else if (count === 6) {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7edcd1eb3931526488e528/1551817942967/?format=100w"
    } else {
      return "https://static1.squarespace.com/static/54f8c7f6e4b044cd78aadb07/t/5c7ee1c54785d3be7f44f4d4/1551819212349/?format=100w"
    }
  }

  render() {
    const markerLoop = Object.keys(this.props.bathroom).map((i) => {
      let count = parseInt(i) + 1;
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
        count={count}
        code={room.code}
        id={room.id}
        icon={{
          url: this.determineNumberedMarker(count),
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
                {this.state.selectedPlace.needsKey === false ? <h5>Requires Key: No</h5> : <h5>Requires Key: Yes</h5>}
                {this.state.selectedPlace.needsCode === false ? <h5>Requires Code: No</h5> : <h5>Requires Code: Yes</h5>}
                {this.state.selectedPlace.handicapAccess === false ? <h5>Handicap Accessable: No</h5> : <h5>Handicap Accessable: Yes</h5>}
                {this.state.selectedPlace.gendered === false ? <h5>Gendered: No</h5> : <h5>Gendered: Yes</h5>}

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
    currentLocation: state.currentLocation,
    activeMarker: {},
    showingInfoWindow: false,
    selectedPlace: {}
  };
};

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer))
