import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
// import firebaseConfig from '../constants/firebaseConfig';
import Map from './Map';
require('firebase/database');
const firebase = require('firebase/app');

class BathroomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bathrooms: []
    }

  }

    componentDidMount() { //being called successfully
    const bathroomsRef = firebase.database().ref('bathrooms');
    bathroomsRef.on('value', (snapshot) => {
      let bathrooms = snapshot.val();
      let newState = [];
      for (let bathroom in bathrooms) {
        newState.push({
          name: bathrooms[bathroom].name,
          address: bathrooms[bathroom].address,
          lat: bathrooms[bathroom].lat,
          lng: bathrooms[bathroom].lng,
          distance: bathrooms[bathroom].distance,
          needsCode: bathrooms[bathroom].needsCode,
          needsKey: bathrooms[bathroom].needsKey,
          handicapAccess: bathrooms[bathroom].handicapAccess,
          gendered: bathrooms[bathroom].gendered,
          code: bathrooms[bathroom].code,
          id: bathrooms[bathroom].id
        })
      }
      this.setState({
        bathrooms: newState
      });
    });
  }

    render() {
      return (
        <div>
          {Object.keys(this.state.bathrooms).map((i) => {
            let room = this.state.bathrooms[i];
            return <Bathroom name={room.name}
              address={room.address}
              lat={room.lat}
              lng={room.lng}
              distance={room.distance}
              needsCode={room.needsCode}
              needsKey={room.needsKey}
              handicapAccess={room.handicapAccess}
              gendered={room.gendered}
              code={room.code}
              id={room.id} />
          })},
          {Object.keys(this.state.bathrooms).map((i) => {
            let room = this.state.bathrooms[i];
            return <Map name={room.name}
              address={room.address}
              lat={room.lat}
              lng={room.lng}
              distance={room.distance}
              needsCode={room.needsCode}
              needsKey={room.needsKey}
              handicapAccess={room.handicapAccess}
              gendered={room.gendered}
              code={room.code}
              id={room.id} />
          })},
        </div>
      );
    }

}

export default BathroomList;
