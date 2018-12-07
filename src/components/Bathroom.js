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

function Bathroom( props ) { //bathroom list coming thru well
  const bathroomInformation =
  <div>
  <h3></h3>
  </div>
  return (
    <div className="indivBathroomDisplay">

      <div>

        <h2{props.name}</h2>

      </div>


    </div>
  );
}

// Bathroom.propTypes = {
//   initialBathroomList: PropTypes.object
// };

export default Bathroom;
