import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

function Bathroom( props ) {
  const bathroomInformation =
    <div className="indivBathroomDisplay">
      <h3>{props.name}</h3>
      <h3>{props.address}</h3>
      <h3>{props.longLat}</h3>
      <h3>{props.distance}</h3>
      <h3>{props.needsCode}</h3>
      <h3>{props.needsKey}</h3>
      <h3>{props.handicapAccess}</h3>
      <h3>{props.gendered}</h3>
      <h3>{props.code}</h3>
      <h3>{props.id}</h3>
    </div>
  return (
    <div >
      {bathroomInformation}
    </div>
  );
}

Bathroom.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  longLat: PropTypes.string.isRequired,
  distance: PropTypes.string,
  needsCode: PropTypes.bool.isRequired,
  needsKey: PropTypes.bool.isRequired,
  handicapAccess: PropTypes.bool.isRequired,
  gendered: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default Bathroom;
