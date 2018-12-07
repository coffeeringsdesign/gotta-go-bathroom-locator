import React from 'react';
import './styles.scss';

function SearchBar() {
  return (
    <div>
      <form>
      <input className="searchInputBar" type="text" name="locationSearch" placeholder="Please enter your location..." />
      <button type="submit">Search</button>
      </form>
    </div>
  )
};

export default SearchBar;
