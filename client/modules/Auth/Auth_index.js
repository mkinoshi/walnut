import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Auth_Login';
import Register from './Auth_Registration';
import WalnutHomeContainer from './App_Walnut_Home_Container';

class Auth extends React.Component {
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
            <Route path="/app/login" component={Login}/>
            <Route path="/app/register" component={Register}/>
            <Route path="/app/walnuthome" component={WalnutHomeContainer} />
          </Switch>
        </div>
      </BrowserRouter>
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
