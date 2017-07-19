import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/components/Home';
import Map from '../Map/components/Map';
import CreateProfile from './CreateProfile';
import Directory from '../Directory/Directory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditProfile from '../editProfile/components/EditProfile';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            {/* <Route path="/app" component={(!this.state.profileCreated) ? Home : CreateProfile }/> */}
            <Route path="/app/createprofile" component={EditProfile}/>
            <Route path="/app/projects" component={Home}/>
            <Route path="/app/directory" component={Directory} />
            <Route path="/app/map" component={Map}/>
            <Route path="/app" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
