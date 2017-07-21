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
          <Switch>
            <Route path="/app/walnuthome" component={WalnutHomeContainer}/>
            <Route path="/app/community/discover" component={App_Community} />
          </Switch>
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
