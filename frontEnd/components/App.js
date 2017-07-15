import React from 'react';
import NavBar from '../containers/NavBar';
import Home from './Home';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from '../containers/Login';

// TODO need to implement routes and links from navbar to render the underneath
// TODO home needs to go to /app

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Home />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
