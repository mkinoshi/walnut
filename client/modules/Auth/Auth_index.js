import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './Auth_Login';
import Register from './Auth_Registration';
import Community from '../App/App_Community';
import firebaseApp from '../../firebase';
import WalnutHomeContainer from '../App/App_Walnut_Home_Container';
import getUser from '../../thunks/app_thunks/getAppThunk';

export const history = createBrowserHistory();

class Auth extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }


  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (!user) {
        // this.context.history.push('/walnuthome');
        history.replace('/login');
        // history.push('/walnuthome');
      } else {
        // console.log('calling this get User');
        this.props.getUser();
        const isUserInCommunity = localStorage.getItem('isUserInCommunity');
        if (this.props.isCreated && !isUserInCommunity) {
          history.replace('/walnuthome');
        } else {
          if (sessionStorage.getItem(('url'))) {
            history.replace(sessionStorage.getItem('url'));
          } else {
            history.replace(localStorage.getItem('home'));
          }
        }
      }
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   const isUserInCommunity = localStorage.getItem('isUserInCommunity');
  //   if (nextProps.isCreated && !isUserInCommunity) {
  //     history.replace('/app/walnuthome');
  //   }
  // }

  render() {
    return (
      <Router path="/" history={history}>
        <Switch>
          <Route path="/walnuthome" component={WalnutHomeContainer} />
          {/* <Route path="/community" render={() => (<Community history={history} />)} /> */}
          <Route path="/community" component={Community} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
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
