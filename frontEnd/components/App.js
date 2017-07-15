import React from 'react';
import NavBar from '../containers/NavBar';
import Home from './Home';
import {BrowserRouter, Route} from 'react-router-dom';

// TODO navbar

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Home />
          <Route path="/app" component={Home}/>
          <Route path="/app/alumni" component={Home}/>
          <Route path="/app/projects" component={Home}/>
          <Route path="/app/map" component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
