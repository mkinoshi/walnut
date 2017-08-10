import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button, Input, Form, Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import facebookLoginThunk from '../../thunks/auth_thunks/facebookLoginThunk';
import googleLoginThunk from '../../thunks/auth_thunks/googleLoginThunk';
import signInThunk from '../../thunks/auth_thunks/signInThunk';
import css from './Auth.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailVal: '',
      passwordVal: ''
    };
  }

  handleEmailChange(e) {
    this.setState({emailVal: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({passwordVal: e.target.value});
  }

  fbLogin() {
    console.log('worked');
    this.props.fbLogin();
  }

  googleLogin() {
    console.log('worked');
    this.props.googleLogin();
  }

  regLogin(e) {
    e.preventDefault();
    console.log('redirect function', this.props.redirect);
    this.props.signIn(this.state.emailVal, this.state.passwordVal, this.props.redirect);
  }

  render() {
    return (
        <div className="loginPage">
          <div className="loginCard">
            <h1>Login</h1>
            <div className="loginBox">
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder="enter email"
                    type="text"
                    name="email"
                    onChange={(e) => this.handleEmailChange(e)}
                    value={this.state.emailVal} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="enter password"
                    name="password"
                    onChange={(e) => this.handlePasswordChange(e)}
                    value={this.state.passwordVal} />
                </Form.Field>
                <Button onClick={(e) => { this.regLogin(e); }} type="submit">Submit</Button>
              </Form>
              <h2>New user?</h2>
              <Link to="/app/register">Go to Registration</Link>
            </div>
          </div>
        </div>
    );
  }
}


Login.propTypes = {
  fbLogin: PropTypes.func,
  googleLogin: PropTypes.func,
  signIn: PropTypes.func,
  redirect: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  fbLogin: () => facebookLoginThunk(dispatch),
  googleLogin: () => googleLoginThunk(dispatch),
  signIn: (email, password, redirect) => signInThunk(email, password, redirect)(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
