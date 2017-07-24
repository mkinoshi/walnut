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
};

const mapStateToProps = (state) => ({
  hasProfile: state.userReducer.hasProfile
});

const mapDispatchToProps = (dispatch) => ({
  getDiscoverContent: () => dispatch({type: 'GET_DISCOVER_INFO'})
});


export default connect(mapStateToProps, mapDispatchToProps)(Community);
