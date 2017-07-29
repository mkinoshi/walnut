// TODO navbar and router links
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Discover from '../Discover/Discover_index';
import Directory from '../Directory/Directory_index';
import NavBar from './App_Community_NavBar';
// import MapContainer from '../Map/Map_index';
import EditProfile from '../EditProfile/EditProfile_index';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import updateLocationThunk from '../../thunks/map_thunks/updateLocationThunk';
import userDataThunk from '../../thunks/user_thunks/userDataThunk';

const styles = {
  App: {
    backgroundColor: 'lightblue',
    marginLeft: '100px',
    width: '65%'
  }
};

class Community extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.props.getDiscoverContent();
  }

  componentDidMount() {
    // this.props.getDiscoverContent();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition.bind(this), this.handleError.bind(this));
    }
  }

  handlePosition(position) {
    this.props.updateLocation([position.coords.longitude, position.coords.latitude]);
  }

  handleError(msg) {
    this.props.updateLocation([]);
  }

  render() {
    return (
      <div>
        <NavBar />
         <div>
         <Switch>
            <Route path="/app/community/:communityName/editprofile" component={EditProfile}/>
            {/* <Route path="/app/projects" component={Home}/> */}
            <Route path="/app/community/:communityName/directory" component={Directory} />
            {/* <Route path="/app/community/:communityName/map" component={MapContainer}/> */}
            <Route path="/app/community/:communityName/discover" component={Discover} />
         </Switch>
         </div>
       </div>
    );
  }
}


Community.propTypes = {
  getDiscoverContent: PropTypes.func,
  updateLocation: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  updateLocation: (params) => updateLocationThunk(params)(dispatch),
  getDiscoverContent: () => discoverLoadThunk(dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Community);
