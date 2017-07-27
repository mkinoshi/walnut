
import React from 'react';
import PropTypes from 'prop-types';
import Feed from '../Feed/Feed_index';
import HeaderContainer from './Discover_Header_Container';



class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('at home');
    return (
      <div>
        <HeaderContainer />
        <Feed />
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;


