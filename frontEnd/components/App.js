import React from 'react';
import NavBar from '../containers/NavBar';
import Home from './Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Map from './Map';
// TODO navbar

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/app/alumni" component={Home}/>
            <Route path="/app/projects" component={Home}/>
            <Route path="/app/map" component={Map}/>
            <Route path="/app" component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
