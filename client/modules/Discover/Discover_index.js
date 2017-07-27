import React from 'react';
import Discover from './Discover';
import Header from './Header';
import PropTypes from 'prop-types';

// TODO call header components quote container
// TODO and feed modules

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('at home');
    return (
      <div>
        <Header />
        {/* <Discover />*/}
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;
