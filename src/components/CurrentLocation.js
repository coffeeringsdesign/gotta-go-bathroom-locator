import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '30em',
    height: '750px',
    borderRadius: '5px'
  }
}

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = this.props.currentLocation
  }

  recenterMap() {
    const map = this.map;
    const current = this.props.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {zoom} = this.props;
      const {lat, lng} = this.props.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      });
      this.map = new maps.Map(node, mapConfig);
      console.log(this.map);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.props.currentLocation) {
      this.recenterMap();
    }
  }

  renderChildren() {
    const {children} = this.props;
    if (!children)
      return;

    return React.Children.map(children, c => {

      if (!c)
        return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.currentLocation,
        currentLocation: this.props.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (<div>
      <div style={style} ref="map">
        Loading map...
      </div>
      {this.renderChildren()}
    </div>);
  }
}

const mapStateToProps = state => {
  return {currentLocation: state.currentLocation};
};

export default connect(mapStateToProps)(CurrentLocation);

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 45.5197,
    lng: -122.6671
  },
  centerAroundCurrentLocation: false,
  visible: true
};
