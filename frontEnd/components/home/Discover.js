import React from 'react';
import Feed from '../../containers/Feed';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Discover extends React.Component {
  render() {
    return (
      <div>
        <Feed />
      </div>
    );
  }
}

export default Discover;
