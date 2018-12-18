import React, { Component } from 'react';
import Bathroom from './Bathroom';
import * as actions from './../actions';
import firebase from 'firebase';

// const initialBathroomList = {
//   1: {
//     name: 'Books with Pictures',
//     address: '1100 SE Division St #103, Portland, OR 97202',
//     longLat: '45.504873, -122.654415',
//     distance: null,
//     needsCode: true,
//     needsKey: false,
//     handicapAccess: true,
//     gendered: false,
//     code: '415 + enter',
//     id: 1
//   },
//   2: {
//     name: 'Pine State Biscuits',
//     address: '1100 SE Division St #100, Portland, OR 97202',
//     longLat: '45.504661, -122.654554',
//     distance: null,
//     needsCode: true,
//     needsKey: false,
//     handicapAccess: true,
//     gendered: false,
//     code: '415 + enter',
//     id: 2
//   },
//   3: {
//     name: 'The Bakers Mark',
//     address: '1126 SE Division St, Portland, OR 97202',
//     longLat: '45.504660, -122.653991',
//     distance: null,
//     needsCode: true,
//     needsKey: false,
//     handicapAccess: true,
//     gendered: false,
//     code: '415 + enter',
//     id: 3
//   },
//   4: {
//     name: 'Virtuous Pie',
//     address: '1126 SE Division St #200, Portland, OR 97202',
//     longLat: '45.504492, -122.653861',
//     distance: null,
//     needsCode: true,
//     needsKey: false,
//     handicapAccess: true,
//     gendered: false,
//     code: '415 + enter',
//     id: 4
//   }
// }


class BathroomList extends Component {
  constructor(props) {
    super(props)
  }
    // componentWillMount() {
    //   const { dispatch } = this.props;
    //   const { watchFirebaseBathroomsRef } = actions;
    //   dispatch(watchFirebaseBathroomsRef());
    // };

    componentDidMount() {
    const bathroomRef = firebase.database().ref('bathrooms');
    bathroomRef.on('value', (snapshot) => {
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
      console.log(newState);
      this.setState({
        players: newState
      });
      console.log(this.state);

    });
  }

    // render() {
    //   return (
    //     <div>
    //       {Object.keys(initialBathroomList).map((i) => {
    //         let room = initialBathroomList[i];
    //         return <Bathroom name={room.name}
    //           address={room.address}
    //           longLat={room.longLat}
    //           distance={room.distance}
    //           needsCode={room.needsCode}
    //           needsKey={room.needsKey}
    //           handicapAccess={room.handicapAccess}
    //           gendered={room.gendered}
    //           code={room.code}
    //           id={room.id} />
    //       })}
    //     </div>
    //   );
    // }

}

export default BathroomList;
