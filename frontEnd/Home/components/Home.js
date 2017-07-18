import React from 'react';
import Discover from './Discover';
import Header from './Header';

// TODO header

class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Discover />
      </div>
    );
  }
}

export default Home;
