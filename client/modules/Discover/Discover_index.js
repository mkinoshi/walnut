
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Feed from '../Feed/Feed_index';
import LeftSideBar from './Discover_Left_Sidebar_Container';
import RightSideBar from './Discover_Right_Sidebar_Container';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import discoverRefreshThunk from '../../thunks/discover_thunks/discoverRefreshThunk';


class Home extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const urls = this.props.location.pathname;
    console.log(urls);
    localStorage.setItem('url', urls);
    sessionStorage.setItem('url', urls);
    localStorage.setItem('home', urls);
    if (this.props.isReady && (this.props.posts.length === 0)) {
      console.log('in here');
      this.props.getDiscoverContent();
    } else {
      this.props.getDiscoverRefresh(this.props.lastRefresh);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('yoyoyoyoyo');
  //   if (nextProps.isReady && !this.props.isReady) {
  //     this.props.getDiscoverContent();
  //   }
  // }

  render() {
    return (
      <div id="Discover">
        {!this.props.isReady ? <p>loading new community</p> : null}
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
  location: PropTypes.object,
  posts: PropTypes.array,
  getDiscoverRefresh: PropTypes.func,
  lastRefresh: PropTypes.string,
  currentCommunity: PropTypes.object
};

const mapStateToProps = (state) => ({
  isReady: state.discoverReducer.isReady,
  posts: state.discoverReducer.posts,
  lastRefresh: state.discoverReducer.lastRefresh,
  currentCommunity: state.userReducer.currentCommunity
});

const mapDispatchToProps = (dispatch) => ({
  getDiscoverContent: () => dispatch(discoverLoadThunk()),
  getDiscoverRefresh: (lastRefresh) => dispatch(discoverRefreshThunk(lastRefresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

