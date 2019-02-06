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
  constructor(props) {
    super(props);
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
     const current = this.props.newProps.currentLocation;

     const google = this.props.google;
     const maps = google.maps;

     if (map) {
       let center = new maps.LatLng(current.lat, current.lng);
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

        console.log(this);
        console.log(this.refs);
        console.log(mapRef);
        const mapRef = this.refs.map;


        // reference to the actual DOM element
        const node = ReactDOM.findDOMNode(mapRef);

        let { zoom } = this.props;
        const { lat, lng } = this.props.newProps.currentLocation;
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
      }
    }




// NEED TO COME BACK WHEN COMPONANT CAN ACTUALLY UPDATE
    componentDidUpdate(prevProps, prevState) {
      // console.log(prevProps);
      // console.log(prevState);
      if (prevProps.google !== this.props.google) {
        this.loadMap();
      }
      if (prevState.currentLocation !== this.props.newProps.currentLocation) {
        this.recenterMap();
      }
    }


// I do believe this all matches the values from working version
    renderChildren() {
    const { children } = this.props;
    // console.log({ children }); matches working version
    // console.log(this.props); has all of working version
    if (!children) return;
    return React.Children.map(children, c => {
      if (!c) return;
      // console.log(this.map);  //matches working version
    // console.log(this.props.google); //matches working version
    // console.log(this.props.currentLocation);//matches working version
    // console.log(this.props.currentLocation);//matches working version
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.props.newProps.currentLocation,
        currentLocation: this.props.newProps.currentLocation
      });
    });
  }


  render() {
    // this.loadMap(this.ref);
    const style = Object.assign({}, mapStyles.map);
   return (
     <div>
       <div ref="map" style={style}>
         Loading map...
       </div>
       {console.log(this.refs.map)}
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
