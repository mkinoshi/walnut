import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
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
<<<<<<< HEAD
    firebaseApp.auth().onAuthStateChanged(user => {
      if (!user) {
        // this.context.history.push('/app/walnuthome');
        history.replace('/app/login');
        // history.push('/app/walnuthome');
      } else {
        const isUserInCommunity = localStorage.getItem('isUserInCommunity');
        this.props.getUser();
        if (this.props.isCreated && !isUserInCommunity) {
          history.replace('/app/walnuthome');
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

  componentDidMount() {
    // window.addEventListener('unload', () => {
    //   console.log('unmounting', localStorage.getItem('home'));
    //   localStorage.setItem('url', localStorage.getItem('home'));
    //   localStorage.setItem('tab', 1);
    // });
=======
    // firebaseApp.auth().onAuthStateChanged(user => {
    //   console.log('user', user);
    //   if (!user) {
    //     // this.context.history.push('/app/walnuthome');
    //     history.replace('/app/login');
    //     // history.push('/app/walnuthome');
    //   } else {
    //     console.log(localStorage.getItem('isUserInCommunity'));
    //     console.log(localStorage.getItem('url'));
    //     const isUserInCommunity = localStorage.getItem('isUserInCommunity');
    //     if (this.props.isCreated && !isUserInCommunity) {
    //       // this.props.getUser();
    //       history.replace('/app/walnuthome');
    //     } else {
    //       // this.props.getUser();
    //       history.replace(localStorage.getItem('url'));
    //     }
    //   }
    // });
  }

  componentDidMount() {
    console.log('history.location', history.location);
>>>>>>> d6a606cf78297fa968cde83cb1655a270c2fad3a
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

<<<<<<< HEAD
  componentWillUnmount() {
=======
  redirect(path) {
    history.push(path);
>>>>>>> d6a606cf78297fa968cde83cb1655a270c2fad3a
  }

  render() {
    return (
      <Router path="/" history={history}>
        <Switch>
          <Route path="/app/walnuthome" component={WalnutHomeContainer} />
          <Route path="/app/community" component={appCommunity} />
<<<<<<< HEAD
          <Route path="/app/login" component={Login} />
          <Route path="/app/register" component={Register} />
=======
          <Route path="/app/login" render={() => (<Login redirect={(path) => this.redirect.bind(this, path)}/>)}/>
          <Route path="/app/register" component={Register}/>
>>>>>>> d6a606cf78297fa968cde83cb1655a270c2fad3a
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
