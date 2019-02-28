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
    this.state = this.props.currentLocation;
  }

  recenterMap() {
    const map = this.map;
    // console.log(this.map);
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

  // NOT IMPACTED BY REMOVING SET STATE ABOVE
  loadMap(prevProps, prevState) {
    if (this.props && this.props.google) { // doesn't change
      const {google} = this.props; // doesn't change
      const maps = google.maps; // doesn't change
      const mapRef = this.refs.map; //doesn't change
      const node = ReactDOM.findDOMNode(mapRef); //doesn't change
      let {zoom} = this.props; //doesn't change
      const {lat, lng} = this.props.currentLocation; //doesn't change
      const center = new maps.LatLng(lat, lng); //doesn't change
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      }); // doesn't change
      this.map = new maps.Map(node, mapConfig);//doesn't change
      // console.log(prevProps);
      // console.log(prevState);
    }
  }

  // NOT ALWAYS CALLED - NEED TO COME BACK TO IT
  componentDidUpdate(prevProps, prevState) { //doesn't change
    if (prevProps.google !== this.props.google) {
      // console.log("took a photo for when this actually logs");
      // console.log(prevProps.google);
      // console.log(this.props.google);
      this.loadMap();
    }
    if (prevState.currentLocation !== this.props.currentLocation) {
      this.recenterMap();
    }
  }

  // NOT IMPACTED BY REMOVING SET STATE ABOVE
  renderChildren() {
    const {children} = this.props;  //doesn't change
    if (!children)
      return;

    return React.Children.map(children, c => { // children or c doesn't change
      if (!c)
        return;
      return React.cloneElement(c, {
        map: this.map, //doesn't change
        google: this.props.google, //doesn't change
        mapCenter: this.props.currentLocation, //doesn't change
        currentLocation: this.props.currentLocation //doesn't change
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map); //doesn't change
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
