import React from 'react';
import Bathroom from './Bathroom';

const initialBathroomList = {
  1: {
    name: 'Books with Pictures',
    address: '1100 SE Division St #103, Portland, OR 97202',
    longLat: '45.504873, -122.654415',
    needsCode: true,
    needsKey: false,
    handicapAccess: true,
    gendered: false,
    code: '415 + enter',
    id: 1
  },
  2: {
    name: 'Pine State Biscuits',
    address: '1100 SE Division St #100, Portland, OR 97202',
    longLat: '45.504661, -122.654554',
    needsCode: true,
    needsKey: false,
    handicapAccess: true,
    gendered: false,
    code: '415 + enter',
    id: 2
  },
  3: {
    name: 'The Bakers Mark',
    address: '1126 SE Division St, Portland, OR 97202',
    longLat: '45.504660, -122.653991',
    needsCode: true,
    needsKey: false,
    handicapAccess: true,
    gendered: false,
    code: '415 + enter',
    id: 3
  },
  4: {
    name: 'Virtuous Pie',
    address: '1126 SE Division St #200, Portland, OR 97202',
    longLat: '45.504492, -122.653861',
    needsCode: true,
    needsKey: false,
    handicapAccess: true,
    gendered: false,
    code: '415 + enter',
    id: 4
  }
}

function BathroomList() {
  return (
    <div>
      <h1>BathroomList</h1>
      {Object.keys(initialBathroomList).map((room) =>
      <Bathroom name={room.name}
              address={room.address}
              longLat={room.longLat}
              needsCode={room.needsCode}
              needsKey={room.needsKey}
              handicapAccess={room.handicapAccess}
              gendered={room.gendered}
              code={room.code}
              id={room.id}
      />
    )}
    </div>
  )
}

// {Object.keys(initialBathroomList).map(i => {
//   let room = initialBathroomList[i];




export default BathroomList;
