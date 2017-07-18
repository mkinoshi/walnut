import React from 'react';
import Discover from './home/Discover';
import Header from './home/Header';
import {Route} from 'react-router-dom';
import Map from './Map';

// TODO header

class Home extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Discover />
        <Route path="/app/map" component={Map}/>
      </div>
    );
  }
}

export default Home;
