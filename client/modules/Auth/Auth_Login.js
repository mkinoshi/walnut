import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
  }

  googleLogin() {
  }

  regLogin() {
  }

  render() {
    return (
        <div>
          <h1 style={{textAlign: 'center'}}>Login</h1>
          <div className="container col-xs-4 col-xs-offset-4">
            <button onClick={() => {this.fbLogin();}}>Continue with Facebook</button>
            <button onClick={() => {this.googleLogin();}}>Continue with Google</button>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control"
                       type="text"
                       name="email"
                       onChange={(e) => this.handleEmailChange(e)}
                       value={this.state.emailVal} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control"
                       type="password"
                       name="password"
                       onChange={(e) => this.handlePasswordChange(e)}
                       value={this.state.passwordVal} />
              </div>
              <input className="form-control" type="submit" name="" value="Login" />
            </form>
            <button onClick={() => {this.regLogin();}}>Login</button>
            <h2>New user?</h2>
            <Link to="/app/register">Go to Registration</Link>
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
