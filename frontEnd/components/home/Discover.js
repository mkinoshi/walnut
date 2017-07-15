import React from 'react';
import FilterPref from '../../containers/FilterPref';
import Feed from '../../containers/Feed';

// TODO FilterPref
// TODO Feed

class Discover extends React.Component {

  render() {
    return (
      <div>
        <FilterPref />
        <Feed />
      </div>
    );
  }
}

export default Discover;
