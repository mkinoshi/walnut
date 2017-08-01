import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
        <div>
          <h3><a href="/auth/signup">Go to Registration</a></h3>

          <h1 style="text-align:center">Login</h1>
          <div class="container col-xs-4 col-xs-offset-4">
            <h3><a href="/auth/facebook">Login With Facebook</a></h3>
            <form action="/auth/login" method="post">
              <div class="form-group">
                <label for="">Email</label>
                <input class = "form-control" type="text" name="email" value="" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input class="form-control" type="password" name="password" value="" placeholder="Password">
              </div>
              <input class="form-control" type="submit" name="" value="Login">
            </form>
          </div>
        </div>
    );
  }
}


Login.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
