import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/components/Home';
import Map from '../Map/containers/Map';
import Directory from '../Directory/Directory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditProfile from '../editProfile/components/EditProfile';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class App extends React.Component {

  render() {
    console.log(this.props);
    return (
      <BrowserRouter>
        <div>
          {(!this.props.isLoaded) ?
            <div style={styles.App}>
              <h1>I am supposed to be animating while our super fast server is loading</h1>
            </div>
          :
          <div>
          {this.props.isCreated ?
            <div>
            <NavBar />
            <Switch>
              {/* <Route path="/app" component={(!this.state.profileCreated) ? Home : CreateProfile }/> */}
              <Route path="/app/editprofile" component={EditProfile}/>
              <Route path="/app/projects" component={Home}/>
              <Route path="/app/directory" component={Directory} />
              <Route path="/app/map" component={Map}/>
              <Route path="/app" component={Home} />
            </Switch></div>
            :
            <EditProfile isCreating={!null}/>}
          </div>
        }
        </div>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  isLoaded: PropTypes.bool,
  isCreated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoaded: state.appReducer.isLoaded,
  isCreated: state.createProfileReducer.isCreated
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
