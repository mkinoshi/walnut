import React from 'react';
import {Route, Link} from 'react-router-dom';
import Filter from '.../container/Filter';
import Feed from '.../container/Feed';

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
