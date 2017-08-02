import React from 'react';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Auth_Login';
import Register from './Auth_Registration';
import WalnutHomeContainer from '../App/App_Walnut_Home_Container';
import { firebaseApp } from '../../firebase';

const history = createBrowserHistory();

firebaseApp.auth().onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    // this.context.history.push('/app/walnuthome');
    history.push('/walnuthome');
  } else {
    history.replace('/login');
    // this.context.history.push('/app/login');
  }
});

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Router path="/" history={history}>
        <Switch>
          <Route path="/walnuthome" component={WalnutHomeContainer} />
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </Router>
    );
  }
}


Auth.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
