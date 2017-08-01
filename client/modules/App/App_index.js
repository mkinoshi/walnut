import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Community from './App_Community';
import WalnutHomeContainer from './App_Walnut_Home_Container';
import EditProfile from '../EditProfile/EditProfile_index';
import getApp from '../../thunks/app_thunks/getAppThunk';
import getCommunities from '../../thunks/community_thunks/getAllCommunitiesThunk';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class App extends React.Component {

  componentWillMount() {
    if (localStorage.getItem('user')) {
      this.props.getCommunities();
      this.props.setUser();
    } else {
      console.log('vfddv');
      this.props.getApp();
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/app/walnuthome" component={WalnutHomeContainer}/>
            <Route path="/app/community" component={Community} />
            <Route path="/app/editprofile" render={(props) =>
              <EditProfile isCreating={!null} {...props} />
            } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  getApp: PropTypes.func,
  checkApp: PropTypes.func,
  getCommunities: PropTypes.func,
  setUser: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getApp: () => dispatch(getApp()),
  getCommunities: () => dispatch(getApp()),
  setUser: () => dispatch({type: 'SET_USER', user: JSON.parse(localStorage.getItem('user'))})
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
