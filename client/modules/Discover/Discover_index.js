
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Feed from '../Feed/Feed_index';
import LeftSideBar from './Discover_Left_Sidebar_Container';
import RightSideBar from './Discover_Right_Sidebar_Container';
import ConversationCard from './Discover_My_Conversations_Card';
import discoverLoadThunk from '../../thunks/discover_thunks/discoverLoadThunk';
import discoverRefreshThunk from '../../thunks/discover_thunks/discoverRefreshThunk';
import {Sidebar, Button} from 'semantic-ui-react';
import firebaseApp from '../../firebase';
import _ from 'underscore';
import uuidv4 from 'uuid/v4';
import getMyConvosThunk from '../../thunks/user_thunks/getMyConvosThunk';


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
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
      this.props.getDiscoverRefresh(this.props.lastRefresh, this.props.useFilters);
    }
    if (this.props.currentUser) {
      const followsRef = firebaseApp.database().ref('/follows/' + this.props.currentUser.firebaseId + '/' + this.props.currentCommunity);
      followsRef.on('value', (snapshot) => {
        if (snapshot.val()) {
          const follows = _.pairs(snapshot.val());
                  // this will filter down to only those postIds which are mapped to true
          const myConvs = follows.filter((follow) => follow[1]).map((fol) => fol[0]);
          if (myConvs) {
            this.props.getConvos(myConvs);
            this.props.addIds(myConvs);
          }
        }
      });
    }
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('yoyoyoyoyo');
  //   if (nextProps.isReady && !this.props.isReady) {
  //     this.props.getDiscoverContent();
  //   }
  // }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar className="followedPostsSidebar"
                 animation="push"
                 visible={this.state.visible}
                 icon="labeled"
                 direction="right"
                 vertical>
            {(this.props.myConversations && this.props.myConversations.length > 0) ? this.props.myConversations.map((conv) =>
                <ConversationCard data={conv}
                                  key={uuidv4()}
                                  user={this.props.currentUser}/>
            ) : null}
        </Sidebar>
        <Sidebar.Pusher>
          <div id="Discover">
            {!this.props.isReady ? <p>loading new community</p> : null}
            <LeftSideBar />
            <Feed />
            <Button onClick={() => this.toggleVisibility()} className="followedPostsButton">
              Followed Posts
            </Button>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
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
  currentCommunity: PropTypes.object,
  updateCom: PropTypes.func,
  useFilters: PropTypes.array,
  myConversations: PropTypes.array,
  currentUser: PropTypes.object,
  addIds: PropTypes.func,
  getConvos: PropTypes.func
};

const mapStateToProps = (state) => ({
  myConversations: state.conversationReducer.convos,
  isReady: state.discoverReducer.isReady,
  posts: state.discoverReducer.posts,
  lastRefresh: state.discoverReducer.lastRefresh,
  currentCommunity: state.conversationReducer.current,
  useFilters: state.discoverReducer.useFilters,
  currentUser: state.userReducer
});

const mapDispatchToProps = (dispatch) => ({
  getConvos: (convos) => getMyConvosThunk(convos)(dispatch),
  addIds: (iDs) => dispatch({type: 'ADD_IDS', iDs: iDs}),
  getDiscoverContent: () => dispatch(discoverLoadThunk()),
  getDiscoverRefresh: (lastRefresh) => dispatch(discoverRefreshThunk(lastRefresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

