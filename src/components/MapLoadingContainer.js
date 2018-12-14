import React from 'react';
import './styles.scss';
import Map from './Map';
const API_KEY = process.env.REACT_APP_API_KEY

const MapLoadingContainer = (props) => (
  <div className="mapRenderContainer"><Map google={this.props.google}
    style={{width: '100%', height: '100%', position: 'relative'}}
    className={'map'}
    zoom={14}>
  <Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} />
  <Marker
    name={'Dolores park'}
    position={{lat: 37.759703, lng: -122.428093}} />
  <Marker />
  <Marker
    name={'Your position'}
    position={{lat: 37.762391, lng: -122.439192}}
    icon={{
      url: "/path/to/custom_icon.png",
      anchor: new google.maps.Point(32,32),
      scaledSize: new google.maps.Size(64,64)
    }} /></div>
)

export default GoogleApiWrapper({
  apiKey: (API_KEY),
  LoadingContainer: LoadingContainer
})(MapContainer)
