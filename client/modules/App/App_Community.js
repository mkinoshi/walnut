// TODO navbar and router links


import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../Home/components/Home';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalnutHomeContainer from '../WalnutHome/WalnutHomeContainer';

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
          <div>
            <NavBar />
          {this.props.isCreated ?
             <div>
             <Switch>
                <Route path="/app/editprofile" component={EditProfile}/>
                <Route path="/app/projects" component={Home}/>
                <Route path="/app/directory" component={Directory} />
                <Route path="/app/map" component={Map}/>
                <Route path="/app/discover" component={Discover} />
             </Switch></div>
             :
             <EditProfile />}
           </div>
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

// passes down props of get community with title and image

export default App;
