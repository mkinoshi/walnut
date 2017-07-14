import React from 'react';
import {Route, Link} from 'react-router-dom';
import Filter from '../../containers/Filter';
import Feed from '../../containers/Feed';

// TODO Filter
// TODO Feed

class Discover extends React.Component {

  render() {
    return (
      <div>
        <Filter />
        <Feed />
      </div>
    );
  }
}

export default Discover;
