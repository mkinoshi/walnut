import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Auth_Login';
import Registration from './Auth_Registration';

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
