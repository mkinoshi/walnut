import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import emailRegistrationThunk from '../../thunks/auth_thunks/emailRegistrationThunk';

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
    this.setState({fName: e.target.value});
  }

  handleLnameChange(e) {
    this.setState({lName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleRepeatChange(e) {
    this.setState({repeat: e.target.value});
  }

  register(e) {
    e.preventDefault();
    console.log('got here bro');
    this.props.emailRegistration(this.state.fName, this.state.lName, this.state.email, this.state.password);
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
                               onChange={(e) => this.handleEmailChange(e)}  />
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
                    <button onClick={(e) => {this.register(e);}}>Register</button>
                </form>
            </div>
        </div>
    );
  }
}


Register.propTypes = {
  emailRegistration: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  emailRegistration: (firstname, lastname, email, password) => emailRegistrationThunk(firstname, lastname, email, password)(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
