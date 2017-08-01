import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
        fName: '',
        lName: '',
        email: '',
        password: '',
        repeat: ''
    };
  }

  handleFnameChange(e) {
  }

  handleLnameChange(e) {
  }

  handleEmailChange(e) {
  }

  handlePasswordChange(e) {
  }

  handleRepeatChange(e) {
  }

  register() {
  }

  render() {
    return (
        <div>
            <Link to="/app/login">Back to Login</Link>


            <h1 style={{textAlign: 'center'}}>Register</h1>
            <div className="container col-xs-4 col-xs-offset-4">
                <form>
                    <div className="form-group">
                        <label htmlFor="fname">Enter First Name</label>
                        <input className ="form-control"
                               type="text"
                               name="fname"
                               value={this.state.fName}
                               onChange={(e) => this.handleFnameChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lname">Enter Last Name</label>
                        <input className = "form-control"
                               type="text"
                               name="lname"
                               value={this.state.lName}
                               onChange={(e) => this.handleLnameChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter Email Address</label>
                        <input className = "form-control"
                               type="text"
                               name="email"
                               value={this.state.email}
                               onChange={(e) => this.handleEmailChange()}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Choose Password</label>
                        <input className="form-control"
                               type="password"
                               name="password"
                               value={this.state.password}
                               onChange={(e) => this.handlePasswordChange(e)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Repeat Password</label>
                        <input className="form-control"
                               type="password"
                               name="passwordRepeat"
                               value={this.state.repeat}
                               onChange={(e) => this.handleRepeatChange(e)} />
                    </div>
                    <div >
                        <h3 className="text-center">Check Your Preferences</h3>
                    </div>
                    <button onClick={() => {this.register();}}>Register</button>
                </form>
            </div>
        </div>
    );
  }
}


Register.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
