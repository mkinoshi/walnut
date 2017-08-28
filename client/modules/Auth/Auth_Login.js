import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Button, Form, Modal, Message, Icon} from 'semantic-ui-react';
import facebookLoginThunk from '../../thunks/auth_thunks/facebookLoginThunk';
import googleLoginThunk from '../../thunks/auth_thunks/googleLoginThunk';
import signInThunk from '../../thunks/auth_thunks/signInThunk';
import firebase from 'firebase';
import verificationThunk from '../../thunks/auth_thunks/verificationThunk';
import './Auth.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailVal: '',
      passwordVal: '',
      vemail: '',
      vpassword: '',
      rEmail: '',
      open: false,
      vopen: false,
      isChanging: false,
      isSendingEmailForV: false
    };
  }

  handleEmailChange(e) {
    this.setState({emailVal: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({passwordVal: e.target.value});
  }

  handleResetEmailChange(e) {
    this.setState({rEmail: e.target.value});
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
    if (this.state.emailVal && this.state.passwordVal) {
      this.props.signIn(this.state.emailVal, this.state.passwordVal, this.props.redirect);
    }
  }

  open() {
    this.setState({open: true });
  }

  close() {
    this.setState({open: false});
  }

  vopen() {
    this.setState({vopen: true });
  }

  vclose() {
    this.setState({vopen: false});
  }

  handleReset() {
    if (this.state.rEmail) {
      const self = this;
      firebase.auth().sendPasswordResetEmail(this.state.rEmail).then(() => {
        console.log('email is sent');
        self.setState({isChanging: true});
        setTimeout(() => {
          self.setState({isChanging: false});
        }, 10000);
      }, (error) => {
        console.log(error);
      });
    }
  }

  handleVerification() {
    if (this.state.vemail && this.state.vpassword) {
      this.setState({isSendingEmailForV: true});
      this.props.reVerify(this.state.vemail, this.state.vpassword);
    }
  }

  render() {
    return (
        <div className="loginPage">
          {this.state.isChanging ?
            <Message
              success
              header="Email will be sent soon"
              content="Please follow the email"
            /> :
            null
          }
          {this.state.isSendingEmailForV ?
            <Message
              success
              header="Email will be sent soon"
              content="Please verify your account"
            /> :
            null
          }
          <div className="loginCard">
            <h1>Login</h1>
            <div className="loginBox">
              {this.props.isError ?
                  <Message negative>
                    <Message.Header>Oops something went wrong</Message.Header>
                    <p>Check your email and password again</p>
                  </Message> :
                  null
              }
              {this.props.isVerified ?
                null :
                <Message negative>
                  <Message.Header>Oops something went wrong</Message.Header>
                  <p>Your account has not been verified yet</p>
                  <Button onClick={() => this.vopen()}>Send Verification Email</Button>
                </Message>
              }
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
                <Button onClick={() => this.open()}>Forgot Password</Button>
                <Modal size={'mini'} open={this.state.open} onClose={() => this.close()}>
                  <Modal.Header>
                    Reset the password
                  </Modal.Header>
                  <Modal.Content>
                    <Form.Input label="Email" placeholder="Type Your Email" onChange={(e) => this.handleResetEmailChange(e)}/>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive icon="checkmark" labelPosition="right" content="Reset" onClick={() => {this.handleReset(); this.close();}} />
                  </Modal.Actions>
                </Modal>
                <Modal size={'mini'} open={this.state.vopen} onClose={() => this.vclose()}>
                  <Modal.Header>
                    Reset the password
                  </Modal.Header>
                  <Modal.Content>
                    <Form.Input label="Email" placeholder="Type Your Email" onChange={(e) => this.setState({vemail: e.target.value})}/>
                    <Form.Input label="Password" placeholder="Type Your Password" onChange={(e) => this.setState({vpassword: e.target.value})}/>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button positive icon="checkmark" labelPosition="right" content="Reset" onClick={() => {this.handleVerification(); this.vclose();}} />
                  </Modal.Actions>
                </Modal>
              </Form>
              <h2>New user?</h2>
              <Link to="/register">Go to Registration</Link>
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
  redirect: PropTypes.func,
  isError: PropTypes.bool,
  isVerified: PropTypes.bool,
  reVerify: PropTypes.func
};

const mapStateToProps = (state) => ({
  isError: state.userReducer.isError,
  isVerified: state.userReducer.isVerified
});

const mapDispatchToProps = (dispatch) => ({
  fbLogin: () => facebookLoginThunk(dispatch),
  googleLogin: () => googleLoginThunk(dispatch),
  signIn: (email, password, redirect) => signInThunk(email, password, redirect)(dispatch),
  reVerify: (email, password) => dispatch(verificationThunk(email, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
