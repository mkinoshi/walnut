import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Community from './App_Community';
import WalnutHomeContainer from './App_Walnut_Home_Container';
import EditProfile from '../EditProfile/EditProfile_index';
import userDataThunk from '../../thunks/user_thunks/userDataThunk';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    console.log('will App');
    this.props.getUser();
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
  getUser: PropTypes.func
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => userDataThunk(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
