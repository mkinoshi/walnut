import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import emailRegistrationThunk from '../../thunks/auth_thunks/emailRegistrationThunk';
import './Auth.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
      repeat: '',
      failed: false
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
    this.props.emailRegistration(this.state.fName, this.state.lName, this.state.email, this.state.password);
    this.setState({failed: true});
  }

  render() {
    return (
        <div>        
            <div className="ui buttons">
            <Link to="/login">
              <Button className="ui labeled icon button">
                <i className="left chevron icon"></i>
                Back to Login
              </Button>
              </Link>
            </div>
            <div className="loginPage" style={{height: '88vh', overflow: 'auto'}}>
            <InfiniteScroll useWindow={false} pageStart={0}>
            <div className="registerCard">
              <h1>Register</h1>
              <div className="loginBox">
                {this.state.failed ? 
                <div style={{color: 'red'}}>Registration was unsuccessful. Please try again.</div>
                : ''}
                <Form>
                    <Form.Field>
                      <label htmlFor="fname">Enter First Name</label>
                      <input className ="form-control"
                              type="text"
                              name="fname"
                              value={this.state.fName}
                              onChange={(e) => this.handleFnameChange(e)} />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="lname">Enter Last Name</label>
                        <input className = "form-control"
                              type="text"
                              name="lname"
                              value={this.state.lName}
                              onChange={(e) => this.handleLnameChange(e)} />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="email">Enter Email Address</label>
                        <input className = "form-control"
                               type="text"
                               name="email"
                               value={this.state.email}
                               onChange={(e) => this.handleEmailChange(e)}  />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="password">Choose Password</label>
                        <input className="form-control"
                               type="password"
                               name="password"
                               value={this.state.password}
                               onChange={(e) => this.handlePasswordChange(e)} />
                    </Form.Field>
                    <Form.Field>
                      <label htmlFor="passwordRepeat">Repeat Password</label>
                        <input className="form-control"
                               type="password"
                               name="passwordRepeat"
                               value={this.state.repeat}
                               onChange={(e) => this.handleRepeatChange(e)} />
                    </Form.Field>
                    <Button type="submit" onClick={(e) => {this.register(e);}}>Register</Button>
                </Form>
            </div>
        </div>
      </InfiniteScroll>
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
