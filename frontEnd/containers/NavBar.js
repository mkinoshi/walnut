// renders in App
import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from '../components/Home';


class Navbar extends React.Component {

  render() {
    return (
      <div>
        <p>I am the navbar</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Navbar;
