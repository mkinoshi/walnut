// TODO navbar and router links
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Discover from '../Discover/Discover_index';
import Directory from '../Directory/Directory_index';
import NavBar from './App_Community_NavBar';
import MapContainer from '../Map/Map_index';
import EditProfile from '../EditProfile/EditProfile_index';

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

  componentDidMount() {
    // this.props.getDiscoverContent();
    console.log('ehhehehehehehehehehe');
    console.log(this.props);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handlePosition.bind(this), this.handleError.bind(this));
    }
  }

  handlePosition(position) {
    console.log(this);
    console.log(position);
    this.props.updateLocation([position.coords.longitude, position.coords.latitude]);
  }

  handleError(msg) {
    console.log(msg);
    this.props.updateLocation([]);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <NavBar />
             <div>
             <Switch>
                <Route path="/app/community/editprofile" component={EditProfile}/>
                {/* <Route path="/app/projects" component={Home}/> */}
                <Route path="/app/community/directory" component={Directory} />
                <Route path="/app/community/map" component={MapContainer}/>
                <Route path="/app/community/discover" component={Discover} />
             </Switch>
             </div>
           </div>
        </div>
      </BrowserRouter>
    );
  }
}


Community.propTypes = {
  hasProfile: PropTypes.bool,
  getDiscoverContent: PropTypes.func
  updateLocation: PropTypes.func
};

const mapStateToProps = (state) => ({
  hasProfile: state.userReducer.hasProfile,
});
const mapDispatchToProps = (dispatch) => ({
  updateLocation: (params) => {dispatch({type: 'UPDATE_LOCATION', location: params});}
});

const mapDispatchToProps = (dispatch) => ({
  getDiscoverContent: () => dispatch({type: 'GET_DISCOVER_INFO'})
});


export default connect(mapStateToProps, mapDispatchToProps)(Community);
