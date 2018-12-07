import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

// function initialBathroomList.map(room) =>
//   name={room.name}
//   address={room.address}
//   longLat={room.longLat}
//   needsCode={room.needsCode}
//   needsKey={room.needsKey}
//   handicapAccess={room.handicapAccess}
//   gendered={room.gendered}
//   code={room.code}
//   }

function Bathroom({ initialBathroomList }) { //bathroom list coming thru well
console.log(initialBathroomList);
  return (
    <div>
      <h2>{initialBathroomList[0].name}</h2>
    </div>
  );
}

Bathroom.propTypes = {
  initialBathroomList: PropTypes.object
};

export default Bathroom;
