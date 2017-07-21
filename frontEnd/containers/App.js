import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Home from '../Home/components/Home';
import Map from '../Map/containers/Map';
import Directory from '../Directory/Directory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditProfile from '../editProfile/containers/EditProfile';
import WalnutHomeContainer from '../WalnutHome/WalnutHomeContainer';
import CommunityCard from '../WalnutHome/CommunityCard';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/app/walnuthome" component={WalnutHomeContainer}/>
            <Route path="/app/community" component={Home} />
          </Switch>
          {/* <div>*/}
          {/* {this.props.isCreated ?*/}
            {/* <div>*/}
            {/* <NavBar />*/}
            {/* <Switch>*/}
               {/* <Route path="/app/editprofile" component={EditProfile}/>*/}
               {/* <Route path="/app/projects" component={Home}/>*/}
               {/* <Route path="/app/directory" component={Directory} />*/}
               {/* <Route path="/app/map" component={Map}/>*/}
               {/* <Route path="/app" component={Home} />*/}
            {/* </Switch></div>*/}
            {/* :*/}
            {/* <EditProfile isCreating={!null}/>}*/}
          {/* </div>*/}
        </div>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  // isLoaded: PropTypes.bool,
  // isCreated: PropTypes.bool,
  // currentCommunity: PropTypes.object
};

export default App;
