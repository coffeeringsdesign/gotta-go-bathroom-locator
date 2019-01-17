import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import genderedIcon from './../assets/images/genderneutral-icon.png';
import handicapIcon from './../assets/images/handicap-icon.png';
import codeIcon from './../assets/images/code-icon.png';
import keyIcon from './../assets/images/key-icon.png';

function Bathroom( props ) {

  function renderGenderIcon() {
    if(props.gendered === false) {
      return(
        <img className="icon" src={genderedIcon} alt="is gender neutral" />
      );
    }
  };
  function renderHandicapIcon() {
    if(props.handicapAccess === true) {
      return(
        <img className="icon" src={handicapIcon} alt="is handicap accessible" />
      );
    }
  };
  function renderCodeIcon() {
    if(props.needsCode === true) {
      return(
        <img className="icon" src={codeIcon} alt="needs a code for access" />
      );
    }
  };
  function renderKeyIcon() {
    if(props.needsKey === true) {
      return(
        <img className="icon" src={keyIcon} alt="needs a key for access" />
      );
    }
  };

  function getIndivDurations() {
    console.log(props.distanceDuration);
    let array = [0, 1, 2, 3, 4];
    // let duration = props.distanceDuration.pop();
    console.log(array);
  }


// <h3 className="distance">{props.distanceDuration}</h3>
  const bathroomInformation =
    <div className="indivBathroomDisplay">
      <div className="bathroomTextInfoBlock">

        <div>
          <h3 className="numbered">{props.id})</h3>
        </div>

        <div className="stackedNameAddressLines">
          <div className="nameDistanceLine">
            <h3>{props.name}</h3>
            <h5>{getIndivDurations()}</h5>
          </div>
          <h3 className="addressLine">{props.address}</h3>
        </div>

      </div>

      <div className="iconDisplay">
        {renderGenderIcon()}
        {renderHandicapIcon()}
        {renderCodeIcon()}
        {renderKeyIcon()}
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
  longLat: PropTypes.object.isRequired,
  distanceDuration: PropTypes.any,
  // distance: PropTypes.string,
  // duration: PropTypes.string,
  needsCode: PropTypes.bool.isRequired,
  needsKey: PropTypes.bool.isRequired,
  handicapAccess: PropTypes.bool.isRequired,
  gendered: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

export default Bathroom;
