import React from 'react';
import {BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Auth_Login';
import Register from './Auth_Registration';
// import WalnutHomeContainer from '../App/App_Walnut_Home_Container';
import App from '../App/App_index';
import appCommunity from '../App/App_Community';
import firebaseApp from '../../firebase';
import WalnutHomeContainer from '../App/App_Walnut_Home_Container';
import getUser from '../../thunks/app_thunks/getAppThunk';

const history = createBrowserHistory();

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      console.log(user);
      if (!user) {
        // this.context.history.push('/app/walnuthome');
        history.replace('/app/login');
        // history.push('/app/walnuthome');
      } else {
        console.log(localStorage.getItem('isUserInCommunity'));
        const isUserInCommunity = localStorage.getItem('isUserInCommunity');
        if (this.props.isCreated && !isUserInCommunity) {
          this.props.getUser();
          history.replace('/app/walnuthome');
        } else {
          this.props.getUser();
        }
      }
    });
  }

  componentDidMount() {
    console.log('did');
  }

  componentWillReceiveProps(nextProps) {
    const isUserInCommunity = localStorage.getItem('isUserInCommunity');
    if (nextProps.isCreated && !isUserInCommunity) {
      nextProps.getUser();
      history.replace('/app/walnuthome');
    } else {
      nextProps.getUser();
    }
  }

  render() {
    return (
      <Router path="/" history={history}>
        <Switch>
          <Route path="/app/walnuthome" component={WalnutHomeContainer} />
          <Route path="/app/community" component={appCommunity} />
          <Route path="/app/login" component={Login}/>
          <Route path="/app/register" component={Register}/>
        </Switch>
      </Router>
    );
  }
}


Auth.propTypes = {
  getUser: PropTypes.func,
  isCreated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isCreated: state.userReducer.isCreated
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser())
});


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
