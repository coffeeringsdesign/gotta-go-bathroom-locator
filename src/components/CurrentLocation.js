import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { fetchCurrentLocation } from './../actions';
const cors = require('cors')({origin: true});

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

    // const {lat, lng} = this.props.initialCenter;
    this.state = this.props.currentLocation; //needed for prevProps
  }

  recenterMap() {
    const map = this.map;
    console.log("9");
    const current = this.props.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  // WORKING CURRENTLY PRIOR TO REFACTOR
  // componentDidMount() {
  //   if (this.props.centerAroundCurrentLocation) {
  //     if (navigator && navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(pos => {
  //         const coords = pos.coords;
  //         this.setState({
  //           currentLocation: {
  //             lat: coords.latitude,
  //             lng: coords.longitude
  //           }
  //         });
  //       });
  //     }
  //     this.loadMap();
  //   }
  // }


  componentDidMount() {
    console.log("7");
    if (this.props.currentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.props.dispatch(fetchCurrentLocation(coords, this.props));
        });
      }

        this.loadMap();

    }
  }



  // NOT IMPACTED BY REMOVING SET STATE ABOVE
  loadMap(prevProps, prevState) {
    console.log("8");
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
    }
  }

  // NOT ALWAYS CALLED - NEED TO COME BACK TO IT
  componentDidUpdate(prevProps, prevState) {
    console.log("6");
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.props.currentLocation) {
      this.recenterMap();
    }
  }

  // NOT IMPACTED BY REMOVING SET STATE ABOVE
  renderChildren() {
    console.log("5");
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
    // console.log(this.props);
    console.log("4");
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
  return {currentLocation: state.currentLocation}; //
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
