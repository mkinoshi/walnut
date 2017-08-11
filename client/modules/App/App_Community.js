// TODO navbar and router links
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Discover from '../Discover/Discover_index';
import Directory from '../Directory2/Directory_index2';
import NavBar from './App_Community_NavBar';
import MapContainer from '../Map/Map_index';
import EditProfile from '../EditProfile/EditProfile_index';
import updateLocationThunk from '../../thunks/map_thunks/updateLocationThunk';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class Community extends React.Component {

  componentDidMount() {
    localStorage.setItem('isUserInCommunity', true);
    // localStorage.setItem('url', '/community');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition.bind(this), this.handleError.bind(this));
    }
  }

  handlePosition(position) {
    this.props.updateLocation([position.coords.longitude, position.coords.latitude]);
  }

  handleError() {
    this.props.updateLocation([]);
  }

  render() {
    return (
      <div>
        <NavBar />
         <div className="Container">
         <Switch>
            <Route path="/community/:communityName/directory" component={Directory} />
            <Route path="/community/:communityName/map" component={MapContainer}/>
            <Route path="/community/:communityName/discover" component={Discover} />
            <Route path="/community/:communityName/editProfile" component={EditProfile} />
         </Switch>
         </div>
       </div>
    );
  }
}


Community.propTypes = {
  updateLocation: PropTypes.func,
  history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  updateLocation: (params) => dispatch(updateLocationThunk(params)),
});

export default connect(null, mapDispatchToProps)(Community);
