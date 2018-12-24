findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const coords = pos.coords;
    this.setState({
      currentLocation: {
        lat: coords.latitude,
        lng: coords.longitude
      }
    });
    console.log(this.state.currentLocation);
  });
}
