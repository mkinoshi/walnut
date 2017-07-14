import React from 'react';
import NavBar from '../containers/NavBar';
import Home from './Home';

// TODO need to implement routes and links from navbar to render the underneath
// TODO home needs to go to /

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
