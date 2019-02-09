import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '30em',
    height: '750px',
    borderRadius: '5px',
  }
}

export class CurrentLocation extends React.Component {
  constructor(props) { // props is including newProps
    super(props);
    console.log(props);
    // this.loadMap = this.loadMap.bind(this);
    // console.log(props);
      // currently getting all props of working version

    // const { lat, lng } = props.initialCenter;
    // // console.log(props.initialCenter);  matches working version
    // this.state = {
    //   currentLocation: {
    //     lat: lat,
    //     lng: lng
    //   }
    // };

    // console.log(props);
    //props includes all default props listed at the bottom, a NewProps value that includes our bathroom array from firebase, and children array that includes 2 symbols and an array of symbols that include the bathroom array, and a maps object nested inside a google object
  }

    recenterMap() {
     const map = this.map;  //map is now map object
     // console.log(this);
     const current = this.props.currentLocation;

     const google = this.props.google;
     const maps = google.maps;

     if (map) {
       let center = new maps.LatLng(current.lat, current.lng);
       console.log(center);
       map.panTo(center);
     }
    }

  //   componentDidMount() {
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
  //   }
  //   this.loadMap();
  // }

    loadMap(ref) {
      console.log(ref);
      // console.log(this.props); both match working version
      // console.log(this.props.google);
      // const pos = this.props.currentLocation;
      if (this.props && this.props.google) {

        const { google } = this.props; // makes a "google" object of the map object from props
        // console.log( {google}); matches working version
        const maps = google.maps; //grabs the map object and calls it maps
        // console.log(maps); matches working version

        // console.log(this.refs);
        // looks like this.refs should work once i get this sorted
        // console.log(mapRef);
        const mapRef = this.refs.map;


        // reference to the actual DOM element
        const node = ReactDOM.findDOMNode(mapRef);

        let { zoom } = this.props;
        // console.log(zoom);working

        const { lat, lng } = this.props.currentLocation; //this above is matching working
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign(
          {},
          {
            center: center,
            zoom: zoom
          }
        );

        // maps.Map() is constructor that instantiates the map
        this.map = new maps.Map(node, mapConfig);
        console.log(this.map);
      }
    }




// NOT MOUNTING CANNOT TEST YET
// Both props should be good no prevState - sometimes prevProps
    componentDidUpdate(prevProps, prevState) {

      // console.log(prevProps);
      // console.log(prevState);
      if (prevProps.google !== this.props.google) {
        this.loadMap(); // working sometimes - working
      }
      if (prevState.currentLocation !== this.props.currentLocation) { // not working -working
        this.recenterMap();
      }
    }


// FINISHED GOING THRU - 1 NOT WORKING
    renderChildren() {
    const { children } = this.props; //working
    if (!children) return;
    return React.Children.map(children, c => {
      if (!c) return;

      return React.cloneElement(c, {
        map: this.map, // !!!!! not working... map is NOT getting into this
        google: this.props.google, //working
        mapCenter: this.props.currentLocation, //working
        currentLocation: this.props.currentLocation //working
      });
    });
  }


  render() {
    const style = Object.assign({}, mapStyles.map); // working but with object showing - old one said Object
   return (
     <div>
       <div ref="map" style={style}>
         Loading map...
       </div>
       {this.renderChildren()}
     </div>
   );
 }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation,
  };
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
