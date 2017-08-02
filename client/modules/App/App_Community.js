// TODO navbar and router links
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Discover from '../Discover/Discover_index';
import Directory from '../Directory/Directory_index';
import NavBar from './App_Community_NavBar';
import MapContainer from '../Map/Map_index';
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
         <div>
         <Switch>
            <Route path="/app/community/:communityName/directory" component={Directory} />
            <Route path="/app/community/:communityName/map" component={MapContainer}/>
            <Route path="/app/community/:communityName/discover" component={Discover} />
         </Switch>
         </div>
       </div>
    );
  }
}


Community.propTypes = {
  updateLocation: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  updateLocation: (params) => dispatch(updateLocationThunk(params)),
});

export default connect(null, mapDispatchToProps)(Community);
