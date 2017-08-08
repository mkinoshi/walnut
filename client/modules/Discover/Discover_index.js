
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Feed from '../Feed/Feed_index';
import LeftSideBar from './Discover_Left_Sidebar_Container';
import RightSideBar from './Discover_Right_Sidebar_Container';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';



class Home extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    if (this.props.isReady) {
      console.log('in here');
      this.props.getDiscoverContent();
    }
  }

  componentDidMount() {
    const urls = this.props.location.pathname;
    console.log(urls);
    localStorage.setItem('url', urls);
    localStorage.setItem('home', urls);
  }

  componentWillReceiveProps(nextProps) {
    console.log('yoyoyoyoyo');
    if (nextProps.isReady) {
      this.props.getDiscoverContent();
    }
  }

  render() {
    return (
      <div id="Discover">
        <LeftSideBar />
        <Feed />
        <RightSideBar />
      </div>
    );
  }
}

Home.propTypes = {
  getDiscoverContent: PropTypes.func,
  isReady: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = (state) => ({
  isReady: state.discoverReducer.isReady
});

const mapDispatchToProps = (dispatch) => ({
  getDiscoverContent: () => dispatch(discoverLoadThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

