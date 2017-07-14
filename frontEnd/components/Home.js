import React from 'react';
import Discover from './home/Discover';
import Header from './home/Header';

// TODO needs to render from react router in home and also be set as default

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
