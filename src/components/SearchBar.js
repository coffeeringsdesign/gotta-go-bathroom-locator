import React from 'react';
import './styles.scss';

function SearchBar() {
  return (
    <div className="searchBarContainer">
      <form className="searchForm">
        <input className="searchInputBar" type="text" name="locationSearch" placeholder="Please enter your location..." />
        <button className="searchButton" type="submit">Search</button>
      </form>
    </div>
  )
};

export default SearchBar;
