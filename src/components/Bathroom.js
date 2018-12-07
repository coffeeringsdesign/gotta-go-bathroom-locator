import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import genderedIcon from './../assets/images/genderneutral-icon.png';
import handicapIcon from './../assets/images/handicap-icon.png';
import codeIcon from './../assets/images/code-icon.png';

function Bathroom( props ) {

  const bathroomInformation =
    <div className="indivBathroomDisplay">
      <div className="bathroomTextInfoBlock">
        <div>
          <h3>1)</h3>
        </div>
        <div className="stackedNameAddressLines">
          <div className="nameDistanceLine">
            <h3>{props.name}</h3>
            <h3 className="distance">(distance away)</h3>
          </div>
          <h3 className="addressLine">{props.address}</h3>
        </div>
      </div>

      <div className="iconDisplay">
        <img className="icon" src={genderedIcon} alt="is gender neutral" />
        <img className="icon" src={handicapIcon} alt="is gender neutral" />
        <img className="icon" src={codeIcon} alt="is gender neutral" />
      </div>

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
